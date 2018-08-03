$(document).ready(function() {
    $('#delete-icon').on('click', function(){
        var pk = $(this).attr('data-pk')
        $("#deleteModal").show();
        $('#delete_modal_button').unbind('click');
        $('#delete_modal_button').click(function(){
            delete_element(pk);
        });
    });
});

function delete_element(pk){

    var url ="/en/question/delete/"
    var course_id = $.url('?course_id')
    var current_url =  '/question/bank/?course_id='+course_id
    $.ajax({
        url : url, 
        type : "POST", 
        method:"post",
        data : { 'pk' : pk }, 
        success : function() {
            $("#deleteModal").hide();
            $('#deleteModal').modal('toggle');
            window.location = current_url
        },

        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText); 
        }
    });
};
