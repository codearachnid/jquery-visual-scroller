/**
 * visualScrollbar jQuery plugin
 */
!function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
}(this, function($) {
    'use strict';

    var defaults = {
        	classSlider: 'visualScrollbar',
        	classSelector: 'slider',
        	offsetTop: 1,
        	delayFade: 500
        };

    function visualScrollbar ( element, options ) {
    	this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this.init();
    }

    visualScrollbar.prototype = {
        init: function () {
        	this.setup();
        },
        setSelectorPosition: function(distance){
        	distance = distance || this.settings.offsetTop;
        	return $(this.element).siblings( '.' + this.settings.classSlider ).find( '.' + this.settings.classSelector ).css({ top: distance });
        },
        setSelectorHeight: function(){
        	var element = $(this.element);
        	var elementHeight = element.height();
        	return element.siblings( '.' + this.settings.classSlider ).find( '.' + this.settings.classSelector ).height( ( elementHeight / element[0].scrollHeight ) * elementHeight + 'px' );
        },
        showSlider:function(){
        	return $(this.element).siblings( '.' + this.settings.classSlider ).fadeIn('fast');
        },
        hideSlider:function(){
        	return $(this.element).siblings( '.' + this.settings.classSlider ).fadeOut();
        },
        setup: function(){
        	var self=this;
        	var element = $(self.element);

        	// init listener for scroll of the content
			element.on('scroll', function(e) {
			    self.hideSlider();
			}, self.settings.delayFade).scroll(function(){
                // console.log(self);
				self.setSelectorPosition( ( element.height() / element[0].scrollHeight ) * element.scrollTop() );
        		self.showSlider();
			});

        	$.when(
				element.after( '<div class="' + self.settings.classSlider + '"><div class="' + self.settings.classSelector + '"></div></div>' )
			).then(
				self.setSelectorHeight(),
				self.setSelectorPosition()
			).done(function(){
				self.hideSlider()
			});
        }
    };

    $.fn.visualScrollbar = function(options) {
        options = $.extend(true, {}, defaults, options);
        return this.each(function() {
            var $this = $(this);
            $this.data('plugin', new visualScrollbar($this, options));
        });
    };

    $.fn.visualScrollbar.defaults = defaults;
    $.fn.visualScrollbar.visualScrollbar = visualScrollbar;
});
