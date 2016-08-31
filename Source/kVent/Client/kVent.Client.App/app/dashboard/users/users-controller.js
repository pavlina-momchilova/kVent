(function () {
    'use strict';

    function UsersController(usersPageData, notifier) {
        var vm = this;
        vm.users = null;

        vm.getUsers = function () {
            usersPageData.getUsers()
                .then(function (response) {
                    console.log(response);
                    if (vm.users === null) {
                        vm.users = response.data;
                    }
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.message);
                });
        }

        vm.getUsers();
    }

    angular
        .module('kVent.controllers')
        .controller('UsersController', ['usersPageData', 'notifier', UsersController]);
}());