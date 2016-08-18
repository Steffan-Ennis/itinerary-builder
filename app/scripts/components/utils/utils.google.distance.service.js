/**
 * Created by steffanennis on 17/08/2016.
 */
(function(){

  'use strict';

  angular.module('utils')
    .service('distance_matrix',distance_matrix);

  distance_matrix.$inject = ['google','$q'];

  function distance_matrix(google,$q) {

    var service = {};
    service.getDistanceByFoot = function (stops) {

      var deferred = $q.defer();
      var distanceService = new google.maps.DistanceMatrixService();
      var origins = [];
      var destinations = [];
      
      angular.forEach(stops,function(stop){
        origins.push(stop.departureCity.formatted_address);
        destinations.push(stop.arrivalCity.formatted_address);
      });

      distanceService.getDistanceMatrix(
        {
          origins: origins,
          destinations: destinations,
          travelMode: 'WALKING',
        }, callback);

      function callback(response, status) {
        deferred.resolve(response);
      }

      return deferred.promise;
    };

    return service;
  }

}());
