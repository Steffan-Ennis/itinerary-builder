(function () {
	'use strict';
	angular
		.module('itineraryAngularApp')

	.config(function ($stateProvider) {

		$stateProvider

			.state('site.itinerary-builder', {
			parent: 'site',
			url: '/itinerary-builder',
			views: {
				'content@': {
					template: '<p>I\'m here</p>'
						//templateUrl: 'views/about.html',
				}
			}
		});
	});
}());