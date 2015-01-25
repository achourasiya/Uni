'use strict';

//Setting up route
angular.module('recruitings').config(['$stateProvider',
	function($stateProvider) {
		// Recruitings state routing
		$stateProvider.
		state('listRecruitings', {
			url: '/recruitings',
			templateUrl: 'modules/recruitings/views/list-recruitings.client.view.html'
		}).
		state('createRecruiting', {
			url: '/recruitings/create',
			templateUrl: 'modules/recruitings/views/create-recruiting.client.view.html'
		}).
		state('viewRecruiting', {
			url: '/recruitings/:recruitingId',
			templateUrl: 'modules/recruitings/views/view-recruiting.client.view.html'
		}).
		state('editRecruiting', {
			url: '/recruitings/:recruitingId/edit',
			templateUrl: 'modules/recruitings/views/edit-recruiting.client.view.html'
		});
	}
]);