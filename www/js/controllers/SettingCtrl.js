psiApp.controller('SettingCtrl', function($scope, $rootScope, $state,ProvincesService,  ViewCountingService) {
	
	$scope.init = function() {
		ViewCountingService.getViewCount(function(){
			$scope.statistics = [];
			var i;
			for(i=0; i < $rootScope.menu.length; i ++){
				alert($rootScope.menu[i].label);
				$scope.statistics.push({
					label: $rootScope.menu[i].label,
					count: $rootScope.viewCount[$rootScope.province.provinceCode][$rootScope.menu[i].code]
				});
			}
		});
	};

	
	$scope.clearProvince = function() {
		$rootScope.province = undefined;
		$state.go('login');
	}
	

	if ($rootScope.menu == undefined) {
		$state.go('tab.home');
	} else {
		$scope.init();
	}	
	
});
