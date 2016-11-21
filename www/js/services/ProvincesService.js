psiApp.factory('ProvincesService', function($http) {

	var getAll = function() {
		$http.get('resources/json/provinces.json').success(function(response) {
			console.log('response' + ': ' + response);
			return response;
		});
	};

	return {
		getAll : getAll
	};
});
