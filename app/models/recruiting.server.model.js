'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Recruiting Schema
 */
var RecruitingSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Recruiting name',
		trim: true
	},

	opt:{
		type: String,
		trim: true

	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Recruiting', RecruitingSchema);
