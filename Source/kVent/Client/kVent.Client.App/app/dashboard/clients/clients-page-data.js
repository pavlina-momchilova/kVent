(function () {
    'use strict';

    var clientsPageData = function clientsPageData(data) {

        function getClients() {
            return data.get('/clients/allClients', true);
        }

        function addClient(client) {
            return data.post('clients/add', client, true)
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
            getClients: getClients,
            addClient: addClient,
            getClientById: getClientById,
            deleteClient: deleteClient,
            editClient: editClient
        };
    };

    angular.module('kVent.data')
        .factory('clientsPageData', ['data', clientsPageData]);
}());