(function () {

    'use strict';

    function LogInController($location, auth, identity, notifier) {
        var vm = this;

        vm.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user)
                    .then(function () {
                        $location.path('/dashboard/home');
                        auth.getIdentity().then(function (identity) {
                            notifier.success('Welcome back, ' + identity.data.userName + '!');
                        });
                    }, function (reason) {
                        notifier.error('Wrong credentials!');
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('LogInController', ['$location', 'auth', 'identity', 'notifier', LogInController]);
}());