(function () {
    'use strict';

    var usersPageData = function usersPageData(data) {
        function getUsers() {
            return data.get('users/allUsers');
        }

        function getUserByUsername(username) {
            return data.get('users?username=' + username, true);
        }

        function editUser(user) {
            return data.post('users/edit', user, true);
        }

        function deleteUser(user) {
            return data.post('users/delete', user, true);
        }

        return {
            getUsers: getUsers,
            getUserByUsername: getUserByUsername,
            editUser: editUser,
            deleteUser: deleteUser
        };
    };

    angular.module('kVent.data')
        .factory('usersPageData', ['data', usersPageData]);
}());