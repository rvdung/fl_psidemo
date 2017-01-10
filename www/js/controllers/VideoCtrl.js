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
        if ($scope.showAdv === false) {
            console.log('back');
            $ionicHistory.goBack();
        }
    }

    function getRandomNumber() {
        return Math.floor((Math.random() * 3) + 1);
    }
    $scope.randomNumber = getRandomNumber();
    $scope.getAdvUrl = function() {
        switch ($scope.randomNumber) {
            case 1:
            	$scope.popupDivColor = 'green';
                return "resources/adv/test1.jpg";
            case 2:

            	$scope.popupDivColor = 'orange';
                return "resources/adv/test2.jpg";
            case 3:

            	$scope.popupDivColor = 'green';
                return "resources/adv/test3.jpg";
        }
    }
    
    $scope.showAdv = true;
    setTimeout(function() {
        $scope.$apply(function() {
            $scope.showAdv = false;
        });
    }, 3000);
});
