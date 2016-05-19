(function () {
    'use strict';

    function config($routeProvider, $locationProvider) {

        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

        $locationProvider.html5Mode(true);

        var routeResolvers = {
            authenticationRequired: {
                authenticate: ['$q', 'auth', function ($q, auth) {
                    if (auth.isAuthenticated()) {
                        return true;
                    }

                    return $q.reject('not authorized');
                }]
            },
            isUserAuthenticated: {
                isUserAuthenticated: ['$rootScope', '$location', 'auth', function ($rootScope, $location, auth) {
                    if (!auth.isAuthenticated()) {
                        //$rootScope.previousState = $location.path(prevUrl);
                        $rootScope.previousState = $location.path($rootScope.prevUrl);
                        $location.path('/login');
                    }
                }]
            }
        }

        $routeProvider
            .when('/', {
                templateUrl: 'partials/landing-page/landing-page.html',
                controller: 'LandingPageController',
                constollerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/dashboard', {
                templateUrl: '<div> Dashboard </div>',
                resolve: routeResolvers.isUserAuthenticated
            })
            .when('/login', {
                template: '<div> you must be logged in </div>'
            })
            .otherwise({ redirectTo: '/' });
    };

    function run($http, $cookies, $rootScope, $location, auth) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/'); // if user is not authorized redirect to '/'. TODO change it later to some error page
            }
        });

        if (auth.isAuthenticated()) {
            $http.defaults.headers.common.Authorization = 'Bearer' + $cookies.get('authentication');
            debugger;
            auth.getIdentity().then(function () {
                console.log('... User is loged  on application start... '); // TODO. Change it later to some UI 'hello' message.
            });
        }

        var history = [];

        $rootScope.$on('$routeChangeSuccess', function () {
            history.push($location.$$path);
        });

        $rootScope.prevUrl = function () {
            return history.length > 1 ? history[history.length - 2] : "/";
        };
    }

    angular.module('kVent.services', []);
    angular.module('kVent.directives', []);
    angular.module('kVent.controllers', ['kVent.services']);

    angular.module('kVent', ['ngRoute', 'ngCookies', 'kVent.controllers', 'kVent.directives'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run])
        .constant('baserUrl', 'http://paovs.com/');
}());