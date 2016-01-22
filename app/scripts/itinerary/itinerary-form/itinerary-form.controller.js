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
			if (typeof $scope.itineraryIndex === 'undefined') {
				$scope.itinerary = new itineraryData.Itinerary();
			} else {
				$scope.itinerary = itineraryData.itineraries[$scope.itineraryIndex];
			}

			this.deleteStop = function (stopIndex) {
				itineraryData.deleteStop($scope.itineraryIndex, stopIndex);
			};

			/**
			 * redirects to currect form
			 */
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

			this.backToList = function () {
				$state.go('^');
			};

			/**
			 * Checks if in the edit screen and updates otherwise saves a new Itinerary
			 */
			this.saveItenarary = function () {
				if (typeof $scope.itineraryIndex === 'undefined') {
					itineraryData.saveItinerary($scope.itinerary);
					$scope.itineraryIndex = itineraryData.itineraries.length - 1;
				} else {
					itineraryData.updateItinerary($scope.itinerary, $scope.itineraryIndex);
				}
			};
		}
	]);
}());