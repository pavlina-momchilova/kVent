(function () {

    'use strict';

    var identityService = function identityService($q) {

        var currentUser = {};
        var deferred = $q.defer();

        var getUser = function getUser() {

        };

        var isAuthenticated = function isAthenticated() {

        };

        var isAdmin = function isAdmin() {

        };

        var setUser = function setUser() {

        };

        var removeUser = function removeUser() {
            currentUser = {};
            deferred = $q.defer();
        };

        return {
            getUser: getUser,
            isAuthenticated: isAuthenticated,
            isAdmin: isAdmin,
            setUser: setUser,
            removeUser: removeUser
        }

    };

    angular
        .module('kVent.services')
        .factory('identity', ['$q', identityService]);
}());