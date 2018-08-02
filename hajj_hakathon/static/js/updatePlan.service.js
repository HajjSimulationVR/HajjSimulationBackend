/**
 * submitSelectedPlan Service
 * @description
 *
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('updateSelectedPlan', updateSelectedPlan);

  function updateSelectedPlan($http, $log, $window) {
    return {
      send : send
    };

    function send(state, id) {
      var url ='/plans/update/actual_plan/'+ id +'/' ;
      var data = {
        "unit_state" : state
      }
      return $http.put(url, data)
        .then(getCheckPlanSuccess)
        .catch(getCheckPlanFaild);
    }

    function getCheckPlanSuccess(response) {
      console.log("submitSelectedPlanSuccess", response.data);
      $window.location.href = '/plans/final_plan'
      return response.data;
    }

    function getCheckPlanFaild(error) {
      $log.log("submitSelectedPlanFaild", error);
    }
  }
})();
