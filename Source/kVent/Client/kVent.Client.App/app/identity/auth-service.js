(function () {

    'use strict';

    var authService = function authService($http, $q, $cookies, identity) {
        
        var TOKEN_KEY = 'authentication';

        var register = function register() {

        };

        var login = function login() {

        };

        var getIdentity = function getIdentity() {

        };

        return {
            register: register,
            login: login,
            getIdentity: getIdentity,
            isAuthenticated: function () {
                return !!$cookies.get(TOKEN_KEY);
            },
            logout: function () {
                $cookies.remove(TOKEN_KEY);
                $http.defaults.header.common.Authorization = null;
                identity.removeUser();
            }
        };
    };

    angular
        .module('kVent.services')
        .factory('auth', ['$http', '$q', '$cookies', 'identity', authService]);
}());