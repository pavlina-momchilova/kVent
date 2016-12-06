(function () {
    'use strict';

    function AddConstructionSitesController($state, auth, constructionSitesPageData, clientsPageData, notifier) {
        var vm = this;
        vm.paymentOptions = [
            { id: 0, value: false, name: 'Бюджетен' },
            { id: 1, value: true, name: 'Почасов' }
        ]

        vm.clientsArray = null;

        vm.selectedItem = null;

        vm.addConstructionSite = function (constructionSite, addConstructionSitesForm) {
            if (addConstructionSitesForm.$valid) {
                constructionSite.paymentPerHour = constructionSite.paymentPerHour.value;
                constructionSite.clientId = constructionSite.clientId.id;
                //console.log(constructionSite);
                constructionSitesPageData.addConstructionSite(constructionSite)
                    .then(function (response) {
                        notifier.success("Успешно добавен '" + constructionSite.constructionSiteName + "'");
                        $state.go('dashboard.constructionSites');
                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                    });
            }
        }

        var getClients = function () {
            clientsPageData.getClients()
               .then(function (response) {
                   if (vm.clientsArray === null) {
                       vm.clientsArray = response.data;
                   }
                   //console.log(vm.clientsArray);
               }, function (reason) {
                   notifier.error('Грешка: ' + reason.Message);
               });
        }

        getClients();
    }

    angular
        .module('kVent.controllers')
        .controller('AddConstructionSitesController', ['$state', 'auth', 'constructionSitesPageData', 'clientsPageData', 'notifier', AddConstructionSitesController]);
}());