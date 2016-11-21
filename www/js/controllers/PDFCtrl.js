psiApp
    .controller(
        'PDFCtrl',
        function($scope, pageService) {

            $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
            $scope.pdfUrl = 'pdf/relativity.pdf';
            $scope.scroll = 0;
            $scope.loading = 'loading';
            var httpHeaders = $scope.httpHeaders;
            var pdfUrl = $scope.pdfUrl;
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

            $scope.options = {
                loop: false,
                effect: 'fade',
                speed: 500,
            }

            $scope.setCurrentPage = function(num) {
                pageService.currentPage = num;
            }

            $scope.getTotalPageArray = function() {
                var pageArray = [];
                PDFJS.disableWorker = true;

                if (pdfUrl && pdfUrl.length) {
                    var pdfLoaderTask = PDFJS.getDocument(pdfUrl);
                    pdfLoaderTask.then(
                        function(_pdfDoc) {
                            $scope.pageCount = _pdfDoc.numPages;

                        });
                }

                for (var i = 1; i <= $scope.pageCount; i++) {
                    pageArray.push(i);
                }

                return pageArray;
            }
        });
