(function () {
    'use strict';

    function ClientsController($state, auth, identity, clientsPageData, notifier) {
        var vm = this;
        vm.clients = null;

        vm.getClients = function () {
            clientsPageData.getClients()
                .then(function (response) {
                    if (vm.clients === null) {
                        vm.clients = response.data;
                    }
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.getClients();

        vm.isAdmin = identity.isAdmin();
    }

    angular
        .module('kVent.controllers')
        .controller('ClientsController', ['$state', 'auth', 'identity', 'clientsPageData', 'notifier', ClientsController]);
}());