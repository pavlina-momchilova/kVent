(function () {
    'use strict';

    function dashboardHeaderNotificationDirective() {
        return {
            restrict: 'E',
            templateUrl: 'partials/dashboard/scripts/directives/header/header-notification/header-notification.html',
            replace: true,
            controller: 'MainController',
            controllerAs: 'vm'
        };
    }

    angular.module('kVent.directives')
        .directive('dashboardHeaderNotificationDirective', [dashboardHeaderNotificationDirective]);
}());