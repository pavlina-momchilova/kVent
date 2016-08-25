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
            }
        }

        $routeProvider
            .when('/', {
                templateUrl: 'partials/landing-page/landing-page.html',
                controller: 'LandingPageController',
                constollerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/dashboard', {
                template: '<div> Dashboard </div>',
                resolve: routeResolvers.authenticationRequired
            })
            .when('/identity/login', {
                templateUrl: 'partials/identity/login.html',
                controller: 'LogInController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .otherwise({ redirectTo: '/' });
    };

    function run($http, $cookies, $rootScope, $location, auth, notifier) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                window.history.pushState({}, '/', '/');
                $location.path('/identity/login'); // if user is not authorized redirect to '/'. TODO change it later to some error page
            }

            console.log(previous);
        });

        if (auth.isAuthenticated()) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('authentication');
            auth.getIdentity().then(function (identity) {
                notifier.success('Welcome back, ' + identity.data.userName + '!');
            });
        }
        
        $rootScope.$on('$locationChangeStart', function (ev, newUrl, oldUrl, newState, oldState) {
            console.log(newUrl);
            console.log(oldUrl);
            console.log(newState);
            console.log(oldState);

            //window.location.href = newUrl;
        });
    }

    angular.module('kVent.services', []);
    angular.module('kVent.directives', []);
    angular.module('kVent.controllers', ['kVent.services']);

    angular.module('kVent', ['ngRoute', 'ngCookies', 'kVent.controllers', 'kVent.directives'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', 'notifier', run])
        .value('toastr', toastr);
}());