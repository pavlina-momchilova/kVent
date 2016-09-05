(function () {
    'use strict';

    function AddClientsController($state, auth, clientsPageData, notifier) {
        var vm = this;

        vm.addClient = function (client, addClientForm) {
            if (addClientForm.$valid) {
                clientsPageData.addClient(client)
                    .then(function (response) {
                        notifier.success("Успешно добавен '" + response.CompanyName + "'");
                        $state.go('dashboard.clients');
                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('AddClientsController', ['$state', 'auth', 'clientsPageData', 'notifier', AddClientsController]);
}());