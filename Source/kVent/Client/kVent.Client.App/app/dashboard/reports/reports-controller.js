(function () {
    'use strict';

    function ReportsController($state, auth, identity, reportsPageData, notifier) {
        var vm = this;
        vm.reportEntries = null;
        vm.index = 0;

        vm.getReports = function () {

            reportsPageData.getReports()
                .then(function (response) {
                    vm.reportEntries = response.data;
                    console.log(vm.reportEntries);
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
    }

    angular
        .module('kVent.controllers')
        .controller('ReportsController', ['$state', 'auth', 'identity', 'reportsPageData', 'notifier', ReportsController]);
}());