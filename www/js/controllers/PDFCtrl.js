psiApp
    .controller(
        'PDFCtrl',
        function($scope, pageService) {

            $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
            $scope.pdfUrl = 'resources/Dak Nong- Nha vs tham doi.pdf';
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
