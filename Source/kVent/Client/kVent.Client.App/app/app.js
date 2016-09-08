(function () {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

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
            adminAuthenticationRequired: {
                authenticate: ['$q', 'auth', 'identity', function ($q, auth, identity) {
                    var deferred = $q.defer();

                    auth.getIdentity()
                        .then(function () {
                            if (auth.isAuthenticated() && identity.isAdmin()) {
                                deferred.resolve(true);
                            } else {
                                deferred.reject('not admin');
                            }
                        });

                    return deferred.promise;
                }]
            }
        }

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('landingPage', {
                url: '/',
                templateUrl: 'partials/landing-page/landing-page.html',
                controller: 'LandingPageController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'partials/dashboard/views/dashboard/main.html',
                controller: 'MainDashboardController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.home', {
                url: '/home',
                templateUrl: 'partials/dashboard/views/dashboard/home.html',
                controller: 'MainDashboardController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.users', {
                url: '/users',
                templateUrl: 'partials/dashboard/users/users-list.html',
                controller: 'UsersController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.users.add', {
                url: '/users/add',
                parent: 'dashboard',
                templateUrl: 'partials/dashboard/users/users-add.html',
                controller: 'AddUsersController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.adminAuthenticationRequired
            })
            .state('dashboard.users.detail', {
                url: '/users/{username:.*}',
                parent: 'dashboard',
                templateUrl: 'partials/dashboard/users/users-detail-view.html',
                controller: 'UsersDetailController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.clients', {
                url: '/clients',
                templateUrl: 'partials/dashboard/clients/clients-list.html',
                controller: 'ClientsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.clients.add', {
                url: '/clients/add',
                parent: 'dashboard',
                templateUrl: 'partials/dashboard/clients/clients-add.html',
                controller: 'AddClientsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.adminAuthenticationRequired
            })
            .state('dashboard.clients.detail', {
                url: '/clients/{id:.*}',
                parent: 'dashboard',
                templateUrl: 'partials/dashboard/clients/clients-detail-view.html',
                controller: 'ClientsDetailController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.constructionSites', {
                url: '/constructionSites',
                templateUrl: 'partials/dashboard/constructionSites/construction-sites-list.html',
                controller: 'ConstructionSitesController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.authenticationRequired
            })
            .state('dashboard.constructionSites.add', {
                url: '/constructionSites/add',
                parent: 'dashboard',
                templateUrl: 'partials/dashboard/constructionSites/construction-sites-add.html',
                controller: 'AddConstructionSitesController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME,
                resolve: routeResolvers.adminAuthenticationRequired
            })
            .state('dashboard.myReports', {
                url: '/myReports',
                templateUrl: 'partials/dashboard/myReports/myReports-list.html'
            })
            .state('dashboard.reports', {
                url: '/reports',
                templateUrl: 'partials/dashboard/reports/reports-list.html'
            })
            .state('login', {
                url: '/identity/login',
                templateUrl: 'partials/identity/login.html',
                controller: 'LogInController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            });

        //$routeProvider
        //    .when('/', {
        //        templateUrl: 'partials/landing-page/landing-page.html',
        //        controller: 'LandingPageController',
        //        controllerAs: CONTROLLER_VIEW_MODEL_NAME
        //    })
        //    .when('/dashboard', {
        //        templateUrl: 'partials/dashboard/views/dashboard/main.html',
        //        controller: 'MainDashboardController',
        //        controllerAs: CONTROLLER_VIEW_MODEL_NAME,
        //        resolve: routeResolvers.authenticationRequired
        //    })
        //    .when('/identity/login', {
        //        templateUrl: 'partials/identity/login.html',
        //        controller: 'LogInController',
        //        controllerAs: CONTROLLER_VIEW_MODEL_NAME
        //    })
        //    .otherwise({ redirectTo: '/' });
    };

    function run($http, $cookies, $rootScope, $state, $location, auth, identity, notifier) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'not authorized') {
                // TODO. if prev 'login' then no 'login' !
                //event.preventDefault();
                if (fromState.name != 'login') {
                    $state.go('login');
                } else {
                    $state.go('landingPage'); // TODO  possibe problem. fix it to retur to previous, not only 'landingPage'
                }
            } else if (error === 'not admin') {
                notifier.error('Нямате администраторски права!');
                window.history.back(1)
            }
        });

        if (auth.isAuthenticated()) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get('authentication');
            auth.getIdentity().then(function (identity) {
                notifier.success('Здравей, ' + identity.data.userName + '!');
            });
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (toState.url === '/dashboard') {
                event.preventDefault();
                $state.go('dashboard.home'); // TODO arrange better state routing.!s
            }
        });
    }

    angular.module('kVent.data', []);
    angular.module('kVent.services', []);
    angular.module('kVent.controllers', ['kVent.data', 'kVent.services']);
    angular.module('kVent.directives', []);

    angular.module('kVent', ['ui.router', 'ngCookies', 'kVent.controllers', 'kVent.directives', 'ui.select', 'ngSanitize'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$state', '$location', 'auth', 'identity', 'notifier', run])
        .value('toastr', toastr)
        .constant('appSettings', {
            serverPath: '/api/',
        });
}());