
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PlansController', PlansController);

  function PlansController($scope, GetDefaultPlans, CheckPlan, CheckCouponService, $timeout, $filter, submitSelectedPlan, invitePeopleService, $window) {
    var vm = this;
    var url = window.location.pathname;
    var id = url.split('/')[3];
    vm.checkPlan = checkPlan;
    var stages = {};
    var stage_id;
    var installment_id;
    var installment_value;
    var plans;
    var couponStages;
    vm.checkCoupon = checkCoupon;
    vm.checkOut = checkOut;
    vm.suggestedCheckOut = suggestedCheckOut;
    vm.defaultPlan =true;
    vm.suggestedPlanShow = false;
    vm.selectedplan = [];
    vm.SelectedPlanShow =false;
    vm.addPeople = addPeople;
    vm.selectBtn = false;
    vm.checkBtn = true;
    vm.submitPlan = submitPlan;
    vm.invitePeopleService = invitePeopleService;
    vm.print = print;
    vm.invite = [];
    vm.showloader = true;
    vm.BackDefaultPlant = BackDefaultPlant;

    var InvitedPeopleArr = [];
    InvitedPeopleArr.push("");
    vm.invitePeople = InvitedPeopleArr;

    activate();

    function activate() {
      GetDefaultPlans.getPlan(id).then(function (data) {

        angular.forEach(data, function(element) {
          console.log(element);
          angular.forEach(element.plan, function(el) {
            var NewNum = $filter('number')(el.cost, );
            el.cost = NewNum;
          });
        });
        vm.DefultPlan = data;
        plans = data;
        vm.showloader = false;
        console.log("DefultPlan", data);
      })
    }

    function BackDefaultPlant(){
      console.log("BackDefaultPlant");
      vm.DefultPlan = plans;
      vm.selectBtn = false;
      vm.statusCallout = false;
    }


    // check plan function
    function checkPlan(planID, index){
      console.log("DefultPlan", data);
      var data = {
        "unit_id": id,
        "plan_id": planID
      }

      stages = {};
      angular.forEach(vm.DefultPlan[index].plan, function(stage) {
        if (!stages[stage.stage_id]) {
          stages[stage.stage_id] = {};
        }

        var currency = stage.cost;
        stages[stage.stage_id][stage.id] = parseInt(currency.replace(/[^0-9\.-]+/g,""));
        console.log("stages", stages);
      });

      var data = {
        "unit_id": id,
        "plan_id": planID,
        stages
      }

      console.log("data", data);
      vm.showloader = true;


      CheckPlan.check(data).then(function (response) {
        console.log("response", response);
        console.log("response.status", response.status);
        vm.DefultPlan = [vm.DefultPlan[index]];
        vm.selectedplan = response.data;
        vm.status = response.status;
        vm.statusCallout = true;

        if (response.status == "Accepted" ) {
          vm.selectBtn = true;
          vm.checkBtn = false;
          vm.DefultPlan = [plans[index]];
          vm.suggestedPlanShow = false;
        }else if  (response.status == "You can't enter a negative value!"){
          vm.suggestedPlanShow = false;
        } else if  (response.status == "You can't enter an empty value!"){
          vm.suggestedPlanShow = false;
        }else{
          vm.suggestedPlans = response.data;
          vm.suggestedPlanShow = true;

          angular.forEach(response.data, function(element) {
            angular.forEach(element, function(el) {
              var NewNum = $filter('number')(el.cost,);
              console.log("NewNum", NewNum)
              el.cost = NewNum;
            });
          });
        }
        vm.showloader = false;
      })
    }


    // check coupon function
    function checkCoupon(planID, index){
      console.log("vm.coupon", vm.coupon);

      stages = {};
      angular.forEach(vm.DefultPlan[index].plan, function(stage) {
        if (!stages[stage.stage_id]) {
          stages[stage.stage_id] = {};
        }
        var currency = stage.cost;
        stages[stage.stage_id][stage.id] = parseInt(currency.replace(/[^0-9\.-]+/g,""));
      });

      var data = {
        "unit_id": id,
        "plan_id": planID,
        "coupon": vm.coupon,
        "is_cash": "False",
        stages
      }

      console.log("coupon data", data);

      CheckCouponService.check(data).then(function (response) {
        console.log("data coupon", response);
        vm.couponCallout = response.status;

        if (response.status === 'Accepted' ) {

          vm.couponedPlansShow = true;
          vm.defaultPlan =false;
          vm.suggestedPlanShow = false;

          angular.forEach(response.data, function(element) {
            angular.forEach(element, function(el) {
              var NewNum = $filter('number')(el.cost,);
              console.log("NewNum", NewNum)
              el.cost = NewNum;
            });
          });

          vm.couponedPlans = response.data;

          // setTimeout(function(){
            // angular.element('.modal').modal('toggle');
            angular.element('.couponModal').modal('hide');
          // }, 3000);

        }
      });
    }

    // checkout function
    function checkOut(planID, index, after){
      vm.statusCallout = false;
      vm.SelectedPlanShow =true;
      vm.couponedPlansShow = false;
      vm.defaultPlan = false;
      vm.suggestedPlanShow = false;

      console.log("after", after);
      if(after){
        console.log("after inside fucntion");
        vm.selectedplan = vm.couponedPlans[index];
        console.log("selectedplan", vm.selectedplan);
      }

      console.log("vm.selectedplan", vm.selectedplan);

      if (!after) {
        $('#myModal').modal('hide');
        $('.modal-backdrop').hide();
      }
    }

    // suggested plan checkout function
    function suggestedCheckOut(planID, index, after){
      vm.statusCallout = false;
      vm.SelectedPlanShow =true;
      vm.couponedPlansShow = false;
      vm.suggestedPlanShow = false;
      vm.defaultPlan = false;

      var plans = vm.suggestedPlans;

      vm.selectedplan = [plans[index]][0];
      console.log("vm.selectedplan", vm.selectedplan);

      if (!after) {
        $('#myModal').modal('hide');
        $('.modal-backdrop').hide();
      }
    }

    // submit final plan
    function submitPlan(){
      vm.submitData.plan.fullPlan = vm.selectedplan;
      vm.submitData.client = angular.element('#clientID').val();
      vm.submitData.unit = id;
      submitSelectedPlan.send(vm.submitData).then(function (response) {
        console.log("response", response);
      });

      invitePeople();
      console.log("user.submit", vm.submitData);
      console.log("vm.invite", vm.invite );
      // $window.location.href = '/missions/dashboard'
    }

    function addPeople(){
      InvitedPeopleArr.push("");
    }

    function invitePeople(){

      angular.forEach(vm.invite, function(element) {
        console.log("vm.invite element", element);
        element.recommonded_by = angular.element('#clientID').val();
      });

      console.log("the vm.invite", vm.invite);

      invitePeopleService.send(vm.invite).then(function (response) {
        console.log("response", response);
      });
    }

    function print(){
      window.print(); 
    }
  }
})();
