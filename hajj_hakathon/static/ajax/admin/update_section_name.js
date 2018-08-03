function edit_section(pk,name){
    $.ajax({
        url : edit_url, 
        type : "POST", 
        method:"post",
        data : { 'pk' : pk, 'name' : $("#txt-"+pk).val()}, 
        success : function(data) {
          $('#post-' + pk).find('.save-btn').hide();
          $('#post-' + pk).find('.edit-anchor').show();
          $('#post-' + pk).find('.edit-btn').show();
          $('#post-' + pk).find(".edit-input").hide();
          $("#spn-"+pk).html(data['name']).show();
          $("#txt-"+pk).val(data['name']).hide();
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); 
            console.log(pk);
        }
    });

};


 $(document).ready(function($){
    $('.edit-btn').click(function(){ 
    $(this).hide();
    $(this).closest('tr').find(".edit-input").show();
    $(this).closest('tr').find('.save-btn').show();
    $(this).closest('tr').find('.edit-anchor').hide();
    $(this).closest('tr').find('[id^="spn-"]').hide();
    });
  });
