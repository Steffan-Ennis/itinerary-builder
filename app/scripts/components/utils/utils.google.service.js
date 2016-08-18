/**
 * Created by steffanennis on 18/08/2016.
 */
(function(){
  'use strict';

  angular.module('utils')
    .service('google',google);

  function google (){
    return window.google;
  }

}());
