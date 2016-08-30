(function () {
    'use strict';

    function dashboardHeaderDirective() {
        return {
            restrict: 'E',
            templateUrl: 'partials/dashboard/scripts/directives/header/header.html',
            replace: true
        };
    }

    angular.module('kVent.directives')
        .directive('dashboardHeaderDirective', [dashboardHeaderDirective]);
}());