psiApp
    .controller(
        'viewPDFCtrl',
        function($scope, pageService, $ionicHistory) {

            $scope.pageService = pageService;

            $scope.show = true;
            $scope.toggle = function() {
                if ($scope.show) {
                    $(".nav_btn").fadeOut();
                    $scope.show = false;

                } else {
                    $(".nav_btn").fadeIn();
                    $scope.show = true;
                }
            }
        });
