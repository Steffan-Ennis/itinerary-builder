/**
 * Created by steffanennis on 16/08/2016.
 */
(function(){
  'use strict';

  angular.module('validators')

    .directive('beforeDate',[
      'moment',
      beforeDate
    ]);

    function beforeDate(moment) {
      var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link,
        scope: {
          beforeDate: '=',
        }
      };

      return directive;

      function link(scope,elem,attr,ngModel) {
        ngModel.$validators.beforeDate = function (modelValue, viewValue) {
          if (moment.isDate(scope.beforeDate) && moment(modelValue).isAfter(scope.beforeDate)){
            return true;
          } else {
            return false;
          }
        }
      }

    };


}());
