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
            console.log("filter from data.js");
            console.log(filter);
            var query = "?fromDate=" + filter.fromDate
                + "&toDate=" + filter.toDate
                + "&constructionSiteName=" + filter.constructionSiteName;
            console.log("query " + query);
            return data.get('/records' + query, true)
        }

        return {
            getReportsForUser: getReportsForUser,
            getReports: getReports,
            addReport: addReport,
            filterRecords: filterRecords
        };
    };

    angular.module('kVent.data')
        .factory('reportsPageData', ['data', reportsPageData]);
}());