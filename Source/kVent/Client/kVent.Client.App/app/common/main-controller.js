(function () {
    'use strict';

    var mainController = function mainController($state, auth, identity) {
        var vm = this;
        //waitForLogin();

        vm.logout = function logout() {
            auth.logout();
            vm.currentUser = undefined;
            waitForLogin();
            $state.go('landingPage');
        };

        //vm.search = function (searchTerm) {
        //    $location.path('/projects/search').search('term', searchTerm);
        //};

        function waitForLogin() {
            identity.getUser().then(function (user) {
                vm.currentUser = user;
            });
        }
    };

    angular
        .module('kVent.controllers')
        .controller('MainController', ['$state', 'auth', 'identity', mainController]);
}());