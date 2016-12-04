psiApp.controller('TrackerDetailsCtrl',['$scope','$ionicPopup','$stateParams','$cordovaSQLite','$ionicPlatform','TrackersService',
	function($scope,$ionicPopup,$stateParams,$cordovaSQLite,$ionicPlatform,Trackers){

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
					//alert(title:"Lưu ghi chú","Đã lưu.");
					$ionicPopup.alert({
					   title: 'Lưu ghi chú',
					   template: 'Đã lưu.'
					 }).then(function(res) {
					   console.log('Đã lưu ghi chú', res);
					 });
				},function(error){
					//alert(title:"Lưu ghi chú","Lỗi xảy ra trong quá trình lưu.");
					$ionicPopup.alert({
					   title: 'Lưu ghi chú',
					   template: 'Lỗi xảy ra trong quá trình lưu.'
					 }).then(function(res) {
					   console.log('Lỗi lưu ghi chú', res);
					 });
				});
		}
}]);
