psiApp.controller('MasonCtrl', function($scope,$http) {

	const  caibe_json="resources/json/mason_caibe.json";
	const  cailay_json="resources/json/mason_cailay.json";
	const  chauthanh_json="resources/json/mason_chauthanh.json";
	const  chogao_json="resources/json/mason_chogao.json";
	const  gocong_json="resources/json/mason_gocong.json";
	const  gocongtay_json="resources/json/mason_gocongtay.json";

	$scope.huyens = [{code:"caibe", label:"Huyện Cái Bè"},{code:"cailay", label:"Huyện Cai Lậy"},
         {code:"chauthanh", label:"Huyện Châu Thành"},
         {code:"chogao", label:"Huyện Chợ Gạo"},
         {code:"gocongtay", label:"Huyện Gò Công Tây"},
         {code:"gocong", label:"Thị Xã Gò Công"} ];
     $scope.selectHuyen = $scope.huyens[0];
	
	initData();

	function initData() {
		$http.get(caibe_json).success(function(response) {
			$scope.masons = response;
		});
	};

	$scope.call = function(tel) {
		window.location.href = "tel:" + tel;
	}

	$scope.changeHuyen = function(value){
		if("caibe" === value.code) {
			$http.get(caibe_json).success(function(response) {
				$scope.masons = response;			
			});
			return;
		}
		if("cailay" === value.code) {
			$http.get(cailay_json).success(function(response) {
				$scope.masons = response;			
			});
			return;
		}
		if("chogao" === value.code) {
			$http.get(chogao_json).success(function(response) {
				$scope.masons = response;			
			});
			return;
		}
		if("chauthanh" === value.code) {
			$http.get(chauthanh_json).success(function(response) {
				$scope.masons = response;			
			});
			return;
		}
		if("gocongtay" === value.code) {
			$http.get(gocongtay_json).success(function(response) {
				$scope.masons = response;			
			});
			return;
		}
		$http.get(gocong_json).success(function(response) {
			$scope.masons = response;			
		});
	  };
 });
