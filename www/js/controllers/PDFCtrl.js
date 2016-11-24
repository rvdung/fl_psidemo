psiApp.controller('PDFCtrl', function($scope, $stateParams, pageService,
		MenuService) {

			MenuService.getMenuItemsByCode($stateParams.menuCode, function(menuItem) {
				if (menuItem != null) {
					$scope.pdfName = menuItem.label;
					$scope.pdfUrl = menuItem.resource;
				}
			});
            $scope.scroll = 0;
            $scope.loading = 'loading';
            var httpHeaders = $scope.httpHeaders;

            $scope.getNavStyle = function(scroll) {
                if (scroll > 100)
                    return 'pdf-controls fixed';
                else
                    return 'pdf-controls';
            }

            $scope.onError = function(error) {
                console.log(error);
            }

            $scope.onLoad = function() {
                $scope.loading = '';
            }

            $scope.onProgress = function(progress) {
                console.log(progress);
            }


        });
