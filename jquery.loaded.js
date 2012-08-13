// Content loaded
(function ($) {
    $.fn.loaded = function (options) {
        var
            defaults = {
                callback: function () { },
                // based on supported tags http://www.w3schools.com/jsref/event_onload.asp
                tags: ['frame','frameset','iframe','img','input[type="image"]','link','script','style']
            },
            settings = {};
        if ($.isFunction(options))
            settings = $.extend(defaults, { callback: options });
        else
            settings = $.extend(defaults, options);

        var items = $(settings.tags.join(), this);
        var itemsLength = items.length;
        var itemsLoaded = 0;
        items.each(function () {
            $(this).load(function () {
                if (++itemsLoaded == itemsLength) {
                    settings.callback();
                }
            });
        });
    };
})(jQuery);