(function () {
    'use strict';

    function dashboardStatsDirective() {
        return {
            templateUrl: 'partials/dashboard/scripts/directives/dashboard/stats/stats.html',
            restrict: 'E',
            replace: true,
            scope: {
                'model': '=',
                'comments': '@',
                'number': '@',
                'name': '@',
                'colour': '@',
                'details': '@',
                'type': '@',
                'goto': '@'
            }
        }
    }

    angular.module('kVent.directives')
        .directive('dashboardStatsDirective', [dashboardStatsDirective]);
}());