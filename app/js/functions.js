$(document).ready(function () {

    $(window).on('resize', function () {

        if($(window).width() > 990) {
            $('.navigation__navbar').removeClass('expand');
        }
    });

    $( '.menu-btn' ).click(function(){
        $('.navigation__navbar').toggleClass('expand')
    });
});