(function () {
    'use strict';

    function ConstructionSitesDetailsController($state, $stateParams, auth, identity, constructionSitesPageData, clientsPageData, notifier) {
        var vm = this;
        vm.constructionSiteId = $stateParams.id;
        vm.constructionSite = null;
        vm.updatedConstructionSite = null;
        vm.isNotEditMode = true;
        vm.canEdit = false;

        vm.clientsArray = null;
        vm.selectedItem = null;

        // DRY principle ! To fix in refactoring.
        vm.paymentOptions = [
           { id: 0, value: false, name: 'Бюджетен' },
           { id: 1, value: true, name: 'Почасов' }
        ]

        //var getClients = function () {
        //    clientsPageData.getClients()
        //       .then(function (response) {
        //           if (vm.clientsArray === null) {
        //               vm.clientsArray = response.data;
        //           }

        //           console.log(vm.clientsArray);
        //       }, function (reason) {
        //           notifier.error('Грешка: ' + reason.Message);
        //       });
        //}
        
        vm.getConstructionSiteById = function (id) {
            constructionSitesPageData.getConstructionSiteById(id)
                .then(function (result) {
                    vm.constructionSite = result.data;
                    vm.canEdit = identity.isAdmin();
                    // TODO - extract in a service
                    //var loggedUser;
                    //identity.getUser()
                    //    .then(function (result) {
                    //        loggedUser = result.data;
                    //        vm.canEdit = loggedUser.isAdmin;
                    //    });

                    //vm.updatedConstructionSite = angular.copy(vm.constructionSite);
                    
                    //// Payment per hour select fix.
                    //vm.updatedConstructionSite.paymentPerHour == true ?
                    //    vm.updatedConstructionSite.paymentPerHour = vm.paymentOptions[1] :
                    //    vm.updatedConstructionSite.paymentPerHour = vm.paymentOptions[0];

                    //// Client dropdown fix.
                    //vm.clientsArray.forEach(getClientForBinding);
                    setClientsDropdown();
                    updateConstructionSite();

                }, function (reject) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.getConstructionSiteById(vm.constructionSiteId);

        // Extract because of DRY principle.
        vm.toggleEditMode = function () {
            vm.isNotEditMode = !vm.isNotEditMode;
            if (vm.isNotEditMode) {
                setClientsDropdown();
                updateConstructionSite();
            }
        }

        vm.editConstructionSite = function (updatedConstructionSite, editConstructionSitesDetailsForm) {
            if (editConstructionSitesDetailsForm.$valid) {
                // TODO - extract in a service the part with logOut check.
                if (confirm("Потвърдете промяната на '" + vm.updatedConstructionSite.constructionSiteName + "'.")) {
                    vm.updatedConstructionSite.clientId = vm.updatedConstructionSite.clientId.id;
                    vm.updatedConstructionSite.paymentPerHour = vm.updatedConstructionSite.paymentPerHour.id;

                    constructionSitesPageData.editConstructionSite(updatedConstructionSite)
                        .then(function (constructionSite) {
                            notifier.warning("Успешно редактиран '" + vm.constructionSite.constructionSiteName + "'");
                            $state.go('dashboard.constructionSites.detail', { 'id': vm.constructionSite.id });
                            vm.getConstructionSiteById(vm.constructionSiteId);
                            vm.isNotEditMode = !vm.isNotEditMode;
                        }, function (reason) {
                            notifier.error('Грешка: ' + reason.Message);
                        });
                }
            }
        }

        vm.deleteConstructionSite = function () {
            if (confirm("Потвърдете изтриването на '" + vm.constructionSite.constructionSiteName + "'.")) {
                // TODO - extract in a service the part with logOut check.
                constructionSitesPageData.deleteConstructionSite(vm.constructionSite)
                    .then(function (response) {
                        notifier.warning("Успешно изтрит '" + vm.constructionSite.constructionSiteName + "'");
                        $state.go('dashboard.constructionSites');

                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                    });
            }
        }

        var getClientForBinding = function(element, index, array)
        {
            if (element.id == vm.updatedConstructionSite.clientId) {
                vm.updatedConstructionSite.clientId = element;
                return;
            }
        }

        var updateConstructionSite = function () {
            vm.updatedConstructionSite = angular.copy(vm.constructionSite);

            // Payment per hour select fix.
            vm.updatedConstructionSite.paymentPerHour == true ?
                vm.updatedConstructionSite.paymentPerHour = vm.paymentOptions[1] :
                vm.updatedConstructionSite.paymentPerHour = vm.paymentOptions[0];

            // Client dropdown fix.
            
            //vm.clientsArray.forEach(getClientForBinding);
        }

        var setClientsDropdown = function () {
            clientsPageData.getClients()
               .then(function (response) {
                   if (vm.clientsArray === null) {
                       vm.clientsArray = response.data;
                   }

                   vm.clientsArray.forEach(getClientForBinding);
               }, function (reason) {
                   notifier.error('Грешка: ' + reason.Message);
               });
        }
    }

    angular
        .module('kVent.controllers')
        .controller('ConstructionSitesDetailsController', ['$state', '$stateParams', 'auth', 'identity', 'constructionSitesPageData', 'clientsPageData', 'notifier', ConstructionSitesDetailsController]);
}());