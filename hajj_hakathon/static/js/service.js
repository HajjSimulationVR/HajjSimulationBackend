/**
 * GetDefaultPlans Service
 * @description
 *
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('GetDefaultPlans', GetDefaultPlans);

  function GetDefaultPlans($http, $log) {
    return {
      getPlan : getPlan
    };

    function getPlan() {

      var url = window.location.pathname;
      var id = url.split('/')[3];

      var data = {
        "unit_id": id
      }
      var url ='/plans/default_plans/';
      return $http.post(url, data)
        .then(getDefaultPlanSuccess)
        .catch(getDefaultPlanFaild);
    }

    function getDefaultPlanSuccess(response) {
      console.log("getDefaultPlanSuccess", response.data);
      return response.data;
    }

    function getDefaultPlanFaild(error) {
      $log.log("getDefaultPlanSuccess", error);
    }
  }
})();
