var psiApp = angular.module('psiApp', [ 'ionic', 'pdf', 'ngCordova',
		'$actionButton', 'ionic-material', 'ionMdInput' ]);

psiApp.run(function($ionicPlatform, $rootScope, ProvincesService, MenuService) {
	$ionicPlatform.ready(function() {

		if (window.cordova && window.cordova.plugins
				&& window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

	ProvincesService.getAll(function(response){
		if(response!=undefined){
			$rootScope.provinces = response;
			$rootScope.province = response[0];
		}
		if($rootScope.province != undefined){
			MenuService.getMenuItemsByProvince($rootScope.province.proviceCode, function(menuResponse){
				if(menuResponse!= undefined){
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
				url : '/tab',
				abstract : true,
				templateUrl : 'templates/tabs.html'
			})

			// Each tab has its own nav history stack:

			.state('tab.home', {
				url : '/home',
				views : {
					'tab-home' : {
						templateUrl : 'templates/tab-home.html',
						controller : 'HomeCtrl'
					}
				}
			})
			
			.state('tab.pdfviewer', {
				url : '/home/pdfviewer/:menuCode',
				views : {
					'tab-home' : {
						templateUrl : 'templates/tab-pdf-viewer.html',
						controller : 'PDFCtrl'
					}
				}
			})

			.state('tab.chats', {
				url : '/chats',
				views : {
					'tab-chats' : {
						templateUrl : 'templates/tab-chats.html',
						controller : 'ChatsCtrl'
					}
				}
			})

			.state('tab.chat-detail', {
				url : '/chats/:chatId',
				views : {
					'tab-chats' : {
						templateUrl : 'templates/chat-detail.html',
						controller : 'ChatDetailCtrl'
					}
				}
			})

			.state('tab.calendar', {
				url : '/calendar',
				views : {
					'tab-calendar' : {
						templateUrl : 'templates/tab-calendar.html',
						controller : 'CalendarCtrl'
					}
				}
			});


			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/tab/home');
		});
