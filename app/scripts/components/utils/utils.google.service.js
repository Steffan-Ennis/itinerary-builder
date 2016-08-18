/**
 * Created by steffanennis on 18/08/2016.
 */
(function(){
  'use strict';

  angular.module('utils')
    .service('google',moment);

  function moment (){
    return window.google;
  }

}());
