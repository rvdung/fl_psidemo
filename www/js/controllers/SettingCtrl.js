psiApp.controller('SettingCtrl', function($scope, $rootScope, $state,ProvincesService,  ViewCountingService) {
	
		ViewCountingService.getViewCount(function(){
			$scope.statystics = [];
			var i;
			for(i=0; i < $rootScope.menu.length; i ++){
				$scope.statystics.push({
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
