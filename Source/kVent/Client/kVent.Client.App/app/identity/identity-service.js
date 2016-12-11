(function () {

    'use strict';

    var identityService = function identityService($q, $rootScope, $location) {

        var currentUser = {};
        var deferred = $q.defer();

        return {
            getUser: function () {
                if (this.isAuthenticated()) {
                    return $q.resolve(currentUser);
                }

                return deferred.promise;
            },
            isAuthenticated: function () {
                return Object.getOwnPropertyNames(currentUser).length !== 0;
            },
            isAdmin: function () {
                return currentUser.data.isAdmin;
            },
            setUser: function (user) {
                currentUser = user;
                deferred.resolve(user);
            },
            removeUser: function () {
                currentUser = {};
                deferred = $q.defer();
            }
        };

    };

    angular
        .module('kVent.services')
        .factory('identity', ['$q', '$rootScope', '$location', identityService]);
}());