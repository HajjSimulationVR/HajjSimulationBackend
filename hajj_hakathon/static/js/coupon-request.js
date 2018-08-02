

function check_coupon(id){
  $('.callout').hide();

  var data = {
    "unit_id": id,
    "coupon": $('#couponValue').val(),
    "is_cash": "True",
  }

  $.ajax({
      url: '/promo_code/check_coupon/',
      type: "POST",
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      headers: {"Authorization": 'Token ' + $("#authToken").val()},
      success: function(response) {
        if (response.status === 'Accepted') {
          $(".couponModal").append('<div class="callout callout-success">Coupon has been added successfully</div>');
          $(".department-cost").html(response.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          console.log("check_coupon success", response);
          setTimeout(function(){
            $('#myModal').modal('toggle');
          }, 3000);
        }else{
          $(".couponModal").append('<div class="callout callout-danger">' + response.status + '</div>');
        }

      },
      error: function(data){
        console.log("check_coupon error", data);
      }
  });
}