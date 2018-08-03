function get_element_pk(pk){
    $("#deleteModalEXamUpdate").show();
    $('#btn-modal-delete').unbind('click');
    $('#btn-modal-delete').click(function(){
        delete_exam_element(pk);
    });
}

function delete_exam_element(pk){
    // alert('hi');
    $.ajax({
        url : url_var, 
        type : "POST", 
        method:"post",
        data : { 'pk' : pk }, 
        success : function(json) {
            console.log(json)
            console.log(pk);
            $('#'+pk).hide();
            console.log("exam element deleted successful");
            $("#deleteModal").hide();
            $("#deleteModalEXamUpdate").modal('toggle');
            $('#'+ pk).remove()
            // location.reload()
        },

        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>"+
            "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
            console.log(xhr.status + ": " + xhr.responseText); 
            console.log(pk);
        }
    });
};
