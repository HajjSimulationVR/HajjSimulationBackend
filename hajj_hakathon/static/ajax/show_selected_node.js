$(function(){

    $('#course_level').ready(function(){
        var id_selected = $('#course_level option:selected');
        var id_target = $("#divisions_level");

        id_target.empty()
        $('#chapter_level').empty()
        $('#unit_level').empty()
        $('#lesson_level').empty()

        add_division(id_selected, id_target)
        });

    $('#course_level').change(function(){
        localStorage['current_model_id'] = null;
        var id_selected = $('#course_level option:selected');
        var id_target = $("#divisions_level");
        $('#selected_element_error').hide();

        id_target.empty()
        $('#divisions_level').hide()
        $('#chapter_level').empty()
        $('#chapter_level').hide()
        $('#unit_level').empty()
        $('#unit_level').hide()
        $('#lesson_level').empty()
        $('#lesson_level').hide()
        add_division(id_selected, id_target)
        });

    $('#divisions_level').change(function(){
        var id_selected = $('#divisions_level option:selected');
        var id_target = $("#chapter_level");
        $('#selected_element_error').hide();

        id_target.empty()
        $('#chapter_level').hide()
        $('#unit_level').empty()
        $('#unit_level').hide()
        $('#lesson_level').empty()
        $('#lesson_level').hide()

        add_elemnet(id_selected, id_target)
    });

    $('#chapter_level').change(function(){
        var id_selected = $('#chapter_level option:selected');
        var id_target = $("#unit_level");
        $('#selected_element_error').hide();
        id_target.empty()
        $('#unit_level').hide()
        $('#lesson_level').empty()
        $('#lesson_level').hide()

        add_elemnet(id_selected, id_target)
    });

    $('#unit_level').change(function(){
        var id_selected = $('#unit_level option:selected');
        var id_target = $("#lesson_level");
        $('#selected_element_error').hide();

        id_target.empty()
        $('#lesson_level').hide()
        add_elemnet(id_selected, id_target)
    });

    $('#lesson_level').change(function(){
        var id_selected = $('#lesson_level option:selected');
        $('#selected_element_error').hide();
        get_last_element(id_selected)
    });

function add_elemnet(id_selected, id_target){

    var division_selected_id = $(id_selected).attr("id");

    $.ajax({
        url : '/question/selected_node/',
        type : 'GET',
        data : {'pk': division_selected_id},

        success : function(json){
            if (json != null) {
            $(id_target).show();
            var options = {
              'chapter': 'الأبواب',
              'unit': 'الوحدات',
              'lesson': 'الدروس'
            }
            var option = options[json[0].fields.element_type]
            $(id_target).append('<option selected disabled  >' +  option + '</option>')

                var number_of_nodes = json.length ;
                for (i=0; i<number_of_nodes; i++){
                    var selected_element = json[i].fields.name;
                    var selected_element_id = json[i].pk
                    $(id_target).append
                                        ('<option value="'+selected_element_id+ '" id= "' + selected_element_id + '">'
                                            +selected_element+'</option>');
                }
            }

        },
        error : function(xhr,errmsg,err) {
          console.log('error happened in add element');
        }
    });
};

function add_division(id_selected, id_target){
    var division_selected_id = $(id_selected).attr("id");

    $.ajax({
        url : '/question/selected_node/',
        type : 'GET',
        data : {'course_pk': division_selected_id},

        success : function(json){
            if (json != null) {
            $(id_target).show();
            var option = 'الأقسام'
            $(id_target).append('<option selected disabled  >' +  option + '</option>')
                var number_of_nodes = json.length ;
                for (i=0; i<number_of_nodes; i++){
                    var selected_element = json[i].fields.name
                    var selected_element_id = json[i].pk
                    $(id_target).append
                                        ('<option value="'+selected_element_id+ '" id= "' + selected_element_id + '">'
                                            +selected_element+'</option>');
                }
            };
        },
        error : function(xhr,errmsg,err) {
          console.log('error happened in add division');
      }
    });
};
// hadeel : need to discuss it
function get_last_element(id_selected){
     var lesson_selected_id = $(id_selected).attr("id");

    $.ajax({
        url : '/question/selected_node/',
        type : 'GET',
        data : {'last_selected_id': lesson_selected_id},

    });
  };


});
