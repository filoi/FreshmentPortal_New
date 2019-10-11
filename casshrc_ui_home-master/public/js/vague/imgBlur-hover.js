(function ($) {
	"use strict";
	var imgWrapp = $(".img-wrapper");
	imgWrapp.each(function(){
		var vague = $(".img-blur").Vague({intensity:2});
		$(this).on("mouseenter", function() {
			vague.blur();
			return false;
		});
		$(this).on("mouseleave", function() {
			vague.unblur();
			return false;
		});
	});
}(jQuery));