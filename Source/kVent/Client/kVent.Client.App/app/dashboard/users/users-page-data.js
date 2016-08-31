(function () {
    'use strict';

    var usersPageData = function usersPageData(data) {
        function getUsers() {
            return data.get('/users/allUsers');
        }

        return {
            getUsers: getUsers
        };
    };

    angular.module('kVent.data')
        .factory('usersPageData', ['data', usersPageData]);
}());