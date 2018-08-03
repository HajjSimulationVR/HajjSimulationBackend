$(document).ready(function() {
        language = document.documentElement.lang 
        $('.selected_element').change(function(){
            $("#course_element_id").val($(this).val())
        })
        $('.questionBankSearchList').on('click', function(event){
            $('#questionBankSearchList').html('');

            searchdata = ($('#qsearch').serializeObject());
            searchdata["course_id"] = $.url('?course_id')
            $.ajax({
                url : '/question/bank/',
                type : "GET",
                data : searchdata,
                success : function(json) {
                    var questions = json;
                    if (questions.length!=0) {
                    // for(var i=0;i<questions.length;i++){
                    //     var question = item_builder(questions[i]['fields'],questions[i]['pk']);
                    //     $('#questionBankSearchList').append(question);
                    // }
                    $.each(json, function(key, value){
                        $.each(value, function(i){
                            description = value[i].description
                            id = value[i].id
                            question_type = value[i].question_type
                            exam_count = value[i].exam_count
                            var question = item_builder(description, id, question_type, exam_count);
                            $('#questionBankSearchList').append(question);
                        })
                    })
                    $('html,body').animate({
                        scrollTop: $("#questionBankSearchList").offset().top},
                        'slow');
                }
                
                else{
              $('#questionBankSearchList').html('<div class="alert alert-warning alert-dismissible noQuestionAlert" role="alert">لاتوجد نتائج للبحث</div>')
             };
         },
                error : function(xhr,errmsg,err) {

                }
            });

        });
    });
$('body').on('click', '#delete-icon', function(e){
    e.preventDefault();
    var pk = $(this).attr('data-pk');
    $('#delete_modal_button').attr("pk",pk)

    });
$('body').on('click', '#edit-icon', function(e){
    e.preventDefault();
    var pk = $(this).attr('data-pk');
    var url = $('.questions-list').attr('data-del');
    var crs_val = $('#course_level').val();
    url = url.replace('000',pk)+"?course_id="+crs_val;
    location.href = url;
    });

$('#delete_modal_button').click(function(){
        delete_bank_question($(this).attr('href'),$(this).attr('pk'));
});

var css_mapper = {
    'true-false':"true-false-type",
    'true-false-reason':"true-false-with-reason-type",
    'mcq-with-one-answer':"mcq-with-one-answer-type",
    'mcq-with-many-answers':"mcq-with-many-answers-type",
    'articles':"article-type",
}
var type_mapper = {
    'true-false':"true-false-type",
    'true-false-reason':"true-false-with-reason-type",
    'mcq-with-one-answer':"mcq-with-one-answer-type",
    'mcq-with-many-answers':"mcq-with-many-answers-type",
    'articles':"article-type",
}

var type_name_mapper = {
    'true-false':"صح أو خطأ",
    'true-false-reason':"صح أوخطأ مع السبب",
    'mcq-with-one-answer':"إختيار من متعدد",
    'mcq-with-many-answers':"إختيارات متعددة",
    'articles':"مقال"
}
function item_builder(description, pk, question_type, exam_count){
    var item = ['<li class="questions-item text-center" id="list_question_pk_' +pk+ '">'];
    item.push('<div class="col-md-4 col-sm-4 col-xs-4">');
    item.push('<a href="/' + language + '/question/bank/view/'+ pk +'?type_question='+ type_mapper[question_type] +'" class="question-name pull-right">');
    item.push(description);
    item.push('</a></div>');
    item.push('<input type="hidden" value='+exam_count+'>') 
    item.push('<div class="col-md-4 col-sm-4 col-xs-4">');
    item.push('<p class="question-type '+css_mapper[question_type]+'">');
    item.push(type_name_mapper[question_type]);
    item.push('</p>');
    item.push('</div>');
    item.push('<div class="col-md-4 col-sm-4 col-xs-4">');
    item.push('<p class="pull-left">');
    item.push('<i class="fa fa-ellipsis-h"></i>');
    item.push('<div class="pull-left question-setting" >');
    item.push('<a href="#" data-pk ="'+pk+'" id="edit-icon" class="wow fadeInDown edit-icon"');
    item.push(' data-wow-duration="0.5s">');
    item.push('<i class="fa fa-pencil fa-1x"></i>');
    item.push('</a>');
    if (exam_count===0) {
    item.push('<a href="#" data-pk ="'+pk+'" data-toggle="modal" id="delete-icon" data-target="#deleteModal" ');
    item.push('class="wow fadeInDown delete-icon"');
    item.push('data-wow-duration="0.3s">');
    item.push('<i class="fa fa-trash-o fa-1x"></i>');
    item.push('</a>')
    item.push('</div>');
    item.push('</p>');
    item.push('</div>');
    item.push('</li>');
    };
    return item.join(' ');
    };


function delete_bank_question(delete_url,pk){
    $.ajax({
    url : delete_url,
    type : "POST",
    method:"post",
    dataType: 'json',
    data : { 'pk' : pk },
    success : function(json) {
        $('#list_question_pk_'+pk).remove();
        $('#delete_modal_button').attr("pk","");
        $('#deleteModal').modal('toggle');
    },

    error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText);
        console.log("error when removing element");
        }
    });
}
