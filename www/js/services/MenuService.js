psiApp.factory('MenuService', function($http) {

	var service = {};
	service.getAll = getAll;
	service.getMenuItemsByProvince = getMenuItemsByProvince;

	function getAll(callback) {
		$http.get('resources/json/menu.json').success(function(response) {
			callback(response);
		});
	}

	function getMenuItemsByProvince(callback) {
		$http.get('resources/json/menu.json').success(function(response) {
			callback(response);
		});
	}

	return service;
});
