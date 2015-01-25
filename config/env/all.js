'use strict';

module.exports = {
	app: {
		title: 'PeopleDirectory',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3002,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/semantic-ui/dist/semantic.min.css',
				'public/lib/AngularJS-Toaster/toaster.css',
				'public/lib/animate.css/animate.min.css',
				'public/lib/ng-table/dist/ng-table.min.css',
				'public/lib/font-awesome/css/font-awesome.min.css'


			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/AngularJS-Toaster/toaster.js',
				'public/lib/ng-table/dist/ng-table.min.js',
				'public/lib/jquery/jquery.js',
				'public/lib/jquery-backstretch/jquery.backstretch.min.js',
				//'public/lib/semantic-ui/dist/semantic.min.js',

			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
