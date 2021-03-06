psiApp
		.factory(
				'ViewCountingService',
				function($rootScope, localStorageService) {

					var key = "viewCount";
					var service = {};
					service.getViewCount = getViewCount;
					service.addViewCount = addViewCount;
					service.addViewCountByMenuCode = addViewCountByMenuCode;

					function getViewCount(callback) {
						var isChange = false;
						$rootScope.viewCount = localStorageService.get(key)
								|| {};
						if ($rootScope.province != undefined
								&& $rootScope.viewCount[$rootScope.province.provinceCode] == undefined) {
							$rootScope.viewCount[$rootScope.province.provinceCode] = {};
							isChange = true;
						}
						if ($rootScope.menu != undefined) {
							var i
							for (i = 0; i < $rootScope.menu.length; i++) {
								if ($rootScope.viewCount[$rootScope.province.provinceCode][$rootScope.menu[i].code] == undefined) {
									$rootScope.viewCount[$rootScope.province.provinceCode][$rootScope.menu[i].code] = 0;
									isChange = true;
								}
							}
						}
						if (isChange) {
							localStorageService.set(key, $rootScope.viewCount);
						}
						if (callback != undefined) {
							callback();
						}

					}

					function addViewCountByMenuCode(menuCode) {
						addViewCount($rootScope.province.provinceCode, menuCode);
					}

					function addViewCount(provinceCode, menuCode) {
						$rootScope.viewCount = localStorageService.get(key)
								|| {};

						if ($rootScope.viewCount[provinceCode] == undefined) {
							$rootScope.viewCount[provinceCode] = {};
						}

						if ($rootScope.viewCount[provinceCode][menuCode] == undefined) {
							$rootScope.viewCount[provinceCode][menuCode] = 1;
						} else {
							$rootScope.viewCount[provinceCode][menuCode] = $rootScope.viewCount[provinceCode][menuCode] + 1;
						}
						console.log('$rootScope.viewCount--'
								+ angular.toJson($rootScope.viewCount));
						localStorageService.set(key, $rootScope.viewCount);
					}

					return service;

				});
