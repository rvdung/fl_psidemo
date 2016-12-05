psiApp.controller('SettingCtrl', function($scope, $rootScope, $state,ProvincesService,  ViewCountingService) {
	$scope.selectedProvince = null;
	$scope.init = function() {

		if($rootScope.provinces == undefined) {
			ProvincesService.getAll(function(response) {
				if (response != undefined) {
					$rootScope.provinces = response;
					$scope.provinces = $rootScope.provinces;
					for(i=0 ; i < $scope.provinces.length ; i++){
						if($scope.provinces[i].provinceCode == $rootScope.province.provinceCode){

							console.log('$scope.provinces[i]' + angular.toJson($scope.provinces[i]) );
							$scope.selectedProvince = $scope.provinces[i];
							$scope.$watch(function(scope) { return scope.selectedProvince},
						            function(newValue, oldValue) {
										console.log('oldValue' + angular.toJson(newValue) );
										$rootScope.province  = newValue;
									}
						    );
							break;
						}
					}
				}
			});
		}
		
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
	
	
	
	if ($rootScope.menu == undefined) {
		$state.go('tab.home');
	} else {
		$scope.init();
	}
	
	
});
