(function () {
    'use strict';

    function dashboardHeaderNotificationDirective() {
        return {
            restrict: 'E',
            templateUrl: 'partials/dashboard/scripts/directives/header/header-notification/header-notification.html',
            replace: true
        };
    }

    angular.module('kVent.directives')
        .directive('dashboardHeaderNotificationDirective', [dashboardHeaderNotificationDirective]);
}());