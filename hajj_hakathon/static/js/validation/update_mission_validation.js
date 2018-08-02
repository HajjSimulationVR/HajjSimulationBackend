$(document).ready(function(){
    $('#update_assigned_mission-form').validate({
        rules: {
            "actual_percentage": {
                number: true,
                min: 0,
                max: 100
            },
            "actual_quantity": {
                number: true,
                min: 0
            },
        }

    });
});
