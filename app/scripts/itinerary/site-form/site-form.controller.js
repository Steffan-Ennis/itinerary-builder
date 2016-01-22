(function () {
	'use strict';
	angular.module('itineraryAngularApp')

	.controller('siteformController', ['$scope', 'itineraryData', '$state', '$stateParams',

		function ($scope, itineraryData, $state, $stateParams) {

			/*
			 * reference to the current controller for use in functions
			 */
			var self = this;

			/*
			 * Initialising pointer to iteneraries collection
			 * Storing state params for future use
			 */
			$scope.itineraries = itineraryData.itineraries;
			$scope.site = undefined;
			$scope.itineraryIndex = $stateParams.itineraryIndex;
			$scope.stopIndex = $stateParams.stopIndex;
			$scope.siteIndex = $stateParams.siteIndex;


			/*
			 * Granting the form access to site options
			 */
			$scope.lengthOfVisitOptions = itineraryData.lengthOfVisitOptions;
			$scope.requestTypeOptions = itineraryData.requestTypeOptions;
			$scope.visitToOptions = itineraryData.visitToOptions;
			$scope.pertinentToOptions = itineraryData.pertinentToOptions;


			/**
			 * initialising the pointer to the current site
			 */
			if (typeof $scope.siteIndex === 'undefined') {
				$scope.site = itineraryData.constructEmptySite();
			} else {
				$scope.site = itineraryData.itineraries[$scope.itineraryIndex].stops[$stateParams.stopIndex].sites[$scope.siteIndex];
			}

			this.backToList = function () {
				$state.go('site.itinerary-builder.stop.edit', {
					'itineraryIndex': $scope.itineraryIndex,
					'stopIndex': $scope.stopIndex
				});
			};

			/**
			 * check if in the edit screen and updates otherwise saves a new Site
			 * @return {[type]}
			 */
			this.saveSite = function () {
				if (typeof $scope.siteIndex === 'undefined') {
					itineraryData.saveSite($scope.site, $scope.itineraryIndex, $scope.stopIndex);
				} else {
					itineraryData.updateSite($scope.site, $scope.siteIndex, $scope.stopIndex, $scope.itineraryIndex);
				}

				self.backToList();
			};
		}
	]);
}());