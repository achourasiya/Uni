'use strict';

(function() {
	// Recruitings Controller Spec
	describe('Recruitings Controller Tests', function() {
		// Initialize global variables
		var RecruitingsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Recruitings controller.
			RecruitingsController = $controller('RecruitingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Recruiting object fetched from XHR', inject(function(Recruitings) {
			// Create sample Recruiting using the Recruitings service
			var sampleRecruiting = new Recruitings({
				name: 'New Recruiting'
			});

			// Create a sample Recruitings array that includes the new Recruiting
			var sampleRecruitings = [sampleRecruiting];

			// Set GET response
			$httpBackend.expectGET('recruitings').respond(sampleRecruitings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.recruitings).toEqualData(sampleRecruitings);
		}));

		it('$scope.findOne() should create an array with one Recruiting object fetched from XHR using a recruitingId URL parameter', inject(function(Recruitings) {
			// Define a sample Recruiting object
			var sampleRecruiting = new Recruitings({
				name: 'New Recruiting'
			});

			// Set the URL parameter
			$stateParams.recruitingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/recruitings\/([0-9a-fA-F]{24})$/).respond(sampleRecruiting);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.recruiting).toEqualData(sampleRecruiting);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Recruitings) {
			// Create a sample Recruiting object
			var sampleRecruitingPostData = new Recruitings({
				name: 'New Recruiting'
			});

			// Create a sample Recruiting response
			var sampleRecruitingResponse = new Recruitings({
				_id: '525cf20451979dea2c000001',
				name: 'New Recruiting'
			});

			// Fixture mock form input values
			scope.name = 'New Recruiting';

			// Set POST response
			$httpBackend.expectPOST('recruitings', sampleRecruitingPostData).respond(sampleRecruitingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Recruiting was created
			expect($location.path()).toBe('/recruitings/' + sampleRecruitingResponse._id);
		}));

		it('$scope.update() should update a valid Recruiting', inject(function(Recruitings) {
			// Define a sample Recruiting put data
			var sampleRecruitingPutData = new Recruitings({
				_id: '525cf20451979dea2c000001',
				name: 'New Recruiting'
			});

			// Mock Recruiting in scope
			scope.recruiting = sampleRecruitingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/recruitings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/recruitings/' + sampleRecruitingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid recruitingId and remove the Recruiting from the scope', inject(function(Recruitings) {
			// Create new Recruiting object
			var sampleRecruiting = new Recruitings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Recruitings array and include the Recruiting
			scope.recruitings = [sampleRecruiting];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/recruitings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRecruiting);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.recruitings.length).toBe(0);
		}));
	});
}());