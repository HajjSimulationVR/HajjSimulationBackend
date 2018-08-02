/**
 * check-coupon Service
 * @description
 *
 */

(function () {
  'use strict';

  angular
    .module('app')
    .factory('CheckCouponService', CheckCouponService);

  function CheckCouponService($http, $log) {
    return {
      check : check
    };

    function check(data) {
      var url ='/promo_code/check_coupon/';

      return $http.post(url, data)
        .then(getCheckCouponSuccess)
        .catch(getCheckCouponFaild);
    }

    function getCheckCouponSuccess(response) {
      console.log("getpromo_codePlanSuccess", response.data);
      return response.data;
    }

    function getCheckCouponFaild(error) {
      $log.log("getpromo_codePlanSuccess", error);
    }
  }
})();
