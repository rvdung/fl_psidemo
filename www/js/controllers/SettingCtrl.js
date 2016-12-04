psiApp.controller('SettingCtrl', function($scope, $rootScope, $state, ViewCountingService) {
	
	$scope.init = function() {
		ViewCountingService.getViewCount(function(){
			$scope.statystics = [];
			var i;
			console.log('$rootScope.menu---' + angular.toJson($rootScope.menu));

			console.log('$rootScope.viewCount---' + angular.toJson($rootScope.viewCount));
			for(i=0; i < $rootScope.menu.length; i ++){
				$scope.statystics.push({
					label: $rootScope.menu[i].label,
					count: $rootScope.viewCount[$rootScope.province.provinceCode][$rootScope.menu[i].code]
				});
			}
		});
	};
	

	if ($rootScope.menu == undefined) {
		$state.go('tab.home');
	} else {
		$scope.init();
	}
	
	
});
