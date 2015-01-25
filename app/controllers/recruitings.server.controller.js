'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Recruiting = mongoose.model('Recruiting'),
	_ = require('lodash');

/**
 * Create a Recruiting
 */
exports.create = function(req, res) {
	var recruiting = new Recruiting(req.body);
	recruiting.user = req.user;

	recruiting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(recruiting);
		}
	});
};

/**
 * Show the current Recruiting
 */
exports.read = function(req, res) {
	res.jsonp(req.recruiting);
};

/**
 * Update a Recruiting
 */
exports.update = function(req, res) {
	var recruiting = req.recruiting ;

	recruiting = _.extend(recruiting , req.body);

	recruiting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(recruiting);
		}
	});
};

/**
 * Delete an Recruiting
 */
exports.delete = function(req, res) {
	var recruiting = req.recruiting ;

	recruiting.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(recruiting);
		}
	});
};

/**
 * List of Recruitings
 */
exports.list = function(req, res) { 
	Recruiting.find().sort('-created').populate('user', 'displayName').exec(function(err, recruitings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(recruitings);
		}
	});
};

/**
 * Recruiting middleware
 */
exports.recruitingByID = function(req, res, next, id) { 
	Recruiting.findById(id).populate('user', 'displayName').exec(function(err, recruiting) {
		if (err) return next(err);
		if (! recruiting) return next(new Error('Failed to load Recruiting ' + id));
		req.recruiting = recruiting ;
		next();
	});
};

/**
 * Recruiting authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.recruiting.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
