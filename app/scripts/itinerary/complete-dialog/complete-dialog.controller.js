(function () {
	'use strict';

	angular.module('itineraryAngularApp')

	.controller('completeDialogController', ['$scope',
		function ($scope) {
			var lastStopIndex = $scope.itinerary.stops.length - 1;

			var startDeparture = $scope.itinerary.stops[0] && $scope.itinerary.stops[0].departureDate ? $scope.itinerary.stops[0].departureDate : '';
			var finishDeparture = $scope.itinerary.stops[0] && $scope.itinerary.stops[lastStopIndex].departureDate ? $scope.itinerary.stops[lastStopIndex].departureDate : '';

			$scope.duration = startDeparture + ' To ' + finishDeparture;
		}
	]);
}());