(function () {

    'use strict';

    function LandingPageController() {
        var vm = this;

        vm.title = "Aventa";

        vm.name = 'ngPhotoswipe';

        var opts = {
            index: 0,
            history: false
        };

        vm.gallery = [{
            name: "lidl2",
            picture: '../../content/gallery/lidl_evere/lidlevere3.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_evere/lidlevere3.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere4.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere5.jpg',
                w: 500, h: 500
            }]
        }, {
            name: "lidl3",
            picture: '../../content/gallery/lidl_evere/lidlevere6.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_evere/lidlevere6.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere7.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere8.jpg',
                w: 500, h: 500
            }]
        }, {
            name: "lidl4",
            picture: '../../content/gallery/lidl_evere/lidlevere9.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_evere/lidlevere9.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere10.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere12.jpg',
                w: 500, h: 500
            }]
        }, {
            name: "lidl5",
            picture: '../../content/gallery/lidl_evere/lidlevere13.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_evere/lidlevere13.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere14.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere15.jpg',
                w: 500, h: 500
            }]
        }, {
            name: "lidl6",
            picture: '../../content/gallery/lidl_evere/lidlevere16.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_evere/lidlevere16.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere17.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere18.jpg',
                w: 500, h: 500
            }]
        }];

        vm.showGallery = function (name) {
            for (var i = 0; i < vm.gallery.length; i++) {
                if (vm.gallery[i].name != name) {
                    vm.gallery[i].hide = true;
                }
            }

            var folder = vm.galleryFolderByName(name);
            folder.hide = !folder.hide;            
        };

        vm.openGallery = function (name, i) {
            var folder = vm.galleryFolderByName(name);

            if (angular.isDefined(i)) {
                folder.options.index = i;
            }

            folder.isOpen = true;
        };

        vm.closeGallery = function (name) {
            var folder = vm.galleryFolderByName(name);
            folder.isOpen = false;
        };

        vm.galleryFolderByIndex = function (i) {
            return vm.gallery[i].slides;
        }

        vm.galleryFolderByName = function (name) {
            var folder = vm.gallery.filter(function (item) {
                if (item.name === name) {
                    return true;
                }
            });
            
            return folder[0];
        }
    }

    angular
        .module('kVent.controllers')
        .controller('LandingPageController', [LandingPageController]);
}());