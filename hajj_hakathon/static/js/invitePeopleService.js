/**
 * invite Service
 * @description
 *
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('invitePeopleService', invitePeopleService);

  function invitePeopleService($http, $log) {
    return {
      send : send
    };

    function send(data) {
      var url ='/leads/add_lead/';

      return $http.post(url, data)
        .then(getCheckPlanSuccess)
        .catch(getCheckPlanFaild);
    }

    function getCheckPlanSuccess(response) {
      console.log("invitePeopleServiceSuccess", response.data);
      return response.data;
    }

    function getCheckPlanFaild(error) {
      $log.log("invitePeopleServiceFaild", error);
    }
  }
})();
