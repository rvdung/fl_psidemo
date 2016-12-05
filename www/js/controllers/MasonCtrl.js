psiApp.controller('MasonCtrl', function($scope,$rootScope, $http) {

	
	initData();
	

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

		console.log("State changed: ", toState);
		$scope.masons = [];
		initData();
	});

	function initData() {
		$http.get("resources/json/mason.json").success(function(response) {
			if($rootScope.province.provinceCode == "001") {
				$scope.huyens = response.tiengiang;
			}
			else {				
				$scope.huyens = response.daknong;
			}
		    $scope.selectHuyen = $scope.huyens[0];
			$http.get($scope.selectHuyen.link).success(function(response) {
				$scope.masons = response;
			});
		});	
		
	};

	$scope.call = function(tel) {
		window.location.href = "tel:" + tel;
	}

	$scope.changeHuyen = function(value){
		$http.get(value.link).success(function(response) {
			$scope.masons = response;
		});
	  };
 });
