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

    // SLIDER INIT
    $('.slider__wrapper').bxSlider({
        responsive: true,
        controls: false
    });
});