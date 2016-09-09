(function () {
    'use strict';

    function AddMyReportsController($state, auth, identity, reportsPageData, constructionSitesPageData, notifier) {
        var vm = this;
        vm.user = null;

        vm.init = function () {

            identity.getUser()
                .then(function (result) {
                    vm.user = result.data;
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.init();

        vm.constructionSitesArray = null;

        vm.selectedConstructionSite = null;

        vm.addRecord = function (record, addRecordForm) {
            var refactoredRecord = {};
            refactoredRecord.constructionSiteId = record.constructionSiteId.id;
            refactoredRecord.userId = vm.user.id;
            refactoredRecord.date = record.date.getFullYear() + "-" +
                (record.date.getMonth() + 1) + "-" +
                record.date.getDate();

            refactoredRecord.startTime = record.startTime.getHours() + ":" +
                record.startTime.getMinutes() + ":" +
                record.startTime.getSeconds();

            refactoredRecord.endTime = record.endTime.getHours() + ":" +
                record.endTime.getMinutes() + ":" +
                record.endTime.getSeconds();
            
            if (addRecordForm.$valid) {
                reportsPageData.addReport(refactoredRecord)
                    .then(function (response) {
                        notifier.success(response.UserName + 
                            " е работил " + 
                            response.WorkedHours + 
                            " часа на строителният обект '" + 
                            response.ConstructionSiteName + "'");
                        $state.go('dashboard.myReports');
                    }, function (reject) {
                        notifier.error('Грешка: ' + reject.Message);
                    });
            }
        }

        var getConstructionSites = function () {
            constructionSitesPageData.getConstructionSites()
               .then(function (response) {
                   if (vm.constructionSitesArray === null) {
                       vm.constructionSitesArray = response.data;
                   }
               }, function (reason) {
                   notifier.error('Грешка: ' + reason.Message);
               });
        }

        getConstructionSites();
    }

    angular
        .module('kVent.controllers')
        .controller('AddMyReportsController', ['$state', 'auth', 'identity', 'reportsPageData', 'constructionSitesPageData', 'notifier', AddMyReportsController]);
}());