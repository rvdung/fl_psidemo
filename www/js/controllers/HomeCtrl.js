psiApp.controller('HomeCtrl', function($scope, $rootScope, $state) {

	var initInterval = setInterval(function(){ $scope.init() }, 1000);

	$scope.init = function() {
	    if($rootScope.menu== undefined){
	    	return;
	    }
	    $scope.menu = $rootScope.menu;
	    clearInterval(initInterval);
	}
	
	$scope.getMenuAction = function(menuItem) {
		if(menuItem.type = 's'){
			$state.go('tab.pdfviewer', {menuCode:menuItem.code});
		} else {
			$state.go('tab.pdfviewer');
		}
	}

});
