/*! Angular-PDF Version: 1.3.0 | Released under an MIT license */
(function() {

    'use strict';

    angular.module('pdf', []).directive('ngPdf', ['$window', function($window) {
        var renderTask = null;
        var pdfLoaderTask = null;
        var debug = false;

        var backingScale = function(canvas) {
            var ctx = canvas.getContext('2d');
            var dpr = window.devicePixelRatio || 1;
            var bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            console.log(dpr);
            return dpr / bsr;
        };

        var setCanvasDimensions = function(canvas, w, h) {
            var ratio = backingScale(canvas);
            canvas.width = Math.floor(w * ratio);
            canvas.height = Math.floor(h * ratio);
            canvas.style.width = Math.floor(w) + 'px';
            canvas.style.height = Math.floor(h) + 'px';

            canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
            return canvas;
        };
        return {
            restrict: 'E',
            templateUrl: function(element, attr) {
                return attr.templateUrl ? attr.templateUrl : 'partials/viewer.html';
            },
            link: function(scope, element, attrs) {
                element.css('display', 'block');
                var url = scope.pdfUrl;
                var httpHeaders = scope.httpHeaders;
                var pdfDoc = null;
                var pageToDisplay = isFinite(attrs.page) ? parseInt(attrs.page) : 1;
                var pageFit = attrs.scale === 'page-fit';
                var scale = attrs.scale > 0 ? attrs.scale : 1;
                // var isRotate = false;

                //always have two canvas, first one always portrait, second one always landscape
                var canvas = element.find('canvas')[0];
                // setClassForCanvas(canvas);
                debug = attrs.hasOwnProperty('debug') ? attrs.debug : false;
                var creds = attrs.usecredentials;
                var ctx = canvas.getContext('2d');

                PDFJS.disbleWorker = true;
                scope.pageNum = pageToDisplay;

                scope.renderPage = function(num) {
                    pdfDoc.getPage(num).then(renderPageNum);
                }

                function renderPageNum(page) {
                    clearCanvas();
                    if (renderTask) {
                        renderTask._internalRenderTask.cancel();
                    }
                    var clientRect = element[0].getBoundingClientRect();
                    var viewport = page.getViewport(1);

                    var pageWidthScale;
                    console.log("clientRect.width: " + clientRect.width + " x clientRect.height: " + clientRect.height);
                    console.log("viewport.width: " + viewport.width + " x viewport.width: " + viewport.height);
                    pageWidthScale = clientRect.height / viewport.height;

                    viewport = page.getViewport(pageWidthScale);
                    console.log("pageWidthScale: " + pageWidthScale);
                    setCanvasDimensions(canvas, viewport.width, viewport.height);


                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };
                    renderTask = page.render(renderContext);
                    renderTask.promise.then(function() {
                        if (typeof scope.onPageRender === 'function') {
                            scope.onPageRender();
                        }
                    }).catch(function(reason) {
                        console.log(reason);
                    });

                }

                scope.goPrevious = function() {

                    if (scope.pageToDisplay <= 1) {
                        console.log('previous < 1');

                    } else {
                        clearCanvas();
                        scope.pageToDisplay = parseInt(scope.pageToDisplay) - 1;
                        scope.renderPage(scope.pageToDisplay);
                        console.log('render');
                    }
                };

                scope.goNext = function() {

                    if (scope.pageToDisplay >= pdfDoc.numPages) {
                        console.log('next > numpages');

                    } else {
                        clearCanvas();
                        scope.pageToDisplay = parseInt(scope.pageToDisplay) + 1;
                        scope.renderPage(scope.pageToDisplay);
                        console.log('render');
                    }
                };

                function clearCanvas() {
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        console.log('clear ctx');
                    }
                    console.log('clear');
                }

                function renderPDF() {
                    clearCanvas();

                    var params = {
                        'url': url,
                        'withCredentials': creds
                    };

                    if (httpHeaders) {
                        params.httpHeaders = httpHeaders;
                    }

                    if (url && url.length) {
                        pdfLoaderTask = PDFJS.getDocument(params, null, null, scope.onProress);
                        pdfLoaderTask.then(
                            function(_pdfDoc) {
                                if (typeof scope.onLoad === 'function') {
                                    scope.onLoad();
                                }

                                pdfDoc = _pdfDoc;
                                scope.renderPage(scope.pageToDisplay);

                                scope.$apply(function() {
                                    scope.pageCount = _pdfDoc.numPages;
                                });
                            },
                            function(error) {
                                if (error) {
                                    if (typeof scope.onError === 'function') {
                                        scope.onError(error);
                                    }
                                }
                            }
                        );
                    }
                }

                scope.$watch('pdfUrl', function(newVal) {
                    if (newVal !== '') {
                        if (debug) {
                            console.log('pdfUrl value change detected: ', scope.pdfUrl);
                        }
                        url = newVal;
                        scope.pageNum = scope.pageToDisplay = pageToDisplay;
                        if (pdfLoaderTask) {
                            pdfLoaderTask.destroy().then(function() {
                                renderPDF();
                            });
                        } else {
                            renderPDF();
                        }
                    }
                });



            }
        };
    }]);
})();
