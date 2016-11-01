(function () {
    'use strict';

    var constructionSitesPageData = function constructionSitesPageData(data) {

        function getConstructionSites() {
            return data.get('constructionSites/allConstructionSites', true);
        }

        function addConstructionSite(constructionSite) {
            return data.post('constructionSites/add', constructionSite, true)
        }

        function getConstructionSiteById(id) {
            return data.get('constructionSites?id=' + id, true)
        }

        function deleteConstructionSite(constructionSite) {
            return data.post('constructionSites/delete', constructionSite, true);
        }

        function editConstructionSite(constructionSite) {
            return data.post('constructionSites/edit', constructionSite, true);
        }

        return {
            getConstructionSites: getConstructionSites,
            addConstructionSite: addConstructionSite,
            getConstructionSiteById: getConstructionSiteById,
            deleteConstructionSite: deleteConstructionSite,
            editConstructionSite: editConstructionSite
        };
    };

    angular.module('kVent.data')
        .factory('constructionSitesPageData', ['data', constructionSitesPageData]);
}());