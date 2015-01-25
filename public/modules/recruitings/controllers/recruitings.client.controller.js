'use strict';

// Recruitings controller
angular.module('recruitings').controller('RecruitingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Recruitings',
	function($scope, $stateParams, $location, Authentication, Recruitings) {
		$scope.authentication = Authentication;

		// Create new Recruiting
		$scope.create = function() {
			// Create new Recruiting object
			var recruiting = new Recruitings ({
				name: this.name
			});

			// Redirect after save
			recruiting.$save(function(response) {
				$location.path('recruitings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.selectables = [
			{ label: 'Male', value: 1 },
			{ label: 'Female', value: 2 }
		];
		$scope.selecteducation = [
			{ label: 'Less than high school', value: 1 },
			{ label: 'High school graduate', value: 2 },
			{ label: 'Some college or university', value: 3 },
			{ label: 'College graduate with a 2 year degree', value: 4 },
			{ label: 'College graduate with a 4 year degree', value: 5 }
		];
		$scope.selecthouseholdincome = [
			{ label: '19,999 or less', value: 1 },
			{ label: '40,000-49,999', value: 2 },
			{ label: '70,000-79,999', value: 3 },
			{ label: '150,000 or more', value: 4 },
			{ label: 'Prefer not to answer', value: 5 }
		];
		$scope.selectrelationstatus = [
			{ label: 'Never married', value: 1 },
			{ label: 'Married', value: 2 },
			{ label: 'Divorced', value: 3 },
			{ label: 'Widowed', value: 4 },
			{ label: 'Separated', value: 5 }
		];

		$scope.selectEthnicity = [
			{ label: 'Caucasian', value: 1 },
			{ label: 'African American', value: 2 },
			{ label: 'Asian (non Pacific Islander)', value: 3 },
			{ label: 'Central Asian', value: 4 },
			{ label: 'Chinese', value: 5 },
			{ label: 'Middle Eastern/North African', value: 6 },
			{ label: 'Native American, Eskimo, Aleutian', value: 7 }

		];

		$scope.selectCountry = [
			{ label: 'USA', value: 1 },
			{ label: 'RUSSIA', value: 2 },
			{ label: 'UK', value: 3 },
			{ label: 'INDIA', value: 4 },
			{ label: 'CANADA', value: 5 },
			{ label: 'FRANCE', value: 6 },
			{ label: 'GERMANY', value: 7 }

		];













		// Remove existing Recruiting
		$scope.remove = function(recruiting) {
			if ( recruiting ) { 
				recruiting.$remove();

				for (var i in $scope.recruitings) {
					if ($scope.recruitings [i] === recruiting) {
						$scope.recruitings.splice(i, 1);
					}
				}
			} else {
				$scope.recruiting.$remove(function() {
					$location.path('recruitings');
				});
			}
		};

		// Update existing Recruiting
		$scope.update = function() {
			var recruiting = $scope.recruiting;

			recruiting.$update(function() {
				$location.path('recruitings/' + recruiting._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Recruitings
		$scope.find = function() {
			$scope.recruitings = Recruitings.query();
		};

		// Find existing Recruiting
		$scope.findOne = function() {
			$scope.recruiting = Recruitings.get({ 
				recruitingId: $stateParams.recruitingId
			});
		};
	}
]);
