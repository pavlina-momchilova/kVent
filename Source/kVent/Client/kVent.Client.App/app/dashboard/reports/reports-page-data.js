(function () {
    'use strict';

    var reportsPageData = function reportsPageData(data) {
        function getReportsForUser(username) {
            return data.get('records?username=' + username, true);
        }

        function getReports() {
            return data.get('records', true);
        }

        function getReportById(userId, reportId) {
            var query = "?userId=" + userId
                + "&id=" + reportId;

            return data.get('records' + query, true);
        }

        function addReport(report) {
            return data.post('records/add', report, true);
        }

        function filterRecords(filter) {
            var query = "?fromDate=" + filter.fromDate +
                "&toDate=" + filter.toDate +
                "&constructionSiteName=" + filter.constructionSiteName +
                "&userName=" + filter.userName;

            return data.get('records' + query, true)
        }

        function deleteRecord(userId, recordId) {
            var query = "?userId=" + userId
                + "&recordId=" + recordId;

            return data.post('records/delete' + query, true);
        }

        function editRecord(record) {
            return data.post('records/edit', record, true);
        }

        return {
            getReportsForUser: getReportsForUser,
            getReports: getReports,
            addReport: addReport,
            filterRecords: filterRecords,
            deleteRecord: deleteRecord,
            editRecord: editRecord,
            getReportById: getReportById
        };
    };

    angular.module('kVent.data')
        .factory('reportsPageData', ['data', reportsPageData]);
}());