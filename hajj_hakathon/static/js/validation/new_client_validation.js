$(document).ready(function(){
    $('#add_client_popup-form').validate({
        rules: {
            "name": {
                required: true,
            },
            "mobile": {
                required: true,
            },
            "area_from": {
                // required: true,
                min: 0
            },
            "area_to": {
                // required: true,
                min: 0
            },
            "level": {
                // required: true,
                min: 0
            },
            "bathrooms": {
                // required: true,
                min: 0
            },
            "rooms": {
                // required: true,
                min: 0
            },
            "reception": {
                // required: true,
                min: 0
            },
        }

    });
});
