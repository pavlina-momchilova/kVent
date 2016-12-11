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

        function filterRecords(filter) {
            var query = "?fromDate=" + filter.fromDate
                + "&toDate=" + filter.toDate
                + "&constructionSiteName=" + filter.constructionSiteName;

            return data.get('/records' + query, true)
        }

        function deleteRecord(userId, recordId) {
            var query = "?userId=" + userId
                + "&recordId=" + recordId;

            return data.post('/records/delete' + query, true);
        }

        return {
            getReportsForUser: getReportsForUser,
            getReports: getReports,
            addReport: addReport,
            filterRecords: filterRecords,
            deleteRecord: deleteRecord
        };
    };

    angular.module('kVent.data')
        .factory('reportsPageData', ['data', reportsPageData]);
}());