/**
 * App routing
 * @description
 * Use this page to add routes to our app.
 */

(function () {
  'use strict';

  angular
    .module('app')
    .config(routesConfig);

  /* @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }
})();
