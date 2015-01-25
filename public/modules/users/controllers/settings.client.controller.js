'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);

		};

		$scope.selectcstype = [
			{ label: 'Accounting', value: 1 },
			{ label: 'Training', value: 2 },
			{ label: 'Human Resources', value: 3 },
			{ label: 'Servicing', value: 4 },
			{ label: 'Recruiting', value: 5 },
			{ label: 'Marketing', value: 6 }
		];



		$scope.selectroletype = [
			{ label: 'Translator', value: 1 },
			{ label: 'Moderator', value: 2 },
			{ label: 'Consumer', value: 3 }

		];

		$scope.selectShowDiv=function(option) {
			console.log("call metod  for selecting the option");
			console.log(option);
			if (option == 1){

				$scope.showTranslator=true;
				$scope.showModurator=false;
				$scope.showconsumer=false;
			}

				 if(option==2)
			{
				$scope.showTranslator=false;
				$scope.showModurator=true;
				$scope.showconsumer=false;
			}
			if(option==3)
			{
				$scope.showconsumer=true;
				$scope.showModurator=false;
				$scope.showTranslator=false;
			}
if(option == 0)
			{
				$scope.showconsumer=false;
				$scope.showModurator=false;
				$scope.showTranslator=false;
			}

		}







		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
