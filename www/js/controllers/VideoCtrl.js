psiApp.controller('VideoCtrl', function($scope, $stateParams, pageService,
    MenuService) {

    MenuService.getMenuItemsByCode($stateParams.menuCode, function(menuItem) {
        if (menuItem != null) {
            $scope.videoName = menuItem.label;
            $scope.videoUrl = menuItem.resource;
        }
    });

});
