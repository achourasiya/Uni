'use strict';

//Recruitings service used to communicate Recruitings REST endpoints
angular.module('recruitings').factory('Recruitings', ['$resource',
	function($resource) {
		return $resource('recruitings/:recruitingId', { recruitingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);