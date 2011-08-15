var APP = (function($){
    var app = {};
    app.init = function() {
        $('.before-after').beforeafter();
    };
    $(app.init);
    return app;
} (jQuery));
