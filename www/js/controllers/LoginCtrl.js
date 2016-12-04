psiApp.controller('LoginCtrl', function($scope, $rootScope, $state,
		ProvincesService, MenuService, localStorageService) {

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
