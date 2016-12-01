(function () {
    'use strict';

    function ReportsController($state, auth, identity, reportsPageData, constructionSitesPageData, notifier) {
        var vm = this;
        vm.reportEntries = null;
        vm.index = 0;
        vm.constructionSitesArray = null;
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
                   }
               }, function (reason) {
                   notifier.error('Грешка: ' + reason.Message);
               });
            console.log(vm.constructionSitesArray);
        }

        getConstructionSites();

        vm.filterTable = function (filter, filterTableForm) {
            //debugger;
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

                reportsPageData.filterRecords(refactoredFilter)
                    .then(function (response) {
                        vm.index = 0;
                        vm.reportEntries = response.data;
                        vm.index += vm.reportEntries.length;
                        console.log(response);
                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('ReportsController', ['$state', 'auth', 'identity', 'reportsPageData', 'constructionSitesPageData', 'notifier', ReportsController]);
}());