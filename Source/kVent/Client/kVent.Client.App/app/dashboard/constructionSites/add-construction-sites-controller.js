(function () {
    'use strict';

    function AddConstructionSitesController($state, auth, constructionSitesPageData, notifier) {
        var vm = this;
        vm.paymentOptions = [
            { id: 0, value: false, name: 'Бюджетен' },
            { id: 1, value: true, name: 'Почасов' }
        ]

        vm.addConstructionSite = function (constructionSite, addConstructionSitesForm) {
            if (addConstructionSitesForm.$valid) {
                constructionSite.paymentPerHour = constructionSite.paymentPerHour.value;
                console.log(constructionSite);
                constructionSitesPageData.addConstructionSite(constructionSite)
                    .then(function (response) {
                        notifier.success("Успешно добавен '" + constructionSite.constructionSiteName + "'");
                        $state.go('dashboard.constructionSites');
                    }, function (reason) {
                        notifier.error('Грешка: ' + reason.Message);
                    });
            }
        }
    }

    angular
        .module('kVent.controllers')
        .controller('AddConstructionSitesController', ['$state', 'auth', 'constructionSitesPageData', 'notifier', AddConstructionSitesController]);
}());