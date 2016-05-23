(function () {

    'use strict';

    function LogInController($location, auth) {
        var vm = this;

        vm.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user)
                    .then(function () {
                        // use some notification (toaster);
                        console.log('user is loged in');
                        $location.path('/dasboard');
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('LogInController', ['$location', 'auth', LogInController]);
}());