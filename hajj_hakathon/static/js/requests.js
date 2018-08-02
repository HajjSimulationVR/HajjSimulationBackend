var resposeObject;
var checkPlanData = {};
var url;
var id ;

var stages = {};
var stage_id;
var installment_id;
var  installment_value;


$(".suggestedPlanContainer").hide();

$("#installmentPrice").click(function(){
  $(".suggestedPlanContainer").show();
});



// get the unit id 
url = window.location.pathname;
id = url.substring(url.lastIndexOf('/') + 1);

$("#editedPlan").hide();
$("#suggestedPlanAll").hide();

$("#editPlan").click(function(){
  console.log("click");
  $("#defaultPlan").hide();
  $("#editedPlan").show();
  $("#editPlan").hide();
});
// requst to get the default plan 
var data = JSON.stringify({
  "unit_id": id
});

$.ajax({
  url: '/plans/default_plan/',
  type: "POST",
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  data: data,
  success: function(data) {
    resposeObject = data;
    drawTable(data);


  },
  error: function(data){
    console.log("error to get default plan");
    console.log(data);
  }
});


///////////////////////////////////////////////

checkPlanData.unit_id  = id;



$('.suggestedPlanContainer').on('click','#comparePlanBtn', function (){
 $("#suggestedPlan input").each(function(index) { 
    stage_id = String($(this).attr('data-stage'));
    installment_id = String($(this).attr('data-installment'));
    installment_value = parseInt($(this).val());

    if (!stages[stage_id]) {
      stages[stage_id] = {};
    }
    stages[stage_id][installment_id] = {};
    stages[stage_id][installment_id] = installment_value;
 });

  checkPlanData.stages = stages;

  var JsonData = JSON.stringify(checkPlanData);
  sendPlan(JsonData);

});

$("#alternativePlans").hide();
// DATA: 
function sendPlan(data){
  $.ajax({
      url: '/plans/check_plan/',
      type: "POST",
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      data: data,
      success: function(response) {
        console.log("success", response);
        if (response.status == "Not accepted") {
          $("#default-plan-error").hide();
          $("#planStatus").html('<div class="alert alert-info" role="alert"> Un acceptable </div>');
          $("#alternativePlans").show();
          $("#suggestedPlanAll").show();
          console.log("response", response);
          drawAltTable(response.data);

        }else{
          $("#planStatus").html('<div class="alert alert-info" role="alert">  Acceptable </div>')
          $("#alternativePlans").hide();
          $("#default-plan-error").hide();
          $("#suggestedPlanAll").hide();
        }
      },
      error: function(data){
          console.log("error", data);
          $("#default-plan-error").show();
          $("#serverErrorInput").html(data.responseJSON.error_message)
          $("#planStatus").html("")
          $("#alternativePlans").hide();
          $("#suggestedPlanAll").hide();
      }
  });
}

/////////////////////////////////

function drawAltTable(data) {
  $("#alternativeData").empty();
  $("#radioForm").empty();
  for (var i = 0; i < data.length; i++) {
    drawAltRow(data[i]);
  }
}



// drawRows
function drawAltRow(rowData) {
  console.log("rowData", rowData);
  $("#alternativeData").append("<tr/>");

  for (var i = 0; i < rowData.length; i++) {
    $("#alternativeData").append($("<td data-object='" + JSON.stringify(rowData[i]) + "'>" + Number(rowData[i].cost).toLocaleString('en') + "</td>"));
  }


  $("#radioForm").append($('<tr><td class="radio" > <label> <input type="radio" name="optionsRadios" id="optionsRadios1" value="' + i + '" > </label></td></tr>'));
}





$('#alternativeData').on('click','td', function (){
  $(".isnta-head th").remove();
  $("#isntaData td").remove();

  var  instalDetailVar= $( this ).data("object").divided_by_with_cost;

  for (var i = 0; i < instalDetailVar.length; i++) {
    $(".isnta-head").append($("<th>" + instalDetailVar[i].divided_by + "</th>"));
    $("#isntaData").append($("<td>" + Number(instalDetailVar[i].cost).toLocaleString('en') + "</td>"));
  }
});





//////////////////////////////////

function drawTable(data) {
  console.log("drawHeader", data);
  for (var i = 0; i < data.length; i++) {
    drawRow(data[i]);
    drawHeader(data[i]);
  }
}

// drawHeader
function drawHeader(rowData) {
  $(".defaultPlanHead").append($("<th>" + rowData.name + "</th>"));
}

// drawRows
function drawRow(rowData) {
  $("#defaultPlanBody").append($("<td>" + Number(rowData.cost).toLocaleString('en')  + "</td>"));
}


