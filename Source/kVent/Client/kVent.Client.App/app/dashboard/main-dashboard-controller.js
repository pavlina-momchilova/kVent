(function () {

    'use strict';

    function MainDashboardController($scope) {
        var vm = this;
        vm.title = "taxt";
        vm.press = function () {
            console.log("Clicked md fk");
        }
    }

    angular
        .module('kVent.controllers')
        .controller('MainDashboardController', [MainDashboardController]);
}());