psiApp.controller('HomeCtrl', function($scope, $rootScope, $state, MenuService) {

	$scope.init = function() {
		MenuService.getMenuItemsByProvince($rootScope.province.proviceCode,
			function(menuResponse) {
				if (menuResponse != undefined) {
					$rootScope.menu = menuResponse;
					$scope.menu = $rootScope.menu;
				}
			});
	}

	$scope.getMenuAction = function(menuItem) {
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
	
	if ($rootScope.province == undefined) {
		$state.go('login');
	} else {
		$scope.init();
	}
});
