// Content loaded
(function ($) {
    $.fn.loaded = function (options) {
        var
            defaults = {
                callback: function () { },
                    // tags to monitor
                    tags: ['frame','frameset','iframe','img','input[type="image"]','link','script','style'],
                    // events to monitor by tag
                    //     based on supported tags http://www.w3schools.com/jsref/event_onload.asp
                    load: ['frame','frameset','iframe','img','input[type="image"]','link','script','style'],
                    //     based on supported tags http://www.w3schools.com/jsref/event_onerror.asp
                    error: ['img','object','script','style']
            },
            settings = {};
        if ($.isFunction(options))
            settings = $.extend(defaults, { callback: options });
        else
            settings = $.extend(defaults, options);

          this.each(function() {
               var self = this;
               var items = $(settings.tags.join(), self);
               var itemsLength = items.length;
               var itemsLoaded = 0;
               var complete = false;
               var callback = function () {
                    if (++itemsLoaded >= itemsLength && !complete) {
                         settings.callback.call(self);
                         complete = true;
                    }
               };
     
               items.each(function () {
                    $this = $(this);
                    var tagName = this.tagName.toLowerCase();
                    if ($.inArray(tagName, settings.load) >= 0) {
                         $this.one('load', callback);
                         if (
                              (typeof this.complete != "undefined" && this.complete) ||
                              (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6)
                              ) {
                              $this.trigger('load');
                         }
                    }
                    if ($.inArray(tagName, settings.error) >= 0) {
                         $this.one('error', callback);
                    }
               });
               $(window).one('load', function() {
                    if (!complete) {
                         settings.callback.call(self);
                         complete = true;
                    }
               });
          });
    };
})(jQuery);