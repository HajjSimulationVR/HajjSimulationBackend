function show_madal(pk,name){
    $("#deleteModal").show();
    $('#spn-elm-name').text('حذف '+ name);
    $('#btn-modal-delete').unbind('click');
    $('#btn-modal-delete').click(function(){
        delete_section(pk);
    });
}
function delete_section(pk){
    // alert('hi');
    $.ajax({
        url : url_var, 
        type : "POST", 
        method:"post",
        data : { 'pk' : pk }, 
        success : function(json) {
            console.log(json)
            console.log(pk);
            $("#deleteModal").hide();
            $('#post-'+pk).remove();
            console.log("section deleted successful");
        },

        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>"+
            "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
            console.log(xhr.status + ": " + xhr.responseText); 
            console.log(pk);
        }
    });
};

  $("button.close").click(function() {
    $('#deleteModal').modal('toggle');
  });
