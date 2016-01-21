(function () {
	'use strict';
	angular.module('itineraryAngularApp')

	.controller('itineraryController', ['$scope', 'itineraryData', '$state',
		function ($scope, itineraryData, $state) {

			/*
			 * reference to the current controller for use in functions
			 */
			self = this;

			$scope.itineraries = itineraryData.itineraries;

			this.redirectToForm = function (itineraryIndex) {
				if (typeof itineraryIndex !== 'undefined') {
					$state.go('site.itinerary.editForm', {
						'itineraryIndex': itineraryIndex
					});
				} else {
					$state.go('site.itinerary-builder.newForm');
				}
			};

		}
	]);
}());