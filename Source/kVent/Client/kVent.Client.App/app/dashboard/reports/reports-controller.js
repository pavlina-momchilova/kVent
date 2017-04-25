(function () {
    'use strict';

    function ReportsController($state, $timeout, auth, identity, reportsPageData, constructionSitesPageData, notifier, reportsExcelExporter, usersPageData) {
        var vm = this;
        vm.reportEntries = null;
        vm.index = 0;
        vm.constructionSitesArray = null;
        vm.usersArray = null;
        vm.filter = {};

        vm.getReports = function () {

            reportsPageData.getReports()
                .then(function (response) {
                    vm.reportEntries = response.data;
                    vm.index += vm.reportEntries.length;
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });

            //reportsPageData.getReportsForUser()
            //    .then(function (response) {
            //        if (vm.users === null) {
            //            vm.users = response.data;
            //        }
            //    }, function (reason) {
            //        notifier.error('Грешка: ' + reason.Message);
            //    });
        }

        vm.getReports();

        var getConstructionSites = function () {
            constructionSitesPageData.getConstructionSites()
               .then(function (response) {
                   if (vm.constructionSitesArray === null) {
                       vm.constructionSitesArray = response.data;
                       console.log(vm.constructionSitesArray);
                   }
               }, function (reason) {
                   notifier.error('Грешка: ' + reason.Message);
               });
        }

        getConstructionSites();

        var getUsers = function () {
            usersPageData.getUsers()
                .then(function (response) {
                    if (vm.usersArray === null) {
                        vm.usersArray = response.data;
                        vm.usersArray.forEach(function (e) {
                            e.fullName = e.firstName + " " + e.lastName;
                        });
                    }
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        getUsers();

        vm.filterTable = function (filter, filterTableForm) {
            var refactoredFilter = {};

            if (filter != undefined) {

                refactoredFilter.fromDate = null;
                refactoredFilter.toDate = null;
                refactoredFilter.constructionSiteName = null;

                if (filter.fromDate) {
                    refactoredFilter.fromDate = filter.fromDate.getFullYear() + "-" +
                        (filter.fromDate.getMonth() + 1) + "-" +
                        filter.fromDate.getDate();
                }

                if (filter.toDate) {
                    refactoredFilter.toDate = filter.toDate.getFullYear() + "-" +
                        (filter.toDate.getMonth() + 1) + "-" +
                        filter.toDate.getDate();
                }

                if (filter.constructionSiteId) {
                    refactoredFilter.constructionSiteName = filter.constructionSiteId.constructionSiteName;
                }

                if (filter.user && filter.user.userName) {
                    refactoredFilter.userName = filter.user.userName;
                }

                reportsPageData.filterRecords(refactoredFilter)
                    .then(function (response) {
                        vm.index = 0;
                        vm.reportEntries = response.data;
                        vm.index += vm.reportEntries.length;
                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                    });
            }
        }

        vm.exportToExel = function (tableId) {
            var exportHref = reportsExcelExporter.tableToExcel(tableId, 'title.xlsx');
            $timeout(function () { location.href = exportHref; }, 100); // trigger download 
        }
    }

    angular
        .module('kVent.controllers')
        .controller('ReportsController', ['$state', '$timeout', 'auth', 'identity', 'reportsPageData', 'constructionSitesPageData', 'notifier', 'reportsExcelExporter', 'usersPageData', ReportsController]);
}());