/**
 * submitSelectedPlan Service
 * @description
 *
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('submitSelectedPlan', submitSelectedPlan);

  function submitSelectedPlan($http, $log) {
    return {
      send : send
    };

    function send(data) {
      var url ='/plans/actual_plan/';

      return $http.post(url, data)
        .then(getCheckPlanSuccess)
        .catch(getCheckPlanFaild);
    }

    function getCheckPlanSuccess(response) {
      console.log("submitSelectedPlanSuccess", response.data);
      return response.data;
    }

    function getCheckPlanFaild(error) {
      $log.log("submitSelectedPlanFaild", error);
    }
  }
})();
