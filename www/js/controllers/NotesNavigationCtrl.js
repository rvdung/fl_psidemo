psiApp.controller('NotesNavigationCtrl', function($scope, $state,$cordovaCalendar) {

	$scope.menu = [{code: "ghichu",label: "Ghi chú", icon:"ion-clipboard"},
	               {code: "lich",label: "Xem lịch", icon:"ion-ios-calendar"},
	               {code: "nhacviec",label: "Nhắc việc", icon:"ion-compose"}];

    $scope.getMenuAction = function(menuItem) {
        if (menuItem.code === 'ghichu') {
            $state.go('tab.trackers');
        } else if (menuItem.code === 'lich') {
    		window.plugins.calendar.openCalendar();
        } else if (menuItem.code === 'nhacviec') {
              $cordovaCalendar.createEventInteractively({
                title: 'tiêu đề',
                location: 'địa điểm',
                notes: 'nhắc viêc',
                startDate: new Date(),
                endDate: new Date()
              }).then(function (result) {
                // success
              }, function (err) {
                // error
              });
        } else {
            $state.go('tab.notes-nav');
        }
    }
});
