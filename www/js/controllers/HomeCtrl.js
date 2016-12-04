psiApp.controller('HomeCtrl', function($scope, $rootScope, $state, MenuService, ViewCountingService) {

	$scope.init = function() {
		MenuService.getMenuItemsByProvince($rootScope.province.provinceCode,
			function(menuResponse) {
				if (menuResponse != undefined) {
					$rootScope.menu = menuResponse;
					$scope.menu = $rootScope.menu;
				}
			});
	}

	$scope.getMenuAction = function(menuItem) {
		ViewCountingService.addViewCountByMenuCode(menuItem.code);
		if (menuItem.type == 's') {
			$state.go('pdfviewer', {
				menuCode : menuItem.code
			});
		} else if (menuItem.type == 'v') {
			$state.go('videoplayer', {
				menuCode : menuItem.code
			});
		} else {
			$state.go('tab.home');
		}
	}
	
	$scope.clearProvince = function() {
		$rootScope.province = undefined;
		$state.go('login');
	}
	
	if ($rootScope.province == undefined) {
		$state.go('login');
	} else {
		$scope.init();
	}
});
