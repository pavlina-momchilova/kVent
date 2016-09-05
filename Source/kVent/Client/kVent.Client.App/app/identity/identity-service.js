(function () {

    'use strict';

    var identityService = function identityService($q, $rootScope, $location) {

        var currentUser = {};
        var deferred = $q.defer();

        //var getUser = function getUser() {
        //    debugger;
        //    if (this.isAuthenticated()) {
        //        return $q.resolve(currentUser); // creates promise and returns it. Useful when someone is expecting promisse and we need to return result.
        //    }

        //    return deferred.promise;
        //};

        //var isAuthenticated = function isAthenticated() {
        //    var isCurrentUserPresent = Object.getOwnPropertyNames(currentUser).length !== 0;
            
        //    return isCurrentUserPresent;
        //};

        //var isAdmin = function isAdmin() {
        //    return currentUser.data.isAdmin;
        //};

        //var setUser = function setUser(user) {
        //    currentUser = user;
        //    deferred.resolve(user);
        //};

        //var removeUser = function removeUser() {
        //    currentUser = {};
        //    deferred = $q.defer();
        //};

        //return {
        //    getUser: getUser,
        //    isAuthenticated: isAuthenticated,
        //    isAdmin: isAdmin,
        //    setUser: setUser,
        //    removeUser: removeUser
        //}
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