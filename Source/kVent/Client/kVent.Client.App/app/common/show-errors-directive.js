(function () {
    'use strict';

    function usersItemDirective() {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                var inputEl = el[0].querySelector("[name]");
                // convert the native text box element to an angular element
                var inputNgEl = angular.element(inputEl);
                // get the name on the text box
                var inputName = inputNgEl.attr('name');

                // only apply the has-error class after the user leaves the text box
                inputNgEl.bind('blur', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                })
            }
        };
    }

    angular.module('kVent.directives')
        .directive('showErrorsDirective', [usersItemDirective]);
}());