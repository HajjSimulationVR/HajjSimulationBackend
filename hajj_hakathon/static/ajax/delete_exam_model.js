
function get_pk_and_number(){
    var first_model_id = $('#first_model_id').val()
    var first_model_number = $('#first_model_number').val()

    var current_model_id = $('#current_model_id').attr('value')
    var current_model_number = $('#current_model_number').attr('value')
        console.log('current_model_id',current_model_id)
        console.log('current_model_number',current_model_number)
    if (current_model_id && current_model_id) {
        console.log('current_model_id',current_model_id)
        console.log('current_model_number',current_model_number)
        show_madal(current_model_id, current_model_number)
    } else{
        show_madal(first_model_id, first_model_number)
    };
    $(document).ajaxStart( function(){ $('#loading').show(); }).ajaxStop( function(){ $('#loading').hide(); });
}

function show_madal(pk, number){

    $("#deleteModal").show();
    $('#spn-elm-name').text('حذف نموذج رقم '+ number);
    $('#btn-modal-delete').unbind('click');
    $('#btn-modal-delete').click(function(){
        delete_model(pk);
    });
}

function delete_model(pk){
    $.ajax({
        url : url_delete_var,
        type : "POST",
        method:"post",
        data : { 'pk' : pk },
        success : function(json) {
            console.log(json)
            console.log(pk);
            $('#'+pk).hide();
            $('#model_id_delete').html('النموذج رقم ')
            console.log("exam model deleted successful");
            $("#deleteModal").hide();
            $(".modal-backdrop").remove();
            location.reload()
        },

        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>"+
            "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
            console.log(xhr.status + ": " + xhr.responseText);
            console.log(pk);
        }
    });
};
