(function () {
    'use strict';

    function AddUsersController($state, auth, usersPageData, notifier) {
        var vm = this;

        vm.addUser = function (user, addUserForm) {
            if (addUserForm.$valid) {
                debugger;
                auth.registerUser(user)
                .then(function (response) {
                    notifier.success("Успешно добавен '" + user.userName + "'");
                    $state.go('dashboard.users');
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('AddUsersController', ['$state', 'auth', 'usersPageData', 'notifier', AddUsersController]);
}());