(function () {
	'use strict';

	angular.module('itineraryAngularApp')

	.controller('completeDialogController',
    ['$scope','distance_matrix',
		function ($scope,distance_matrix) {
			var lastStopIndex = $scope.itinerary.stops.length - 1;

			var startDeparture = $scope.itinerary.stops[0] && $scope.itinerary.stops[0].departureDate ? $scope.itinerary.stops[0].departureDate : '';
			var finishDeparture = $scope.itinerary.stops[0] && $scope.itinerary.stops[lastStopIndex].departureDate ? $scope.itinerary.stops[lastStopIndex].departureDate : '';

			$scope.duration = startDeparture + ' To ' + finishDeparture;

      $scope.getDistance = function(){
        var distance = 0;

        angular.forEach($scope.itinerary.stops,function(stop){
          distance += stop.distance;
        });

        return distance;
      }
      //distance_matrix.getDistanceByFoot($scope.itinerary.stops);
    }
	]);
}());
