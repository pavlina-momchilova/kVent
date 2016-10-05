(function () {

    'use strict';

    function LandingPageController() {
        var vm = this;

        vm.title = "Aventa";
    }

    angular
        .module('kVent.controllers')
        .controller('LandingPageController', [LandingPageController]);
}());