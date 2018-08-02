/**
 * authinterceptor
 * @description
 * this service is intercepting all requests anding token to it's header.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('authInterceptor', authInterceptor);

  /* @ngInject */
  function authInterceptor() {
    return {
      request: request,
      response: response
    };

    function request(config) {
      config.headers.Authorization = 'Token ' + $("#authToken").val();
      return config;
    }

    function response(response){
      return response;
    }
  }
})();

