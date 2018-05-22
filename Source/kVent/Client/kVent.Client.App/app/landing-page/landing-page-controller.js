(function ($) {

    'use strict';

    function LandingPageController() {
        var vm = this;

        vm.title = "Am-vent";

        vm.name = 'ngPhotoswipe';

        var opts = {
            index: 0,
            history: false
        };

        vm.gallery = [{
            name: "lidlevere",
            title: "LIDL Evere",
            picture: '../../content/gallery/lidl_evere/lidlevere8.jpg',
            options: opts,
            hide: true,
            slides: [/*{
                src: '../../content/gallery/lidl_evere/lidlevere0.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere1.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere2.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere3.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere4.jpg',
                w: 500, h: 500
            },*/ {
                    src: '../../content/gallery/lidl_evere/lidlevere5.jpg',
                    w: 4032, h: 3024
                },/* {
                src: '../../content/gallery/lidl_evere/lidlevere6.jpg',
                w: 500, h: 500
            }, */{
                    src: '../../content/gallery/lidl_evere/lidlevere7.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere8.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere9.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere10.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere11.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere12.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere13.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere14.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere15.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere16.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere17.jpg',
                    w: 4032, h: 3024
                }, {
                    src: '../../content/gallery/lidl_evere/lidlevere18.jpg',
                    w: 4032, h: 3024
                }/*, {
                src: '../../content/gallery/lidl_evere/lidlevere19.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere20.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere21.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere22.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere23.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere24.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere25.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere26.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere27.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere28.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere29.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere30.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere31.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere32.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere33.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere34.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere35.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere36.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere37.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere38.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere39.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere40.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere41.jpg',
                w: 500, h: 500
            }, {
                src: '../../content/gallery/lidl_evere/lidlevere42.jpg',
                w: 500, h: 500
            }*/]
        }, {
            name: "lidlhasselt",
            title: "LIDL Hasselt",
            picture: '../../content/gallery/lidl_hasselt/lidlhasselt0.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_hasselt/lidlhasselt0.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt5.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt6.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt7.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt8.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt9.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt10.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_hasselt/lidlhasselt11.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "aartselaarsportal",
            title: "Aartselaar Sportal",
            picture: '../../content/gallery/aartselaar_sporthal/image6.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/aartselaar_sporthal/image1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image5.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image6.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image7.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/aartselaar_sporthal/image8.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "apartments",
            title: "Apartments",
            picture: '../../content/gallery/apartments/image1.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/apartments/image1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/apartments/image2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/apartments/image3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/apartments/image4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/apartments/image5.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/apartments/image6.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "drukkerij",
            title: "Drukkerij",
            picture: '../../content/gallery/drukkerij/image1.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/drukkerij/image1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/drukkerij/image2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/drukkerij/image3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/drukkerij/image4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/drukkerij/image5.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "lidl-Sint-Agatha-Berchem-Brussels",
            title: "LIDL Sint Agatha Berchem, Brussels",
            picture: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image1.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image5.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image6.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image7.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image8.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image9.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image10.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image11.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image12.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image13.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image14.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image15.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl-Sint-Agatha-Berchem-Brussels/image16.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "lidl_torhout",
            title: "LIDL Torhout",
            picture: '../../content/gallery/lidl_torhout/image1.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/lidl_torhout/image1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image5.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image6.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image7.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image8.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image9.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image10.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image11.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image12.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image13.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image14.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image15.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image16.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image17.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image18.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/lidl_torhout/image19.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "VDAB-Oudenaarde",
            title: "VDAB Oudenaarde",
            picture: '../../content/gallery/VDAB-Oudenaarde/image1.jpg',
            options: opts,
            hide: true,
            slides: [{
                src: '../../content/gallery/VDAB-Oudenaarde/image1.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image2.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image3.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image4.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image5.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image6.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image7.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image8.jpg',
                w: 4032, h: 3024
            }, {
                src: '../../content/gallery/VDAB-Oudenaarde/image9.jpg',
                w: 4032, h: 3024
            }]
        }, {
            name: "other",
            title: "Other",
            picture: '../../content/gallery/constructionSite25.jpg',
            options: opts,
            hide: true,
            slides: [/*{
                src: '../../content/gallery/constructionSite16.jpg',
                w: 500, h: 500
            }, */{
                    src: '../../content/gallery/constructionSite18.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite23.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite25.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite28.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite37.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite4.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite5.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite6.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite8.jpg',
                    w: 1280, h: 720
                }, {
                    src: '../../content/gallery/constructionSite9.jpg',
                    w: 1280, h: 720
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

            console.log("asdad");
            $('html, body').animate({
                scrollTop: $("#imageList").offset().top
            }, 2500);
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
}(jQuery));