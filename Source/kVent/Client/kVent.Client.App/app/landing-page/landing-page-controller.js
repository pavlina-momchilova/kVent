(function () {

    'use strict';

    function LandingPageController() {
        var vm = this;

        vm.title = "kVent";
    }

    angular.module('kVent.controllers')
        .controller('LandingPageController', [LandingPageController]);
}());