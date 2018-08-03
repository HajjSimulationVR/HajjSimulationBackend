
$(function() {
  $('#get_student').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  // sanity check
    search_students();
    });
})
  function search_students() {
    search_text = $("#search_text").val()
    console.log('search_text', search_text)
    $.ajax({
      url : search_url, // the endpoint
      type : "GET", // http method
      data : {search_text: search_text},
      // handle a successful response
      success : function(json) {
          console.log(json); // log the returned json to the console
          console.log('success');
          if(json["already_exists"]){
            $('#results').html('<div class="alert alert-warning alert-dismissible noQuestionAlert" role="alert">هذا الطالب موجود بالفعل فى هذا السكشن</div>');
            $('#new_student').removeClass('hide');
            $('#results').append($('#new_student'));
          }
          else{
            $('#results').empty()
            $.each(json, function(key, value){
              console.log('-------------' , value);
              console.log('length', value.length);

              if (value.length>0) {
                $('#template').tmpl(value).appendTo("#results");
              }else{
                $('#results').html('<div class="alert alert-warning alert-dismissible noQuestionAlert" role="alert">لاتوجد نتائج للبحث</div>')
                $('#new_student').removeClass('hide')
                $('#results').append($('#new_student'))
              };
            });
          }
         

      },
      // handle a non-successful response
      error : function(xhr,errmsg,err) {
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more 
      }
    });
  }
$(document).on('click', 'button#add', function(e) {
  $(this).closest('tr');
  student_id = $(this).closest('tr').find('.student_id').val();
  // $('.student_id').val(student_id)
  add_student_to_section();
});
function add_student_to_section() {
    var student_obj = student_id
    var section_obj = $('#section_obj').val()
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
