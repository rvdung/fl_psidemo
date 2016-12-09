psiApp.controller('LoginCtrl', function($scope, $rootScope, $state,
		ProvincesService, MenuService, localStorageService,$ionicHistory) {


	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

		$ionicHistory.clearCache();
		$ionicHistory.clearHistory();
	});

	ProvincesService.getAll(function(response) {
		if (response != undefined) {
			$rootScope.provinces = response;
			$scope.provinces = $rootScope.provinces;
		}
	});

	$scope.chooseProvince = function(province) {
		$rootScope.province = province;
		localStorageService.set('province', province);
		$state.go('tab.home');
	}
});
