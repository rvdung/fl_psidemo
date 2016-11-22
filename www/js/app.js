var psiApp = angular.module('psiApp', [ 'ionic', 'pdf', 'ngCordova',
		'$actionButton' ]);

psiApp.run(function($ionicPlatform, $rootScope, ProvincesService) {
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
		$rootScope.provinces = response;
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

			.state('tab.dash', {
				url : '/dash',
				views : {
					'tab-dash' : {
						templateUrl : 'templates/tab-dash.html',
						controller : 'DashCtrl'
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
			})

			.state('tab.account', {
				url : '/account',
				views : {
					'tab-account' : {
						templateUrl : 'templates/tab-account.html',
						controller : 'AccountCtrl'
					}
				}
			})

			.state('tab.pdfviewer', {
				url : '/pdfviewer',
				views : {
					'tab-pdf-viewer-test' : {
						templateUrl : 'templates/tab-pdf-viewer-test.html',
						controller : 'PDFCtrl'
					}
				}
			});

			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/tab/dash');

		});
