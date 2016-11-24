psiApp.factory('MenuService', function($http, $rootScope) {

	var service = {};
	service.getAll = getAll;
	service.getMenuItemsByProvince = getMenuItemsByProvince;
	service.getMenuItemsByCode = getMenuItemsByCode;
	

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
	
	function getMenuItemsByProvince(provinceCode, callback) {
		$http.get('resources/json/menu.json').success(function(response) {
			if(response!= undefined){
				var i;
				
				for(i = 0 ; i < response.length ; i++){
					if(provinceCode == response[i].provinceCode){
						console.log('response[i].contents' + angular.toJson(response[i].contents));
						callback(response[i].contents);
						break;
					}
				}
			}
		});
	}
	
	function getMenuItemsByCode(menuCode, callback) {
		var menuItem;
		if($rootScope.menu == undefined){
			menuItem = null;
		} else {
			var i;
			for(i= 0; i < $rootScope.menu.length; i ++){
				if($rootScope.menu[i].code == menuCode){
					menuItem =  $rootScope.menu[i];
					break;
				}
			}
		}
		
		
		callback(menuItem);  
	}

	return service;
});
