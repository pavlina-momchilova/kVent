(function () {
    'use strict';

    function config($routeProvider) {

        $routeProvider
            .when('/', {

            })
            .otherwise({ redirectTo: '/' });
    };

    angular.module('kVent', [])
        .config(['$routeProvider', config]);
}());