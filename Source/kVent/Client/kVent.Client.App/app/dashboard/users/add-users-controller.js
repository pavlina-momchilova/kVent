(function () {
    'use strict';

    function AddUsersController($state, auth, usersPageData, notifier) {
        var vm = this;

        vm.addUser = function (user, addUserForm) {
            if (addUserForm.$valid) {
                auth.registerUser(user)
                .then(function (response) {
                    notifier.success("Успешно добавен '" + user.userName + "'");
                    $state.go('dashboard.users');
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.message);
                });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('AddUsersController', ['$state', 'auth', 'usersPageData', 'notifier', AddUsersController]);
}());