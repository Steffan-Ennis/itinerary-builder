/**
 * Created by steffanennis on 16/08/2016.
 */
(function(){
  'use strict';

  angular.module('validators')

    .directive('afterDate',[
      'moment',
      afterDate
    ]);

    function afterDate(moment) {
      var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link,
        scope: {
          afterDate: '=',
        }
      };

      return directive;

      function link(scope,elem,attr,ngModel) {
        ngModel.$validators.afterDate = function (modelValue, viewValue) {
          if (!scope.afterDate || (moment.isDate(scope.afterDate) && moment(modelValue).isAfter(scope.afterDate))){
            return true;
          } else {
            return false;
          }
        }
      }

    };


}());
