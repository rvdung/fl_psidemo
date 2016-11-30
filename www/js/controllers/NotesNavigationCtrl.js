psiApp.controller('NotesNavigationCtrl', function($scope, $state) {

	$scope.menu = [{code: "ghichu",label: "Ghi chú", icon:"ion-clipboard"},
	               {code: "lich",label: "Xem lịch", icon:"ion-ios-calendar"},
	               {code: "nhacviec",label: "Nhắc việc", icon:"ion-compose"}];

    $scope.getMenuAction = function(menuItem) {
        if (menuItem.code === 'ghichu') {
        	alert('in');
            $state.go('tab.trackers');
        } else if (menuItem.code === 'lich') {
    		window.plugins.calendar.openCalendar();
        } else if (menuItem.code === 'nhacviec') {
            $state.go('tab.event');
        } else {
            $state.go('tab.notes-nav');
        }
    }
});
