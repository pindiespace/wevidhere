var WeVidHereConfig = angular.module('WeVidHere', []);

//@link http://scotch.io/tutorials/javascript/building-dynamic-angular-forms-with-ngrepeat-and-ngform

WeVidHereConfig.controller(
	'WeVidHereConfig', ['$scope', '$http', 
		function ($scope, $http) {

			$http({
				method: "GET",
				url: "data/users.json"
			}).success(function (data, status, headers, config) {
				$scope.formData = {};
				$scope.formData.users = data;
			}).error(function(data, status, headers, config) {

			});

			$scope.orderProp = 'name';

		} 
	] 
); 