/**
 *all Plans Service
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('allPlansService', allPlansService);

  function allPlansService($http, $log) {
    return {
      getData : getData
    };

    function getData() {
      var url ='/plans/actual_plan/';

      return $http.get(url)
        .then(getallPlansServiceSuccess)
        .catch(getallPlansServiceFaild);
    }

    function getallPlansServiceSuccess(response) {
      console.log("allPlansService", response.data);
      return response.data;
    }

    function getallPlansServiceFaild(error) {
      $log.log("allPlansServiceServiceFaild", error);
    }
  }
})();
