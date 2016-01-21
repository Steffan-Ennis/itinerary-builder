(function () {
	'use strict';
	angular.module('itineraryAngularApp')

	.controller('itineraryFormController', ['$scope', 'itineraryData', '$state', '$stateParams',

		function ($scope, itineraryData, $state, $stateParams) {

			/*
			 * reference to the current controller for use in functions
			 */
			self = this;
			$scope.itineraries = itineraryData.itineraries;
			$scope.itinerary = 'undefined';
			console.log($state);
			/**
			 * initialising the pointer to the current itinerary
			 */
			if (typeof $stateParams.itineraryIndex === 'undefined') {
				var itinerary = new itineraryData.Itinerary();
				itineraryData.saveItinerary(itinerary);
				var currentIndex = $scope.itineraries.length - 1;
				$scope.itinerary = itineraryData.itineraries[currentIndex];
			} else {
				console.log('here');
				$scope.itinerary = itineraryData.itineraries[$state.params.itineraryIndex];

			}


		}
	]);
}());