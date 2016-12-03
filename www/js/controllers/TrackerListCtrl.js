psiApp.controller('TrackersListCtrl',['$scope','$cordovaSQLite','$ionicPlatform','TrackersService','$state'
	,function($scope,$cordovaSQLite,$ionicPlatform,TrackersService,$state){
		
		initData();
		initMethods();
	
		function initData(){
			$scope.startInsert = false;
			$scope.editButtonLabel = "Xóa";
			$scope.newTracker = {
				name: ''
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
			if($scope.newTracker.name != '' && $scope.newTracker.name.length > 0){
				TrackersService.addNewTracker($scope.newTracker.name)
				.then(function(response){
					$scope.newTracker.name = '';
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
						, 	name : response.rows.item(i).value
						, 	createDate: response.rows.item(i).ngaytao
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
