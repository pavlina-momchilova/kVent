(function () {
    'use strict';

    function ReportsController($state, auth, identity, reportsPageData, constructionSitesPageData, notifier) {
        var vm = this;
        vm.reportEntries = null;
        vm.index = 0;
        vm.constructionSitesArray = null;

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
            refactoredFilter.fromDate = filter.fromDate.getFullYear() + "-" +
                (filter.fromDate.getMonth() + 1) + "-" +
                filter.fromDate.getDate();

            refactoredFilter.toDate = filter.toDate.getFullYear() + "-" +
                (filter.toDate.getMonth() + 1) + "-" +
                filter.toDate.getDate();

            refactoredFilter.constructionSiteName = filter.constructionSiteId.constructionSiteName;
            console.log(refactoredFilter);
            reportsPageData.filterRecords(refactoredFilter);
        }
    }

    angular
        .module('kVent.controllers')
        .controller('ReportsController', ['$state', 'auth', 'identity', 'reportsPageData', 'constructionSitesPageData', 'notifier', ReportsController]);
}());