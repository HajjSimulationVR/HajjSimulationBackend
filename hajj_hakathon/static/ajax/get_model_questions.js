    $(function() {

        var current_model_id = $('.model_link').first().attr('id');;
        if (localStorage['current_model_id']!=="null")
            current_model_id = localStorage['current_model_id'];

       // --------select_box---------
         course_id = $('#course_id').attr('value')
        $('#course_level>option[value="' + course_id + '"]').prop('selected', true);
        $('#course_level').attr("disabled", "disabled");
       //----------------get_questions-----------
        model_num = $('.model_link').first().attr('id');
        first_anchor = $('.model_link').first();
        first_anchor.addClass('active');
        if (current_model_id){debugger;
            $('.model_link').removeClass('active');
            $("#"+current_model_id).addClass('active');
            $("#current_model").html($("#"+current_model_id).data('number'));
            get_questions(current_model_id);
        }
        else
        {
            var current_model_id = model_num;
            get_questions(model_num);    
        }
        
        $('.model_link').click(function(event){
            event.preventDefault();
             model_id = $(this).attr('id')
             localStorage['current_model_id'] = model_id;
             model_number = $(this).data('number')
             model_time = $(this).data('time')
            $('.model_link').removeClass('active');
            $(this).addClass('active');
            $('#model_id_delete').html('النموذج رقم'+ model_number)
            $('#btn-modal-delete').attr('href','#'+ model_id)
            $('#current_model_id').attr('value', model_id)
            console.log($('#current_model_id').attr('value'))
            $('#current_model_number').attr('value', model_number)
            $('#model_time').html(model_time + 'دقيقه')
            get_questions(model_id);
        });
//when refersh page current_model_id, current_model_number value was un defined so,solving is 
        active_model_id=$('.model_link.active').attr('id')
        $('#current_model_id').attr('value', active_model_id)
        active_model_number = $('.model_link.active').data('number')
        console.log('active_model_id', active_model_id)
        $('#current_model_number').attr('value', active_model_number)
        console.log('active_model_number', active_model_number)

    });

$(document).ajaxStart( function(){$('#disablingDiv').show();}).ajaxStop( function(){ $('#disablingDiv').hide(); });
