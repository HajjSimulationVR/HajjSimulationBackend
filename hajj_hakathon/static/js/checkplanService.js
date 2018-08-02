/**
 * GetDefaultPlans Service
 * @description
 *
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('CheckPlan', CheckPlan);

  function CheckPlan($http, $log) {
    return {
      check : check
    };

    function check(data) {
      var url ='/plans/check_plan/';

      return $http.post(url, data)
        .then(getCheckPlanSuccess)
        .catch(getCheckPlanFaild);
    }

    function getCheckPlanSuccess(response) {
      console.log("getCheckPlanSuccess", response.data);
      return response.data;
    }

    function getCheckPlanFaild(error) {
      $log.log("getCheckPlanFaild", error);
    }
  }
})();
