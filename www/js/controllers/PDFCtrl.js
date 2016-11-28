psiApp.controller('PDFCtrl', function($scope, $stateParams, pageService,
    MenuService) {

    MenuService.getMenuItemsByCode($stateParams.menuCode, function(menuItem) {
        if (menuItem != null) {
            $scope.pdfName = menuItem.label;
            $scope.pdfUrl = menuItem.resource;
        }
    });

    $scope.$on('$ionicView.beforeEnter', function() {
        screen.lockOrientation('landscape');
    });

    $scope.$on('$ionicView.afterLeave', function() {
        screen.unlockOrientation();
    });

});
