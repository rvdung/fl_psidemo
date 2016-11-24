psiApp.factory('ProvincesService', function($http) {

	var service = {};
	service.getAll = getAll;
	
	
	function getAll(callback) {
		$http.get('resources/json/provinces.json').success(function(response) {
			callback(response);
		});
	};
	
	return service;

});
