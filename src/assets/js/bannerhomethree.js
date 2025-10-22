(function($) {
    "use strict";
//Banner Three Slider

var $status = $('.slider-counter-three');
var $slickElement = $('.home-banner-three-slider');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if(!slick.$dots){
    return;
}
var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + (slick.$dots[0].children.length));
});
 // Home Banner Two Slider Arrow Position 

 var window_width = $(window).outerWidth();
 var container_width = $('.container').outerWidth();
 var full_width = window_width - container_width
 var right_position_value = full_width / 2
 $('.banner-two-slider .slider-counter').css('left', right_position_value);
 $('.banner-two-slider .slick-next').css('left', right_position_value + 10);
 $('.banner-two-slider .slick-prev').css('left', right_position_value + 150);

 // Home Banner Three Slider Arrow Position 

 var window_width = $(window).outerWidth();
 var container_width = $('.container').outerWidth();
 var full_width = window_width - container_width
 var right_position_value = full_width / 2
 $('.home-three-slider .owl-dots').css('left', right_position_value + 37);
 $('.home-three-slider .owl-next').css('left', right_position_value + 10);
 $('.home-three-slider .owl-prev').css('left', right_position_value + 150);
 
})(jQuery);