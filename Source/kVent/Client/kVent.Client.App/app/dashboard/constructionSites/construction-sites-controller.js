(function () {
    'use strict';

    function ConstructionSitesController($state, auth, identity, constructionSitesPageData, notifier) {
        var vm = this;
        vm.constructionSites = null;

        vm.getConstructionSites = function () {
            constructionSitesPageData.getConstructionSites()
                .then(function (response) {
                    if (vm.constructionSites === null) {
                        vm.constructionSites = response.data;
                    }
                }, function (reason) {
                    notifier.error('Грешка: ' + reason.Message);
                });
        }

        vm.getConstructionSites();

        vm.isAdmin = identity.isAdmin();
    }

    angular
        .module('kVent.controllers')
        .controller('ConstructionSitesController', ['$state', 'auth', 'identity', 'constructionSitesPageData', 'notifier', ConstructionSitesController]);
}());