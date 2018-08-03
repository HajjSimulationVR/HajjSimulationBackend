$(function() {
  $('#update_exam_form').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  // sanity check  
        update_exam()
    });
})
function update_exam(){
    pk = $('#exam_id').val()
    url = "/en/exams/update-duration/"+pk+'/';
    duration = $('#single-input').val();
    $.ajax({
        url : url, 
        method:"PUT",
        data : { 'duration' : duration }, 
        success : function(json) {
            console.log(json)
            console.log(pk);
            console.log("exam update successfully");
            $('#changeTimeModal').modal('hide')
            location.reload();
        },
        error : function(xhr,errmsg,err) {
            $('#duration_error').html("يجدب ادخال الوقت بصورة (دقائق) فقط");
        }
    });
};
