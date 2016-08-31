(function () {
    'use strict';

    var routeResolversProvider = function routeResolversProvider() {
        var routeResolvers = {
            authenticated: ['$q', 'auth', function ($q, auth) {
                if (!auth.isAuthenticated()) {
                    return $q.reject('not authorized');
                }

                return $q.when(true);
            }],
            getUsers: ['usersPageData', function (usersPageData) {
                return usersPageData.getUsers();
            }]
        };

        var routeResolveChecks = {
            users: {
                getUsers: routeResolvers.getUsers
            }
        };

        return {
            $get: function () {
                return routeResolveChecks;
            }
        };
    };

    angular
        .module('kVent')
        .provider('routeResolvers', routeResolversProvider);
}());