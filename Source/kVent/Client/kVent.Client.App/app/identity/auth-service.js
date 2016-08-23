(function () {

    'use strict';

    var authService = function authService($http, $q, $cookies, identity) {
        
        var TOKEN_KEY = 'authentication';

        var register = function register() {

        };

        var login = function login(user) {
            var deferred = $q.defer();

            var data = 'grant_type=password&username=' + (user.username || '') + '&password=' + (user.password || '');

            $http.post('/api/Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    var tokenValue = response.access_token;

                    var theBigDay = new Date();
                    theBigDay.setHours(theBigDay.getHours() + 72);

                    $cookies.put(TOKEN_KEY, tokenValue, { expires: theBigDay });

                    $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

                    getIdentity().then(function () {
                        deferred.resolve(response);
                    });

                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var getIdentity = function getIdentity() {
            var deferred = $q.defer();
            
            $http.get('/api/account/identity')
                .success(function (identityResponse) {
                    identity.setUser(identityResponse);
                    deferred.resolve(identityResponse);
                });

            return deferred.promise;
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