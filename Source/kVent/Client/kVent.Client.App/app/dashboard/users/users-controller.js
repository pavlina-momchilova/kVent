(function () {
    'use strict';

    function UsersController($state, auth, usersPageData, notifier) {
        var vm = this;
        vm.users = null;

        vm.getUsers = function () {
            usersPageData.getUsers()
                .then(function (response) {
                    if (vm.users === null) {
                        vm.users = response.data;
                    }
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.message);
                });
        }

        vm.getUsers();
        //vm.addCat = function (cat, catForm) {
        //    console.log('...Trying to add a cat...');
        //    if (catForm.$valid) {
        //        console.log('... Adding a cat...');
        //        cats.addCat(cat)
        //           .then(function (catId) {
        //               $location.path('/cats/details/' + catId);
        //           });
        //    }
        //}
    }

    angular
        .module('kVent.controllers')
        .controller('UsersController', ['$state', 'auth', 'usersPageData', 'notifier', UsersController]);
}());