jquery.loaded
=============

jQuery plugin for performing onload handling of dynamic content.

Example usage:
-------------

```js
(function ($) {
	$(window).load(function() {
		$('#container').load('loaded.html', function() {
			$(window).load(function() {
				alert('this will not fire');
			});
			$('#container').loaded(function() {
				alert('this will fire');
			});
		});
	});
})(jQuery);
```

Also see the sample.html for additional examples.

Manner behind the madness:
-------------

The jQuery event for window.load() only fires on the initial load and doesn't take into account AJAX calls. When implementing <a href="http://flexslider.woothemes.com/">FlexSlider</a> or other UI related functionality that requires images to be loaded, this plugin can be used instead.