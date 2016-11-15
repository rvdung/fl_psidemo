angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
  
 
.controller('CalendarTestCtrl', function($scope) {
    $scope.testString = "Hello";
	
	$scope.showCalendar = function() {		 
		  window.plugins.calendar.openCalendar();
	};
})

.controller('PDFCtrl', function($scope) {

	  $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
	  $scope.pdfUrl = 'pdf/relativity.pdf';
	  $scope.scroll = 0;
	  $scope.loading = 'loading';

	  $scope.getNavStyle = function(scroll) {
	    if(scroll > 100) return 'pdf-controls fixed';
	    else return 'pdf-controls';
	  }

	  $scope.onError = function(error) {
	    console.log(error);
	  }

	  $scope.onLoad = function() {
	    $scope.loading = '';
	  }

	  $scope.onProgress = function(progress) {
	    console.log(progress);
	  }

	});
