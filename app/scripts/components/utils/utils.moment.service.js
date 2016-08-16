/**
 * Created by steffanennis on 16/08/2016.
 */

(function(){
  'use strict';

  angular.module('utils')
    .service('moment',moment);

  function moment (){
    return window.moment;
  }

}());
