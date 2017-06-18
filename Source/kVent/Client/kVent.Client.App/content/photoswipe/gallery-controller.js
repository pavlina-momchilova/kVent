var app = angular.module('mygallery', ['ngPhotoswipe']);

app.controller('GalleryController', function () {
    var vm = this;
    vm.name = 'ngPhotoswipe';

    vm.opts = {
        index: 0
    };

    vm.slides = [{
        src: '../gallery/lidal_evere/20170201_154319.jpg',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/20170215_172132.jpg',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/20170215_172051.jpg',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/DSC_0059.JPG',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/DSC_0171.JPG',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/20170201_154319.jpg',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/20170201_154319.jpg',
        w: 500, h: 500
    }, {
        src: '../gallery/lidal_evere/20170201_154319.jpg',
        w: 500, h: 500
    }];

    vm.showGallery = function (i) {
        if (angular.isDefined(i)) {
            vm.opts.index = i;
        }
        vm.open = true;
    };

    vm.closeGallery = function () {
        vm.open = false;
    };

});


