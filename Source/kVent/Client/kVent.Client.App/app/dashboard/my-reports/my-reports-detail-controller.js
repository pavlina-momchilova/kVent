(function () {
    'use strict';

    function MyReportsDetailController($state, $stateParams, auth, identity, reportsPageData, constructionSitesPageData, notifier) {
        var vm = this;
        vm.reportId = $stateParams.reportId;
        vm.report = null;
        vm.updatedReport = null;
        vm.canEdit = false;
        vm.user = null;
        vm.constructionSitesArray = null;
        vm.selectedConstructionSite = null;

        vm.init = function () {
            identity.getUser()
                .then(function (result) {
                    vm.user = result.data;
                    vm.getReportById(vm.user.id, vm.reportId);
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.init();

        var getConstructionSites = function () {
            constructionSitesPageData.getConstructionSites()
               .then(function (response) {
                   if (vm.constructionSitesArray === null) {
                       vm.constructionSitesArray = response.data;
                   }

                   vm.updatedReport = angular.copy(vm.report);
                   vm.updatedReport.constructionSiteId = vm.constructionSitesArray.filter(
                       function (item) {
                           return (item.id == vm.updatedReport.constructionSiteId);
                       })[0];

                   vm.updatedReport.date = new Date(vm.updatedReport.date);

                   var startTime = vm.updatedReport.startTime.split(":");
                   var endTime = vm.updatedReport.endTime.split(":");

                   vm.updatedReport.startTime = new Date(0, 0, 0, startTime[0], startTime[1]);
                   vm.updatedReport.endTime = new Date(0, 0, 0, endTime[0], endTime[1]);
                   console.log(vm.updatedReport);
               }, function (reason) {
                   notifier.error('Грешка: ' + reason.Message);
               });
        }

        vm.getReportById = function (userId, reportId) {
            reportsPageData.getReportById(userId, reportId)
                .then(function (result) {
                    if (result.data) {
                        vm.report = result.data;

                        // TODO - extract in a service
                        var loggedUser;
                        identity.getUser()
                            .then(function (result) {
                                loggedUser = result.data;
                                vm.canEdit = vm.user.userName == loggedUser.userName || loggedUser.isAdmin;
                            });

                        getConstructionSites();
                    }
                }, function (reject) {
                    notifier.error('Грешка: ' + reject.Message);
                });
        }

        vm.editUser = function (updatedUser, editUserDetailsForm) {
            if (editUserDetailsForm.$valid) {
                // TODO - extract in a service the part with logOut check.
                var logOut = false;
                identity.getUser()
                    .then(function (result) {
                        var loggedUser = result.data;
                        logOut = vm.user.userName == loggedUser.userName;
                        var currentUserChangeConfirmText = " Ще трябва да влезете в системата отново, за да се отразят промените.";
                        var textToConfirm = "Потвърдете промяната на '" + vm.user.userName + "'.";
                        if (logOut) {
                            textToConfirm += currentUserChangeConfirmText;
                        }

                        if (confirm(textToConfirm)) {
                            usersPageData.editUser(updatedUser)
                                .then(function (user) {
                                    notifier.warning("Успешно редактиран '" + user.UserName + "'");

                                    if (logOut) {
                                        auth.logout();
                                        $state.go('landingPage');
                                    } else {
                                        $state.go('dashboard.users.detail', { 'username': user.UserName });
                                    }

                                }, function (reason) {
                                    notifier.error('Грешка: ' + reason.Message);
                                });
                        }
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('MyReportsDetailController', ['$state', '$stateParams', 'auth', 'identity', 'reportsPageData', 'constructionSitesPageData', 'notifier', MyReportsDetailController]);
}());