(function () {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name itineraryAngularApp
	 * @description
	 * # itineraryAngularApp
	 *
	 * Main module of the application.
	 */
	angular
		.module('itineraryAngularApp', [
			'ngAnimate',
			'ngAria',
			'ngCookies',
			'ngMessages',
			'ngResource',
			'ngSanitize',
			'ngTouch',
			'ui.router',
			'ngStorage'
		])
		.config(function ($stateProvider, $urlRouterProvider) {
			$.material.init();
			$stateProvider

				.state('site', {
				abstract: true,
				views: {
					'navbar@': {
						templateUrl: 'scripts/components/navbar/navbar.html'
					}
				}
			})

			.state('home', {
				parent: 'site',
				url: '/',
				views: {
					'content@': {
						templateUrl: 'views/main.html'
					}
				}
			});


			$urlRouterProvider.otherwise('/');
		});

}());