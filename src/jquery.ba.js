// A plugin for before/after images
// <div class="before-after" data-after="<img2 src>"><img src="<img1 src>" alt="before" /></div>
(function($) {
    var BeforeAfter = function(el, opts) {
        var settings = $.extend({}, $.fn.beforeafter.defaults, opts),
        $el = $(el), $after, max = 0;
        function init() {
            var img = $el.html();
            max = $el.width();
            $el.html('<div class="ba-canvas">' + img + '<div class="ba-after"></div><div class="ba-slide-wrap"><div class="ba-slide"></div></div></div>');
            $el.find('img').addClass('ba-before');
            $after = $el.find('.ba-after');
            $after.css({  backgroundImage:'url(' + $el.data('after') + ')', width:0 });
            $el.find('.ba-slide').slider({ max:max, min:0, slide:onSlide, value:max * .5, change:onSlide });
            img = new Image();
            img.onload = onImgLoad;
            img.src = $el.data('after'); 
            $el.find('.ba-canvas').click(onAfterClick);
        }
        function onImgLoad() {
            $el.find('img').show();
            $el.find('.ba-canvas').delay(500).fadeIn('normal');
            $el.find('.ba-slide-wrap').delay(1200).animate({ bottom:0 });
            $after.delay(800).animate({ width:max * .5 });
        }
        function onAfterClick(e) {
            var offset = $(this).offset();
            $el.find('.ba-slide').slider({ value:e.clientX - offset.left });
        }
        function onSlide(e, ui){
            $after.width(max - ui.value);
            if (ui.value === max) {
                $after.hide();
            } else if (!$after.is(':visible')) {
                $after.show();
            }
        }
        init();
    };
    $.fn.beforeafter = function(options) {
        return this.each(function(idx, el) {
            var $el = $(this), key = 'ba';
            if ($el.data(key)) { return; }
            var beforeafter = new BeforeAfter(this, options);
            $el.data(key, beforeafter);
        });
    };
    // default settings
    $.fn.beforeafter.defaults = {};
})(jQuery);
