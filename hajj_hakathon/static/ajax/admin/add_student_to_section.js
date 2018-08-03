$(function() {
    $('#post-form').on('submit', function(event){
        event.preventDefault();
        console.log("form submitted!")  // sanity check
        add_student_to_section();
    });
});
function add_student_to_section() {
    console.log("create post is working!") // sanity check
    var student_obj = $('#student_obj').val()
    var section_obj = $('#section_obj').val()
    $.ajax({
        url : add_url, 
        type : "POST",
        data : {student : student_obj, section: section_obj },
        success : function(json) {
            console.log(json);
        },
        error : function(xhr,errmsg,err) {
        }
    });
}; 
