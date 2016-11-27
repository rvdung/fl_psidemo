psiApp.controller('MasonCtrl', function($scope,$http,$ionicScrollDelegate) {

	initData();
	
	function initData() {
		$http.get('resources/json/mason.json').success(function(response) {
			$scope.masons = response;
		});
	};

	$scope.$watch('searchText',function(value){
	    console.log(value);
	  });
  
  	$ionicScrollDelegate.scrollTop(false);
	
});
