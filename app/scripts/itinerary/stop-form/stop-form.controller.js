(function () {
	'use strict';
	angular.module('itineraryAngularApp')

	.controller('stopformController', ['$scope', 'itineraryData', '$state', '$stateParams',

		function ($scope, itineraryData, $state, $stateParams) {

			/*
			 * reference to the current controller for use in functions
			 */
			self = this;
			$scope.itineraries = itineraryData.itineraries;
			$scope.stop = undefined;
			$scope.itineraryIndex = $stateParams.itineraryIndex;
			$scope.stopIndex = $stateParams.stopIndex;

			/**
			 * initialising the pointer to the current stop
			 */
			if (typeof $scope.stopIndex === 'undefined') {
				$scope.stop = new itineraryData.Stop();
			} else {
				$scope.stop = itineraryData.itineraries[$scope.itineraryIndex].stops[$scope.stopIndex];
			}

			this.deleteSite = function (siteIndex) {
				itineraryData.deleteSite(siteIndex, $scope.stopIndex, $scope.itineraryIndex);
			};

			this.redirectToSiteForm = function (siteIndex) {
				if (typeof siteIndex !== 'undefined') {
					$state.go('site.itinerary-builder.stop.site.edit', {
						'itineraryIndex': $scope.itineraryIndex,
						'stopIndex': $scope.stopIndex,
						'siteIndex': siteIndex
					});
				} else {
					$state.go('site.itinerary-builder.stop.site.new', {
						'itineraryIndex': $scope.itineraryIndex,
						'stopIndex': $scope.stopIndex

					});
				}
			};

			this.backToList = function () {
				$state.go('site.itinerary-builder.edit', {
					'itineraryIndex': $scope.itineraryIndex
				});
			};

			/**
			 * Checks if in the edit screen and updates else saves a new stop
			 */
			this.saveStop = function () {
				if (typeof $scope.stopIndex === 'undefined') {
					itineraryData.saveStop($scope.stop, $scope.itineraryIndex);
					$scope.stopIndex = $scope.itineraries[$scope.itineraryIndex].stops.length - 1;
					$scope.stop.stopIndex = $scope.stopIndex;
				} else {
					itineraryData.updateStop($scope.stop, $scope.itineraryIndex, $scope.stopIndex);
				}
			};
		}
	]);
}());