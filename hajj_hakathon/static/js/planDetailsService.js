/**
 * plan details Service
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('planDetailsService', planDetailsService);

  function planDetailsService($http, $log) {
    return {
      getData : getData
    };

    function getData(unitID, clientID) {
      var url ='/plans/actual_plan/?unit='+ unitID + '&client='+ clientID;

      console.log("url", url);
      return $http.get(url)
        .then(getplanDetailsServiceSuccess)
        .catch(getplanDetailsServiceFaild);
    }

    function getplanDetailsServiceSuccess(response) {
      console.log("planDetailsServiceSuccess", response.data);
      return response.data;
    }

    function getplanDetailsServiceFaild(error) {
      $log.log("planDetailsServiceFaild", error);
    }
  }
})();
