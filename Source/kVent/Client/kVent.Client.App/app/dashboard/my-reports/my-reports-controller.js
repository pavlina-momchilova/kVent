(function () {
    'use strict';

    function MyReportsController($state, auth, identity, reportsPageData, notifier) {
        var vm = this;
        vm.reportEntries = null;
        vm.index = 0;

        vm.getReports = function () {

            identity.getUser()
                .then(function (result) {
                    vm.username = result.data.userName;
                    reportsPageData.getReportsForUser(vm.username)
                        .then(function (response) {
                            vm.reportEntries = response.data;
                            vm.index += vm.reportEntries.length;
                        }, function (reason) {
                            notifier.error('Грешка: ' + reason.Message);
                        });

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
        .controller('MyReportsController', ['$state', 'auth', 'identity', 'reportsPageData', 'notifier', MyReportsController]);
}());