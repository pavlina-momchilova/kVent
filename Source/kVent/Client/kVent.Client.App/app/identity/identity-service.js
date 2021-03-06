﻿(function () {

    'use strict';

    var identityService = function identityService($q, $rootScope, $location) {

        var currentUser = {};
        var deferred = $q.defer();

        var getUser = function getUser() {

        };

        var isAuthenticated = function isAthenticated() {
            var isCurrentUserPresent = Object.getOwnPropertyNames(currentUser).length !== 0;
            
            return isCurrentUserPresent;
        };

        var isAdmin = function isAdmin() {
            return currentUser.data.isAdmin;
        };

        var setUser = function setUser(user) {
            currentUser = user;
            deferred.resolve(user);
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
        .factory('identity', ['$q', '$rootScope', '$location', identityService]);
}());