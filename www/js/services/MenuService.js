psiApp.factory('MenuService', function($http) {

	var menuItems = null;
	var service = {};

	service.getAll = getAll;
	service.getMenuItemsByProvince = getMenuItemsByProvince;
	

	$http.get('resources/json/menu.json').success(function(response) {
		menuItems = response;
	});

	var getAll = function() {
		return menuItems;
	};
	
	var getMenuItemsByProvince = function(provinceCode) {
		return menuItems;
		//TODO: Implement
	};

	return service;
});
