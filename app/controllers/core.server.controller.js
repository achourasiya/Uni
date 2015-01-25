'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('Loginindex', {
		user: req.user || null,
		request: req
	});
};
//exports.dashboard = function(req, res) {
//	console.log("dashboard");
//	res.render('Dashboardindex', {
//		user: req.user || null,
//		request: req
//	});
//};
