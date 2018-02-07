$(document).ready(function() {
    $("#left-menu").mmenu({
        // options
        "extensions": [
            "pagedim-black"
        ]
    }, {
        // configuration
        offCanvas: {
            pageSelector: "#page-content"
        }
    });
    $("#right-menu").mmenu({
        // options
        "extensions": [
            "position-right",
            "pagedim-black"
        ]
    }, {
        // configuration
        offCanvas: {
            pageSelector: "#page-content"
        }
    });
});
