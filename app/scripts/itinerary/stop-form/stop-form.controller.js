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
			/**
			 * initialising the pointer to the current stop
			 */
			var itineraryIndex = $stateParams.intineraryIndex;
			if (typeof $stateParams.stopIndex === 'undefined') {
				var stop = new itineraryData.Stop();
				itineraryData.saveStop(stop, $scope.itineraryIndex);
				var currentIndex = $scope.itineraries[$scope.itineraryIndex].stops.length - 1;
				$scope.stop = itineraryData.itineraries[$scope.itineraryIndex].stops[currentIndex];
			} else {
				$scope.stop = itineraryData.itineraries[$scope.itineraryIndex].stops[$stateParams.stopIndex];
			}

		}
	]);
}());