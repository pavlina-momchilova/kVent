(function () {
    'use strict';

    function ClientsDetailController($state, $stateParams, auth, identity, clientsPageData, notifier) {
        var vm = this;
        vm.clientId = $stateParams.id;
        vm.client = null;
        vm.updatedClient = null;
        vm.isNotEditMode = true;
        vm.canEdit = false;

        vm.getClientById = function (id) {
            clientsPageData.getClientById(id)
                .then(function (result) {
                    vm.client = result.data;

                    vm.canEdit = identity.isAdmin();
                    // TODO - extract in a service
                    //var loggedUser;
                    //identity.getUser()
                    //    .then(function (result) {
                    //        loggedUser = result.data;
                    //        vm.canEdit = loggedUser.isAdmin;
                    //    });

                    vm.updatedClient = angular.copy(vm.client);
                }, function (reject) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.getClientById(vm.clientId);

        vm.toggleEditMode = function () {
            vm.isNotEditMode = !vm.isNotEditMode;
            if (vm.isNotEditMode) {
                vm.updatedClient = angular.copy(vm.client);
            }
        }

        vm.editClient = function (updatedClient, editClientsDetailsForm) {
            if (editClientsDetailsForm.$valid) {
                // TODO - extract in a service the part with logOut check.
                if (confirm("Потвърдете промяната на '" + vm.updatedClient.companyName + "'.")) {
                    clientsPageData.editClient(updatedClient)
                        .then(function (client) {
                            notifier.warning("Успешно редактиран '" + client.CompanyName + "'");
                            $state.go('dashboard.clients.detail', { 'id': client.Id });
                            vm.isNotEditMode = !vm.isNotEditMode;
                        }, function (reason) {
                            notifier.error('Грешка: ' + reason.Message);
                        });
                }
            }
        }

        vm.deleteClient = function () {
            if (confirm("Потвърдете изтриването на '" + vm.client.companyName + "'.")) {
                // TODO - extract in a service the part with logOut check.
                clientsPageData.deleteClient(vm.client)
                    .then(function (response) {
                        notifier.warning("Успешно изтрит '" + vm.client.companyName + "'");
                        $state.go('dashboard.clients');

                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('ClientsDetailController', ['$state', '$stateParams', 'auth', 'identity', 'clientsPageData', 'notifier', ClientsDetailController]);
}());