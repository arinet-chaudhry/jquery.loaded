// Content loaded
(function ($) {
    $.fn.loaded = function (options) {
        var
            defaults = {
                callback: function () { },
				// tags to monitor
                tags: ['frame','frameset','iframe','img','input[type="image"]','link','script','style'],
				// events to monitor by tag
				//	based on supported tags http://www.w3schools.com/jsref/event_onload.asp
				load: ['frame','frameset','iframe','img','input[type="image"]','link','script','style'],
				//	based on supported tags http://www.w3schools.com/jsref/event_onerror.asp
				error: ['img','object','script','style']
            },
            settings = {};
        if ($.isFunction(options))
            settings = $.extend(defaults, { callback: options });
        else
            settings = $.extend(defaults, options);

        var items = $(settings.tags.join(), this);
        var itemsLength = items.length;
        var itemsLoaded = 0;
        var callback = function () {
            if (++itemsLoaded == itemsLength) {
                settings.callback();
            }
        };

        items.each(function () {
			$this = $(this);
			if ($.inArray(this.tagName, settings.load) >= 0) { $this.load(callback); }
			if ($.inArray(this.tagName, settings.error) >= 0) { $this.error(callback); }
        });
    };
})(jQuery);