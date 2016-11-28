var psiApp = angular.module('psiApp', ['ionic', 'pdf', 'ngCordova',
    '$actionButton', 'ionic-material', 'ionMdInput', 'TrackersList',
    'TrackerDetails'
]);

psiApp.run(function($ionicPlatform, $rootScope, ProvincesService, MenuService) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        ionic.Platform.fullScreen();
        window.screen.unlockOrientation();
    });

    ProvincesService.getAll(function(response) {
        if (response != undefined) {
            $rootScope.provinces = response;
            $rootScope.province = response[0];
        }
        if ($rootScope.province != undefined) {
            MenuService.getMenuItemsByProvince($rootScope.province.proviceCode,
                function(menuResponse) {
                    if (menuResponse != undefined) {
                        $rootScope.menu = menuResponse;
                    }
                });
        }
    });
});

psiApp
    .config(function($stateProvider, $urlRouterProvider,
        $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom');
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.home', {
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'templates/tab-home.html',
                    controller: 'HomeCtrl'
                }
            }
        })


        .state('pdfviewer', {
            cache: false,
            url: '/home/pdfviewer/:menuCode',
            templateUrl: 'templates/tab-pdf-viewer.html',
            controller: 'PDFCtrl'
        })


        .state('tab.masons', {
            url: '/masons',
            views: {
                'tab-masons': {
                    templateUrl: 'templates/tab-masons.html',
                    controller: 'MasonCtrl'
                }
            }
        })

        .state('tab.trackers', {
            url: '/trackers',
            views: {
                'tab-trackers': {
                    controller: 'TrackersListCtrl',
                    templateUrl: 'templates/tracker-list.html'
                }
            }
        })

        .state('tab.tracker-detail', {
            url: '/trackers/:id',
            views: {
                'tab-trackers': {
                    controller: 'TrackerDetailsCtrl',
                    templateUrl: 'templates/tracker-detail.html'
                }
            }
        })

        .state('videoplayer', {
            cache: false,
            url: '/home/videoplayer/:menuCode',
            templateUrl: 'templates/tab-video-player.html',
            controller: 'videoCtrl'
        })

        .state('tab.calendar', {
            url: '/trackers/calendar',
            views: {
                'tab-trackers': {
                    templateUrl: 'templates/tab-calendar.html',
                    controller: 'CalendarCtrl'
                }
            }
        });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');
    });
