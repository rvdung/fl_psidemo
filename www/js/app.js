
var psiApp = angular
		.module('psiApp', [ 'ionic', 'pdf', 'ngCordova', '$actionButton',
				'ionic-material', 'ionMdInput', 'LocalStorageModule', 'angularMoment' ]);

psiApp.run(function($ionicPlatform, $rootScope, localStorageService, amMoment) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins
				&& window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		ionic.Platform.fullScreen();
	});

	$rootScope.province = localStorageService.get('province');
	amMoment.changeLocale('vi');
});

psiApp.config(function($stateProvider, $urlRouterProvider,
		$ionicConfigProvider, localStorageServiceProvider) {

	// Configure local storage
	localStorageServiceProvider.setDefaultToCookie(false);

	$ionicConfigProvider.tabs.position('bottom');
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url : '/tab',
		abstract : true,
		templateUrl : 'templates/tabs.html'
	})

	.state('login', {
		url : '/home/login',
		templateUrl : 'templates/login.html',
		controller : 'LoginCtrl'
	})

	.state('game', {
		cache: false,
		url : '/home/game',
		templateUrl : 'templates/game.html',
		controller : 'GameCtrl'
	})

	// Each tab has its own nav history stack:

	.state('tab.home', {
		cache : false,
		url : '/home',
		views : {
			'tab-home' : {
				templateUrl : 'templates/tab-home.html',
				controller : 'HomeCtrl'
			}
		}
	})

	.state('tab.setting', {
		cache : false,
		url : '/home/setting',
		views : {
			'tab-home' : {
				templateUrl : 'templates/setting.html',
				controller : 'SettingCtrl'
			}
		}
	})

	.state('pdfviewer', {
		cache : false,
		url : '/home/pdfviewer/:menuCode',
		templateUrl : 'templates/tab-pdf-viewer.html',
		controller : 'PDFCtrl'
	})

	.state('tab.masons', {
		url : '/masons',
		views : {
			'tab-masons' : {
				templateUrl : 'templates/tab-masons.html',
				controller : 'MasonCtrl'
			}
		}
	})

	.state('tab.notes-nav', {
		url : '/notes',
		views : {
			'tab-notes' : {
				templateUrl : 'templates/tab-notes-navigation.html',
				controller : 'NotesNavigationCtrl'
			}
		}
	})

	.state('tab.trackers', {
		url : '/notes/trackers',
		views : {
			'tab-notes' : {
				controller : 'TrackersListCtrl',
				templateUrl : 'templates/tracker-list.html'
			}
		}
	})

	.state('tab.tracker-detail', {
		url : '/notes/trackers/:id',
		views : {
			'tab-notes' : {
				controller : 'TrackerDetailsCtrl',
				templateUrl : 'templates/tracker-detail.html'
			}
		}
	})

	.state('videoplayer', {
		cache : false,
		url : '/home/videoplayer/:menuCode',
		templateUrl : 'templates/tab-video-player.html',
		controller : 'videoCtrl'
	})

	.state('tab.calendar', {
		url : '/trackers/calendar',
		views : {
			'tab-trackers' : {
				templateUrl : 'templates/tab-calendar.html',
				controller : 'CalendarCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home');
});
