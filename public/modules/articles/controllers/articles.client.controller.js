'use strict';

angular.module('articles')
	.controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles','ngTableParams',
	function($scope, $stateParams, $location, Authentication, Articles,ngTableParams) {

		var data = Articles.query(function() {
			console.log(data);
		});


		//var data= $scope.articles;
		console.log(data);
		$scope.tableParams = new ngTableParams({
			page: 1,            // show first page
			count: 10           // count per page
		}, {
			total: data.length, // length of data
			getData: function ($defer, params) {
				$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			}
		})
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
			var data=$scope.articles;

		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};


	}

]);
    //.controller('TableCntrl',['Articles',function($scope, ngTableParams,Articles) {
	//	var data = [{name: "Moroni", age: 50},
	//		{name: "Tiancum", age: 43},
	//		{name: "Jacob", age: 27},
	//		{name: "Nephi", age: 29},
	//		{name: "Enos", age: 34},
	//		{name: "Tiancum", age: 43},
	//		{name: "Jacob", age: 27},
	//		{name: "Nephi", age: 29},
	//		{name: "Enos", age: 34},
	//		{name: "Tiancum", age: 43},
	//		{name: "Jacob", age: 27},
	//		{name: "Nephi", age: 29},
	//		{name: "Enos", age: 34},
	//		{name: "Tiancum", age: 43},
	//		{name: "Jacob", age: 27},
	//		{name: "Nephi", age: 29},
	//		{name: "Enos", age: 34}];
    //
	//	$scope.tableParams = new ngTableParams({
	//		page: 1,            // show first page
	//		count: 10           // count per page
	//	}, {
	//		total: data.length, // length of data
	//		getData: function ($defer, params) {
	//			$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	//		}
	//	})
	//}]);
