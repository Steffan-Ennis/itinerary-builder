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
			$scope.itinerary = undefined;
			$scope.itineraryIndex = $stateParams.itineraryIndex;

			/**
			 * initialising the pointer to the current itinerary
			 */
			if (typeof $stateParams.itineraryIndex === 'undefined') {
				var itinerary = new itineraryData.Itinerary();
				itineraryData.saveItinerary(itinerary);
				$scope.itineraryIndex = $scope.itineraries.length - 1;
				$scope.itinerary = itineraryData.itineraries[$scope.itineraryIndex];
			} else {
				$scope.itinerary = itineraryData.itineraries[$scope.itineraryIndex];
			}

			this.redirectToStopForm = function (stopIndex) {
				if (typeof stopIndex !== 'undefined') {
					$state.go('site.itinerary-builder.stop.edit', {
						'itineraryIndex': $scope.itineraryIndex,
						'stopIndex': stopIndex
					});
				} else {
					$state.go('site.itinerary-builder.stop.new', {
						'itineraryIndex': $scope.itineraryIndex
					});
				}
			};
		}
	]);
}());