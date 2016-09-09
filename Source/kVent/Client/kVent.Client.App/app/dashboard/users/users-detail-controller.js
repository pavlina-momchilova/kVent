(function () {
    'use strict';

    function UsersDetailController($state, $stateParams, auth, identity, usersPageData, notifier) {
        var vm = this;
        vm.username = $stateParams.username;
        vm.user = null;
        vm.updatedUser = null;
        vm.isNotEditMode = true;
        vm.canEdit = false;

        vm.getUserByUsername = function (username) {
            usersPageData.getUserByUsername(username)
                .then(function (result) {
                    vm.user = result.data;

                    // TODO - extract in a service
                    var loggedUser;
                    identity.getUser()
                        .then(function (result) {
                            loggedUser = result.data;
                            vm.canEdit = vm.user.userName == loggedUser.userName || loggedUser.isAdmin;
                        });

                    vm.updatedUser = angular.copy(vm.user);
                }, function (reject) {
                    notifier.error('Грешка: ' + reject.Message);
                });
        }

        vm.getUserByUsername(vm.username);

        vm.toggleEditMode = function () {
            vm.isNotEditMode = !vm.isNotEditMode;
            if (vm.isNotEditMode) {
                vm.updatedUser = angular.copy(vm.user);
            }
        }

        vm.editUser = function (updatedUser, editUserDetailsForm) {
            if (editUserDetailsForm.$valid) {
                // TODO - extract in a service the part with logOut check.
                var logOut = false;
                identity.getUser()
                    .then(function (result) {
                        var loggedUser = result.data;
                        logOut = vm.user.userName == loggedUser.userName;
                        var currentUserChangeConfirmText = " Ще трябва да влезете в системата отново, за да се отразят промените.";
                        var textToConfirm = "Потвърдете промяната на '" + vm.user.userName + "'.";
                        if (logOut) {
                            textToConfirm += currentUserChangeConfirmText;
                        }

                        if (confirm(textToConfirm)) {
                            usersPageData.editUser(updatedUser)
                                .then(function (user) {
                                    notifier.warning("Успешно редактиран '" + user.UserName + "'");

                                    if (logOut) {
                                        auth.logout();
                                        $state.go('landingPage');
                                    } else {
                                        $state.go('dashboard.users.detail', { 'username': user.UserName });
                                    }

                                }, function (reason) {
                                    notifier.error('Грешка: ' + reason.Message);
                                });
                        }
                    });
            }
        }

        vm.deleteUser = function () {
            if (confirm("Потвърдете изтриването на '" + vm.user.userName + "'.")) {
                // TODO - extract in a service the part with logOut check.
                var logOut = false;
                identity.getUser()
                    .then(function (result) {
                        var loggedUser = result.data;
                        logOut = vm.user.userName == loggedUser.userName;

                        usersPageData.deleteUser(vm.user)
                            .then(function (response) {
                                notifier.warning("Успешно изтрит '" + vm.user.userName + "'");

                                if (logOut) {
                                    auth.logout();
                                    $state.go('landingPage');
                                } else {
                                    $state.go('dashboard.users');
                                }

                            }, function (reason) {
                                notifier.error('Грешка: ' + reason.Message);
                            });
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('UsersDetailController', ['$state', '$stateParams', 'auth', 'identity', 'usersPageData', 'notifier', UsersDetailController]);
}());