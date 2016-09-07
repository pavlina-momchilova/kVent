(function () {
    'use strict';

    var constructionSitesPageData = function constructionSitesPageData(data) {

        function getConstructionSites() {
            return data.get('constructionSites/allConstructionSites', true);
        }

        function addConstructionSite(constructionSite) {
            console.log(constructionSite);
            return data.post('constructionSites/add', constructionSite, true)
        }

        function getClientById(id) {
            return data.get('clients?id=' + id, true)
        }

        function deleteClient(client) {
            return data.post('clients/delete', client, true);
        }

        function editClient(client) {
            return data.post('clients/edit', client, true);
        }

        return {
            getConstructionSites: getConstructionSites,
            addConstructionSite: addConstructionSite,
            getClientById: getClientById,
            deleteClient: deleteClient,
            editClient: editClient
        };
    };

    angular.module('kVent.data')
        .factory('constructionSitesPageData', ['data', constructionSitesPageData]);
}());