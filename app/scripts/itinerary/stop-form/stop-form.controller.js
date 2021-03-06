(function () {
  'use strict';
  angular.module('itineraryAngularApp')

    .controller('stopformController', ['$scope', 'itineraryData', '$state', '$stateParams', 'distance_matrix',

      function ($scope, itineraryData, $state, $stateParams, distance_matrix) {

        /*
         * reference to the current controller for use in functions
         */
        var self = this;
        $scope.itineraries = itineraryData.itineraries;
        $scope.stop; // = undefined;
        $scope.itineraryIndex = $stateParams.itineraryIndex;
        $scope.stopIndex = $stateParams.stopIndex;
        $scope.dateOptions = {
          minDate: new Date()
        };

        /*
         * We only want australian places
         */
        $scope.autocompleteOptions = {
          componentRestrictions: {country: 'au'},
          types: ['geocode']
        };

        /**
         * initialising the pointer to the current stop
         */
        if (!$scope.stopIndex) {
          $scope.stop = new itineraryData.Stop();
        } else {
          $scope.stop = itineraryData.itineraries[$scope.itineraryIndex].stops[$scope.stopIndex];
        }

        this.deleteSite = function (siteIndex) {
          itineraryData.deleteSite(siteIndex, $scope.stopIndex, $scope.itineraryIndex);
        };

        this.redirectToSiteForm = function (siteIndex) {
          if (siteIndex >= 0) {
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

          distance_matrix.getDistanceByFoot([$scope.stop])
            .then(function (response) {
              $scope.stop.distance = response.rows[0].elements[0].distance.value;


              if (typeof $scope.stopIndex === 'undefined') {
                itineraryData.saveStop($scope.stop, $scope.itineraryIndex);
                $scope.stopIndex = $scope.itineraries[$scope.itineraryIndex].stops.length - 1;
                $scope.stop.stopIndex = $scope.stopIndex;
              } else {
                itineraryData.updateStop($scope.stop, $scope.itineraryIndex, $scope.stopIndex);
              }


              /*
               * Auto create  a stop with derparture city set to the current arrival city
               */
              if ($scope.stop.arrivalCity && $scope.stopIndex == $scope.itineraries[$scope.itineraryIndex].stops.length - 1) {

                var connectingStop = new itineraryData.Stop();
                connectingStop.departureCity = $scope.stop.arrivalCity;
                itineraryData.saveStop(connectingStop, $scope.itineraryIndex);
              }

              if (!$scope.stop.visitingClassifiedSites) {
                self.backToList();
              }
            });
        };
      }
    ]);
}());
