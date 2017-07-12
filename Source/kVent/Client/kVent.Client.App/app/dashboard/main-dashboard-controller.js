(function () {

    'use strict';

    function MainDashboardController($scope) {
        var vm = this;
        vm.title = "taxt";
        vm.press = function () {
        }
    }

    angular
        .module('kVent.controllers')
        .controller('MainDashboardController', [MainDashboardController]);
}());