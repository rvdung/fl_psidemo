psiApp.controller('TrackersListCtrl',['$scope','$cordovaSQLite','$location','$ionicPlatform','TrackersService','$state'
	,function($scope,$cordovaSQLite,$location,$ionicPlatform,TrackersService,$state){
		
		initData();
		initMethods();

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

			console.log("State changed: ", toState);
			fetchTrackers();
		});
	
		function initData(){
			$scope.startInsert = false;
			$scope.editButtonLabel = "Xóa";
			$scope.newTracker = {
				value: ''
			};
			$scope.loadingTrackers = false;
			$scope.shouldShowDelete = false;
			$scope.editButtonLabel = "Xóa";
			TrackersService.initDB();
			fetchTrackers();
		}

		function initMethods() {
			$scope.addNewTracker = addNewTracker;
			$scope.toggleEdit = toggleEdit;
			$scope.deleteTracker = deleteTracker;
		}

		function fetchTrackers() {
			$scope.loadingTrackers = true;
			TrackersService.getAllTrackers()
			.then(fetchTrackerListSuccessCB,fetchTrackerListErrorCB);
		}

		function toggleEdit() {
			$scope.shouldShowDelete = !$scope.shouldShowDelete;
			$scope.editButtonLabel = $scope.shouldShowDelete ? "Xóa xong" : "Xóa";
		}
		
		function addNewTracker()
		{
			if($scope.newTracker.value != '' && $scope.newTracker.value.length > 0){
				TrackersService.addNewTracker($scope.newTracker.value)
				.then(function(response){
					$scope.newTracker.value = '';
					console.log("New Tracker has been added.");
					fetchTrackers();
					$scope.startInsert = false;
				},function(error){
					console.log(error.message);
					$scope.startInsert = true;
				});
			}else
			{
				$scope.startInsert = !$scope.startInsert;
			}
		}

		function fetchTrackerListSuccessCB(response)
		{
			$scope.loadingTrackers = false;
			if(response && response.rows && response.rows.length > 0)
			{
				$scope.trackersList = [];
				for(var i=0;i < response.rows.length;i++)
				{
					$scope.trackersList.unshift({
							id : response.rows.item(i).id
						, 	value : response.rows.item(i).value
						, 	createdDate: response.rows.item(i).createdDate
						});
				}
			} else {
				$scope.message = "Chưa có ghi chú nào.";
			}
		}
		
		function fetchTrackerListErrorCB(error)
		{
			$scope.loadingTrackers = false;
			$scope.message = "Lỗi xảy ra trong quá trình hiển thị danh sách ghi chú";
		}
		
		$scope.toggleTracker = function(id,index){
			if($scope.shouldShowDelete){
				deleteTracker(index,id);
			} else {
				 $state.go('tab.tracker-detail', {
					 id: id
		         });
			}
		}

		function deleteTracker(index,id)
		{
			if(index > -1)
			{
				TrackersService.deleteTracker(id)
				.then(function(response){
					$scope.trackersList.splice(index,1);
					console.log("Tracker has been succesfully deleted.");
				},function(error){
					alert("Lỗi xảy ra trong quá trình xóa ghi chú");
				});
			}
		}

}]);
