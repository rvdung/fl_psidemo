psiApp.controller('TrackerDetailsCtrl',['$scope','$stateParams','$cordovaSQLite','$ionicPlatform','TrackersService',
	function($scope,$stateParams,$cordovaSQLite,$ionicPlatform,Trackers){

		initData();
		initMethods();

		function initData(){
			$scope.trackerId = $stateParams['id'];
			$scope.trackerInfo = Trackers.getTracker($scope.trackerId);
		}

		function initMethods() {
			$scope.updateEntry = updateEntry;
		}

		function updateEntry()
		{
				Trackers.updateTracker($scope.trackerId , $scope.trackerInfo.value)
				.then(function(response){
					alert("Đã lưu.");
				},function(error){
					alert("Lỗi xảy ra trong quá trình lưu.");
				});
		}
}]);
