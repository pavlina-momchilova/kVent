(function () {
    'use strict';

    function dashboardTimelineDirective() {
        return {
            templateUrl: 'partials/dashboard/scripts/directives/timeline/timeline.html',
            restrict: 'E',
            replace: true
        }
    }

    angular.module('kVent.directives')
        .directive('dashboardTimelineDirective', [dashboardTimelineDirective]);
}());