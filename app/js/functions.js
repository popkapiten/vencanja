$(document).ready(function () {


    // MENU TOGGLE INIT
    $(window).on('resize', function () {

        if($(window).width() > 990) {
            $('.navigation__navbar').removeClass('expand');
        }
    });

    $( '.menu-btn' ).click(function(){
        $('.navigation__navbar').toggleClass('expand')
    });

    // CAROUSEL INIT
    $('.carousel__wrapper').bxSlider({
        minSlides: 5,
        maxSlides: 5,
        slideMargin: 35,
        moveSlides: 1,
        slideWidth: 220,
        pager: false
    });

    // SLIDER INIT
    $('.slider__wrapper').bxSlider({
        controls: false
    });
});