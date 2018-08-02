$(document).ready(function(){
    $('#searchwithclient-form').validate({
        rules: {
            "price_from": {
                number: true,
                min: 0
            },
            "price_to": {
                number: true,
                min: 0
            },
            "area_from": {
                number: true,
                min: 0
            },
            "area_to": {
                number: true,
                min: 0
            },
            "level": {
                number: true,
                min: 0
            },
            "bathrooms": {
                number: true,
                min: 0
            },
            "rooms": {
                number: true,
                min: 0
            },
            "reception": {
                number: true,
                min: 0
            },
        }

    });
});
