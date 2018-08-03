
$(function() {
  $('#search_for_course').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  // sanity check
    search_courses();
    });
})

function search_courses() {
  search_input = $("#search-input").val()
  console.log('search_input', search_input)
  $.ajax({
    url : search_url, // the endpoint
    type : "GET", // http method
    data : {search_input: search_input},
    // handle a successful response
    success : function(data) {
        
       if (data["already_exists"]){
            if ($("#teacher_obj").val()){
                $('.table-striped').html('<div class="alert alert-warning alert-dismissible noQuestionAlert" role="alert">هذا المقرر مضاف بالفعل لهذا العضو</div>');
              }
              else{
                if ($("#student_obj").val()){
                $('.table-striped').html('<div class="alert alert-warning alert-dismissible noQuestionAlert" role="alert">هذا المقرر مضاف بالفعل لهذا الطالب</div>');
              }

              }
        }
      else if (data["not_found"]){
                $('.table-striped').html('<div class="alert alert-danger alert-dismissible noQuestionAlert" role="alert">هذا المقرر غير موجود</div>');
        }
       else{
           $('.result').html(data);  
       }
    },
    // handle a non-successful response
    error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more 
    }
  });
}


function add_section_to_student(section_id) {
    var section_obj = section_id
    var student_obj = $('#student_obj').val()
    console.log("student_obj", student_obj)
    console.log("section_obj", section_obj)

    $.ajax({
        url : add_url, 
        type : "POST",
        data : {section: section_obj, student : student_obj},
        success : function(json) {
            console.log(json);
            window.location = new_url
        },
        error : function(xhr,errmsg,err) {
        }
    });
}; 
