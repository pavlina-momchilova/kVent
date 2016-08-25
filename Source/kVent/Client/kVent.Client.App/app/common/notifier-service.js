(function () {
    'use strict';
    
    var notifierService = function notifierService(toastr) {
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.timeOut = 3000;

        return {
            success: function (msg) {
                toastr.success(msg);
            },
            warning: function (msg) {
                toastr.warning(msg);
            },
            error: function (msg) {
                toastr.error(msg);
            }
        };
    }

    angular
        .module('kVent.services')
        .factory('notifier', ['toastr', notifierService]);
}());