(function () {
    'use strict';

    function usersItemDirective() {
        return {
            restrict: 'E',
            templateUrl: 'partials/dashboard/users/users-item-directive.html',
            replace: true
        };
    }

    angular.module('kVent.directives')
        .directive('usersItemDirective', [usersItemDirective]);
}());