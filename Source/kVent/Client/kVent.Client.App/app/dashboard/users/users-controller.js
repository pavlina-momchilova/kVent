(function () {
    'use strict';

    function UsersController($state, auth, identity, usersPageData, notifier) {
        var vm = this;
        vm.users = null;

        vm.getUsers = function () {
            usersPageData.getUsers()
                .then(function (response) {
                    if (vm.users === null) {
                        vm.users = response.data;
                    }
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.getUsers();

        vm.isAdmin = identity.isAdmin();
    }

    angular
        .module('kVent.controllers')
        .controller('UsersController', ['$state', 'auth', 'identity', 'usersPageData', 'notifier', UsersController]);
}());