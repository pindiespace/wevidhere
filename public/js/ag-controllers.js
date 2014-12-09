var WeVidHereConfig = angular.module('WeVidHere', []);

//@link http://scotch.io/tutorials/javascript/building-dynamic-angular-forms-with-ngrepeat-and-ngform
//@link http://www.javacodegeeks.com/2014/03/single-page-application-with-angular-js-node-js-and-mongodb-mongojs-module.html
//@link http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular
//@link http://code.realcrowd.com/on-the-bleeding-edge-advanced-angularjs-form-validation/
//@link http://lostechies.com/gabrielschenker/2014/05/13/angularjspart-16-forms/

WeVidHereConfig.controller(
	'WeVidHereConfig', ['$scope', '$http', 
		function ($scope, $http) {

			//get data from the database
			$http({
				method: "GET",
				url: "data/users.json"
			}).success(function (data, status, headers, config) {
				$scope.formData = {};
				$scope.formData.users = data;
			}).error(function(data, status, headers, config) {

			});

			//compare data from db with one of our forms
			$scope.doLogin = function() {
        		if($scope.formData.users[2].email === $scope.formData.username && 
        			$scope.formData.users[2].password=== $scope.formData.password) {
          				alert("Welcome");
        			}
        			else {
        				alert("Lame, username:" + $scope.formData.username + " password:" + $scope.formData.password);
        			}
			}
		} 
	] 
); 