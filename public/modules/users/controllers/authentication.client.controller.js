'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'toaster',
	function($scope, $http, $location, Authentication,toaster) {

		$.backstretch([
			"modules/users/img/bg/5.jpg",
			"modules/users/img/bg/4.jpg",

		], {
			fade: 1000,
			duration: 7000
		});
		$scope.authentication = Authentication;


		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$scope.class = 'btn-u btn-block';
				// And redirect to the index page
				var index =  window.location.href.toString().lastIndexOf("#")

				var path = window.location.href.substr(0,index)  + '/';

				window.location.href = path ;
				//$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
				$scope.pop(response.message);
				$scope.class = 'btn-u btn-u-red btn-block animated tada test';
				$scope.error = response.message;

			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$scope.class = 'btn-u btn-block';
				// And redirect to the index page
				//$location.path('/');
				var index =  window.location.href.toString().lastIndexOf("#")

				var path = window.location.href.substr(0,index) ;

				window.location.href = path ;
			}).error(function(response) {
				$scope.pop(response.message);
				$scope.class = 'btn-u btn-u-red btn-block animated tada test';
				$scope.error = response.message;

		});
		};
		$scope.class = 'btn-u btn-block';

		$scope.changeClass = function(){
			if ($scope.class === 'btn-u btn-block')
				$scope.class = 'ui primary loading';
			else
				$scope.class = 'btn-u btn-block';
		};
		$scope.pop = function(err){
			console.log('call');
			toaster.clear();
			toaster.error("title",err);
			toaster.pop('error',err);
		};
	}
]);
