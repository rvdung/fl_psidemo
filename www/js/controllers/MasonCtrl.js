psiApp.controller('MasonCtrl', function($scope,$http) {

	
	initData();
	
	function initData() {
		$http.get("resources/json/mason.json").success(function(response) {
			$scope.huyens = response.tiengiang;
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
