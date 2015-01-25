'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Recruiting = mongoose.model('Recruiting'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, recruiting;

/**
 * Recruiting routes tests
 */
describe('Recruiting CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Recruiting
		user.save(function() {
			recruiting = {
				name: 'Recruiting Name'
			};

			done();
		});
	});

	it('should be able to save Recruiting instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Recruiting
				agent.post('/recruitings')
					.send(recruiting)
					.expect(200)
					.end(function(recruitingSaveErr, recruitingSaveRes) {
						// Handle Recruiting save error
						if (recruitingSaveErr) done(recruitingSaveErr);

						// Get a list of Recruitings
						agent.get('/recruitings')
							.end(function(recruitingsGetErr, recruitingsGetRes) {
								// Handle Recruiting save error
								if (recruitingsGetErr) done(recruitingsGetErr);

								// Get Recruitings list
								var recruitings = recruitingsGetRes.body;

								// Set assertions
								(recruitings[0].user._id).should.equal(userId);
								(recruitings[0].name).should.match('Recruiting Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Recruiting instance if not logged in', function(done) {
		agent.post('/recruitings')
			.send(recruiting)
			.expect(401)
			.end(function(recruitingSaveErr, recruitingSaveRes) {
				// Call the assertion callback
				done(recruitingSaveErr);
			});
	});

	it('should not be able to save Recruiting instance if no name is provided', function(done) {
		// Invalidate name field
		recruiting.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Recruiting
				agent.post('/recruitings')
					.send(recruiting)
					.expect(400)
					.end(function(recruitingSaveErr, recruitingSaveRes) {
						// Set message assertion
						(recruitingSaveRes.body.message).should.match('Please fill Recruiting name');
						
						// Handle Recruiting save error
						done(recruitingSaveErr);
					});
			});
	});

	it('should be able to update Recruiting instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Recruiting
				agent.post('/recruitings')
					.send(recruiting)
					.expect(200)
					.end(function(recruitingSaveErr, recruitingSaveRes) {
						// Handle Recruiting save error
						if (recruitingSaveErr) done(recruitingSaveErr);

						// Update Recruiting name
						recruiting.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Recruiting
						agent.put('/recruitings/' + recruitingSaveRes.body._id)
							.send(recruiting)
							.expect(200)
							.end(function(recruitingUpdateErr, recruitingUpdateRes) {
								// Handle Recruiting update error
								if (recruitingUpdateErr) done(recruitingUpdateErr);

								// Set assertions
								(recruitingUpdateRes.body._id).should.equal(recruitingSaveRes.body._id);
								(recruitingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Recruitings if not signed in', function(done) {
		// Create new Recruiting model instance
		var recruitingObj = new Recruiting(recruiting);

		// Save the Recruiting
		recruitingObj.save(function() {
			// Request Recruitings
			request(app).get('/recruitings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Recruiting if not signed in', function(done) {
		// Create new Recruiting model instance
		var recruitingObj = new Recruiting(recruiting);

		// Save the Recruiting
		recruitingObj.save(function() {
			request(app).get('/recruitings/' + recruitingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', recruiting.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Recruiting instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Recruiting
				agent.post('/recruitings')
					.send(recruiting)
					.expect(200)
					.end(function(recruitingSaveErr, recruitingSaveRes) {
						// Handle Recruiting save error
						if (recruitingSaveErr) done(recruitingSaveErr);

						// Delete existing Recruiting
						agent.delete('/recruitings/' + recruitingSaveRes.body._id)
							.send(recruiting)
							.expect(200)
							.end(function(recruitingDeleteErr, recruitingDeleteRes) {
								// Handle Recruiting error error
								if (recruitingDeleteErr) done(recruitingDeleteErr);

								// Set assertions
								(recruitingDeleteRes.body._id).should.equal(recruitingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Recruiting instance if not signed in', function(done) {
		// Set Recruiting user 
		recruiting.user = user;

		// Create new Recruiting model instance
		var recruitingObj = new Recruiting(recruiting);

		// Save the Recruiting
		recruitingObj.save(function() {
			// Try deleting Recruiting
			request(app).delete('/recruitings/' + recruitingObj._id)
			.expect(401)
			.end(function(recruitingDeleteErr, recruitingDeleteRes) {
				// Set message assertion
				(recruitingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Recruiting error error
				done(recruitingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Recruiting.remove().exec();
		done();
	});
});