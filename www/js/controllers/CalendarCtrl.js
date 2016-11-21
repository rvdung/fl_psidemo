psiApp.controller('CalendarCtrl', function($scope, $actionButton) {
	$scope.showCalendar = function() {
		window.plugins.calendar.openCalendar();
	};

	var actionButton = $actionButton.create({
		mainAction : {
			icon : 'ion-android-create',
			backgroundColor : 'blue',
			textColor : ' white',
			onClick : function() {
				console.log('clicked main BUTTON');
			}
		},
		buttons : [ {
			icon : 'ion-android-pin',
			label : 'Find',
			backgroundColor : 'red',
			iconColor : 'white',
			onClick : function() {
				console.log('clicked pin');
			}
		}, {
			label : 'Ben Sparrow',
			onClick : function() {
				console.log('clicked O');
			}
		}, {
			label : 'Max Lynx',
			letter : 'O',
			onClick : function() {
				console.log('clicked Testing');
			}
		} ]
	});
});
