(function () {

    'use strict';

    function MainLandingPageController() {
        var vm = this;

        vm.helloWorld = "Hello World!";
    }

    angular.module('kVent.controllers')
        .controller('MainLandingPageController', [MainLandingPageController]);
}());