function show_madal(pk,name){
    $("#deleteModal").show();
    $('#spn-elm-name').text('حذف '+ name);
    $('#btn-modal-delete').unbind('click');
    $('#btn-modal-delete').click(function(){
        delete_student_in_section(pk);
    });
}
function delete_student_in_section(pk){

    $.ajax({
        url : delete_student_in_section_url, 
        type : "POST", 
        method:"post",
        data : { 'pk' : pk }, 
        success : function(json) {
            console.log(json)
            console.log(pk);
            $("#deleteModal").hide();
            $('#post-'+pk).remove();

            count=parseInt($('#student_count').html()) -1
            $('#student_count').html(count)
            console.log("student  deleted successful from section ");
        },

        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>"+
            "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
            console.log(xhr.status + ": " + xhr.responseText); 
            console.log(pk);
        }
    });
};
