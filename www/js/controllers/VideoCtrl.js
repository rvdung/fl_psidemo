psiApp.controller('videoCtrl', function($scope, $stateParams, pageService, $ionicHistory,
    MenuService) {

    MenuService.getMenuItemsByCode($stateParams.menuCode, function(menuItem) {
        if (menuItem != null) {
            $scope.videoName = menuItem.label;
            $scope.videoUrl = menuItem.resource;
        }
    });
    $scope.$on('$ionicView.beforeEnter', function() {
        screen.lockOrientation('landscape');
        console.log('enter - lock');
    });

    $scope.$on('$ionicView.afterLeave', function() {
        screen.unlockOrientation();
        console.log('leave - unlock')
    });

    $scope.goBack = function() {
        console.log('back');
        $ionicHistory.goBack();
    }
});
