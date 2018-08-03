$(function() {
  $('#get_form').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  // sanity check
    search_exams();
    });
  function search_exams() {
    var translated = {
      'last': 'الدرجه الاخيره',
      'average': 'متوسط الدرجات',
      'greatest': 'اكبر درجه'
    }
    var title = $('#title').val();
    course_id = $('#course_level option:selected').attr('id')
    console.log('title', title)
    $.ajax({
      url : "/exams/", // the endpoint
      type : "GET", // http method
      data : {title : title, course_id:course_id},// data sent with the post request

      // handle a successful response
      success : function(json) {
          $('#title').val(''); // remove the value from the input
          console.log(json); // log the returned json to the console
          console.log('success')
          var str = eval(json);
          $('#results').empty()
          $.each(json, function(key, value){
              $('#template').tmpl(value).appendTo("#results");
            console.log(key , '-------------' , value);
            console.log('length', value.length);
            if (value.length>0) {
              // $.each(value, function(i){
              //   console.log(value[i].header)
              // $('#results').empty()
              // $('#exam_name').html(value[i].header)
              // $('#success_percentage').html(value[i].sucess_percentage+'%')
              // $('#no_of_models').html(value[i].no_of_models)
              // $('#degree_calculation').html(translated[value[i].degree_calculation])
              // $('#created_by').html(value[i].created_by)
              // $('#duration').html(value[i].duration+'دقيقه')
              // $('#no_of_questions').html(value[i].no_of_questions)

              //});//value
            } else{
              $('#results').html('<div class="alert alert-warning alert-dismissible noQuestionAlert" role="alert">لاتوجد نتائج للبحث</div>');
            };
          });
          $.each(json, function(key, value){
              $("#results").after($('#modaltmpl').tmpl(value));
              assign_ajax()
            });
      },

      // handle a non-successful response
      error : function(xhr,errmsg,err) {
              $('#loading').hide();

          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more 
      }
    });
  }

})

function assign_ajax(){
    $('.datetimepicker').datetimepicker({
      format: "DD/MM/YYYY HH:mm"
    });
        $('.selectpicker').multiselect({
      nonSelectedText: "اختر المجموعة",
      allSelectedText: "كل المجموعات"
    });
    $('.datepicker').datepicker({
      format: "dd/mm/yyyy"
    });
    $('.year-picker').datepicker({
      startView: 2,
      minViewMode: 2,
      keyboardNavigation: false,
      forceParse: false
    });
    $('a.info-icon').click(function(event){
      event.preventDefault();
    });
    $('#aboutExamForm').validate({
      rules: {
        sections: "required",
      },
      ignore: ':hidden:not("#section_id")',
    });

    $('.groupModal').each(function(){
      var exam_id = $(this).find('#exam_id').val();
      $('#time_limited-'+exam_id).click(function(){
        $('#timePicker-'+exam_id).show();
        $('#start_date-'+exam_id).attr('required', true);
        $('#end_date-'+exam_id).attr('required', true);
        $('#id_limited-'+exam_id).val('true');
      });
      $('#time_unLimited-'+exam_id).click(function(){
        $('#timePicker-'+exam_id).hide();
        $('#start_date-'+exam_id).removeAttr('required');
        $('#end_date-'+exam_id).removeAttr('required');
        $('#end_date-'+exam_id).val(''); 
        $('#id_limited-'+exam_id).val('false');
      });
      if($('#time_limited-'+exam_id).hasClass('active')){
        $('#timePicker-'+exam_id).show();
        $('#start_date-'+exam_id).attr('required', true);
        $('#end_date-'+exam_id).attr('required', true);
        $('#id_limited-'+exam_id).val('true');
      }
      else if($('#time_unLimited-'+exam_id).hasClass('active')){
        $('#timePicker-'+exam_id).hide();
        $('#start_date-'+exam_id).removeAttr('required');
        $('#end_date-'+exam_id).removeAttr('required');
        $('#id_limited-'+exam_id).val('false');
      }
      var date = new Date().toLocaleString();
      var start_date = $('#start_date-'+exam_id).val();
      if(start_date){
        if(date>start_date){
        $('#start_date-'+exam_id).attr('disabled', true);
        }
      }
    });
  $('.time_unLimited').click(function(){
    $(this).closest('.group-modal-form').find('.timePicker').hide();
  });
  }
