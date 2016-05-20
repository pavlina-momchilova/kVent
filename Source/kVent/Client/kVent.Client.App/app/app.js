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
            .when('/login', {
                template: '<div> you must be logged in </div>'
            })
            .otherwise({ redirectTo: '/' });
    };

    function run($http, $cookies, $rootScope, $location, auth) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/login'); // if user is not authorized redirect to '/'. TODO change it later to some error page
            }

            console.log(previous);
        });

        if (auth.isAuthenticated()) {
            $http.defaults.headers.common.Authorization = 'Bearer' + $cookies.get('authentication');
            debugger;
            auth.getIdentity().then(function () {
                console.log('... User is loged  on application start... '); // TODO. Change it later to some UI 'hello' message.
            });
        }
        
        $rootScope.$on('$locationChangeStart', function (ev, newUrl, oldUrl, newState, oldState) {
            console.log(newUrl);
            console.log(oldUrl);
            console.log(newState);
            console.log(oldState);
        });
    }

    angular.module('kVent.services', []);
    angular.module('kVent.directives', []);
    angular.module('kVent.controllers', ['kVent.services']);

    angular.module('kVent', ['ngRoute', 'ngCookies', 'kVent.controllers', 'kVent.directives'])
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run])
        .constant('baserUrl', 'http://paovs.com/');
}());