
(function () {
  'use strict';

  angular
    .module('app')
    .controller('FinalPlanController', FinalPlanController);

  function FinalPlanController($scope, allPlansService, planDetailsService, updateSelectedPlan) {
    var vm = this;
    vm.aliuser = "the man";
    vm.unitDetails = unitDetails;
    vm.showPlanDetails = false;
    vm.showPlansList = true;
    vm.submitData = {};
    vm.submitPlan = submitPlan;

    allPlansService.getData().then(function(data){
      console.log("this request is succesd");
      vm.unitsList = data.results;
    })

    function unitDetails(unitID, clientID){
      console.log("unitDetails");

      planDetailsService.getData(unitID, clientID).then(function(data){
        console.log("data-------", data);
        console.log("data.results.plan.fullPlan;", data.results[0].plan.fullPlan);
        vm.showPlanDetails = true;
        vm.showPlansList = false;

        vm.selectedplan = data.results[0].plan.fullPlan;
        vm.selected = data.results[0].plan.selectedplan;
        vm.unit_state = data.results[0].unit_state;
        vm.deposited = data.results[0].deposited;
        vm.pk = data.results[0].pk;
        console.log("vm.pk", vm.pk);
      })
    }

    function submitPlan(unit_state, pk){
      console.log("submitPlan");

      updateSelectedPlan.send(unit_state, pk).then(function (response) {
        console.log("response", response);
      });
    }

  }
})();
