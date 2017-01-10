psiApp
    .controller(
        'viewPDFCtrl',
        function($scope, pageService, $ionicHistory, $state) {

            $scope.pageService = pageService;

            $scope.show = true;
            $scope.toggle = function() {
                if ($scope.show) {
                    $("#previousBtn").fadeOut();
                    $("#nextBtn").fadeOut();
                    $scope.show = false;

                } else {
                    $("#previousBtn").fadeIn();
                    $("#nextBtn").fadeIn();
                    $scope.show = true;
                }
            }


        });
