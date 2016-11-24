psiApp.factory('MenuService', function($http) {

	var service = {};
	service.getAll = getAll;
	service.getMenuItemsByProvince = getMenuItemsByProvince;

	function getAll(callback) {
		$http.get('resources/json/menu.json').success(function(response) {
			callback(response);
		});
	}

	function getMenuItemsByProvince(provinceCode, callback) {
		$http.get('resources/json/menu.json').success(function(response) {
			if(response!= undefined){
				var i;
				
				for(i = 0 ; i < response.length ; i++){
					if(provinceCode == response[i].provinceCode){
						console.log('response[i].contents' + angular.toJson(response[i].contents));
						callback(response[i].contents);
					}
				}
			}
		});
	}

	return service;
});
