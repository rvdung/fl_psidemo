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

                //always have two canvas, first one always portrait, second one always landscape
                var canvasPortrait = element.find('canvas')[0];
                var canvasLandscape = element.find('canvas')[1];
                debug = attrs.hasOwnProperty('debug') ? attrs.debug : false;
                var creds = attrs.usecredentials;
                var ctxPortrait = canvasPortrait.getContext('2d');
                var ctxLandscape = canvasLandscape.getContext('2d');

                PDFJS.disableWorker = true;
                scope.pageNum = pageToDisplay;

                scope.renderPage = function(num) {
                    if (renderTask) {
                        renderTask._internalRenderTask.cancel();
                    }

                    pdfDoc.getPage(num).then(function(page) {

                        //find a way to create 2 page with width and height fit to screen or fixed width and height (720x1280)
                        var clientRect = element[0].getBoundingClientRect();
                        var viewport = page.getViewport(1);
                        //portrait
                        var pageWidthScalePortrait = clientRect.width / viewport.width;
                        var viewportPortrait = page.getViewport(pageWidthScalePortrait);
                        setCanvasDimensions(canvasPortrait, viewportPortrait.width, viewportPortrait.height);
                        var renderContextPortrait = {
                            canvasContext: ctxPortrait,
                            viewport: viewportPortrait
                        };
                        renderTask = page.render(renderContextPortrait);
                        renderTask.promise.then(function() {
                            if (typeof scope.onPageRender === 'function') {
                                scope.onPageRender();
                            }
                        }).catch(function(reason) {
                            console.log(reason);
                        });

                        //Landscape
                        var pageWidthScaleLandscape = clientRect.height / viewport.height;
                        var viewportLandscape = page.getViewport(pageWidthScaleLandscape);
                        setCanvasDimensions(canvasLandscape, viewportLandscape.width, viewportLandscape.height);
                        var renderContextLandscape = {
                            canvasContext: ctxLandscape,
                            viewport: viewportLandscape
                        };
                        renderTask = page.render(renderContextLandscape);
                        renderTask.promise.then(function() {
                            if (typeof scope.onPageRender === 'function') {
                                scope.onPageRender();
                            }
                        }).catch(function(reason) {
                            console.log(reason);
                        });
                    });
                };

                scope.goPrevious = function() {
                    if (scope.pageToDisplay <= 1) {
                        return;
                    }
                    scope.pageToDisplay = parseInt(scope.pageToDisplay) - 1;
                    scope.pageNum = scope.pageToDisplay;
                };

                scope.goNext = function() {
                    if (scope.pageToDisplay >= pdfDoc.numPages) {
                        return;
                    }
                    scope.pageToDisplay = parseInt(scope.pageToDisplay) + 1;
                    scope.pageNum = scope.pageToDisplay;
                };

                scope.changePage = function() {
                    scope.renderPage(scope.pageToDisplay);
                };

                scope.rotate = function() {
                    if (canvas.getAttribute('class') === 'rotate0') {
                        canvas.setAttribute('class', 'rotate90');
                    } else if (canvas.getAttribute('class') === 'rotate90') {
                        canvas.setAttribute('class', 'rotate180');
                    } else if (canvas.getAttribute('class') === 'rotate180') {
                        canvas.setAttribute('class', 'rotate270');
                    } else {
                        canvas.setAttribute('class', 'rotate0');
                    }
                };

                function clearCanvas() {
                    if (ctxPortrait) {
                        ctxPortrait.clearRect(0, 0, canvasPortrait.width, canvasPortrait.height);
                    }
                    if (ctxLandscape) {
                        ctxLandscape.clearRect(0, 0, canvasLandscape.width, canvasLandscape.height);
                    }
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
                        pdfLoaderTask = PDFJS.getDocument(params, null, null, scope.onProgress);
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

                scope.$watch('pageNum', function(newVal) {
                    scope.pageToDisplay = parseInt(newVal);
                    if (pdfDoc !== null) {
                        scope.renderPage(scope.pageToDisplay);
                    }
                });

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
