psiApp.controller('ChatDetailCtrl', function($scope, $stateParams, FreeNotes) {
	$scope.chat = FreeNotes.get($stateParams.ngaytao);
});
