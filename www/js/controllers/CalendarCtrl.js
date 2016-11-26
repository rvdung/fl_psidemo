psiApp.controller('CalendarCtrl', function($scope, $actionButton) {
	$scope.showCalendar = function() {
		window.plugins.calendar.openCalendar();
	};

});
