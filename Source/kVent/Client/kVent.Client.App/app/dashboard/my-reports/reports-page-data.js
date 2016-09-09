(function () {
    'use strict';

    var reportsPageData = function reportsPageData(data) {
        function getReportsForUser(username) {
            return data.get('/records?username=' + username, true);
        }

        function getReports() {
            return data.get('/records', true);
        }

        function addReport(report) {
            return data.post('/records/add', report, true);
        }

        return {
            getReportsForUser: getReportsForUser,
            getReports: getReports,
            addReport: addReport
        };
    };

    angular.module('kVent.data')
        .factory('reportsPageData', ['data', reportsPageData]);
}());