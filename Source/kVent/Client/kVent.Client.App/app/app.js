(function () {
    'use strict';

    function config($routeProvider) {

        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

        $locationProvider.html5Mode(true);

        var rotueResolvers = {
            authenticationRequired: {
                authenticate: ['$q', 'auth', function ($q, auth) {
                    if (auth.isAuthehticated()) {
                        return true;
                    }

                    return $q.reject('not authorized');
                }]
            }
        }

        $routeProvider
            .when('/', {

            })
            .otherwise({ redirectTo: '/' });
    };

    function run($http, $cookies, $rootScope, $location, auth) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/'); // if user is not authorized redirect to '/'. TODO change it later to some error page
            }
        });

        if (auth.isAuthehticated()) {
            $http.defaults.headers.common.Authorization = 'Bearer' + $cookies.get('authentication');
            auth.getIdentity().then(function () {
                console.log('... User is loged  on application start... '); // TODO. Change it later to some UI 'hello' message.
            });
        }
    }

    angular.module('kVent.services', []);
    angular.module('kVent.directives', []);
    angular.module('kVant.controllers', []);

    angular.module('kVent', ['ngRoute', 'ngCookies', 'kVent.controllers', 'kVent.directives'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run])
        .constant('baserUrl', 'http://paovs.com/');
}());