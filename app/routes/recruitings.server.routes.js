'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var recruitings = require('../../app/controllers/recruitings.server.controller');

	// Recruitings Routes
	app.route('/recruitings')
		.get(recruitings.list)
		.post(users.requiresLogin, recruitings.create);

	app.route('/recruitings/:recruitingId')
		.get(recruitings.read)
		.put(users.requiresLogin, recruitings.hasAuthorization, recruitings.update)
		.delete(users.requiresLogin, recruitings.hasAuthorization, recruitings.delete);

	// Finish by binding the Recruiting middleware
	app.param('recruitingId', recruitings.recruitingByID);
};
