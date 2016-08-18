(function () {
	'use strict';
	angular.module('itineraryAngularApp')

	.controller('itineraryFormController', ['$scope', 'itineraryData', '$state', '$stateParams',

		function ($scope, itineraryData, $state, $stateParams) {

			/*
			 * reference to the current controller for use in functions
			 */
			var self = this;
			$scope.itineraries = itineraryData.itineraries;
			$scope.itineraryIndex = $stateParams.itineraryIndex;

			/**
			 * initialising the pointer to the current itinerary
			 */
			if (typeof $scope.itineraryIndex === 'undefined') {
				$scope.itinerary = new itineraryData.Itinerary();
			} else {
				$scope.itinerary = itineraryData.itineraries[$scope.itineraryIndex];
			}

			$scope.showComplete = $scope.itinerary.stops.length >= 1;

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

      /**
       * @ngdocs function
       * @description determine weather itinerary.stops[$index] is last and arrival
       * city is the first elements departure city
       * @param $index stop index
       */
      this.isLastAndNotSameAsFirst = function($index) {
        var convertedIndex;

        if($index != undefined){
          convertedIndex = $index + 1;
        } else {
          convertedIndex = $scope.itinerary.stops.length;
          $index = convertedIndex -1;
        }

        if(convertedIndex == $scope.itinerary.stops.length) {

          var startCity = $scope.itinerary.stops[0].departureCity;
          var endCity = $scope.itinerary.stops[$index].arrivalCity;

          if(!startCity || !endCity) {
            return true;
          }

          return (startCity.formatted_address !== endCity.formatted_address);
        } else {
          return false
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
