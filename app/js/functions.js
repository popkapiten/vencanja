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

    // ACCORDION
    $( "#accordion" ).accordion();
    $( "#accordion2" ).accordion();

    // calc
    (function calc() {
        var ks = $( ".kalkulator" );
        var h3s = [];
        var as = [];

        ks.each(function( index ) {

            // https://stackoverflow.com/questions/995183/how-to-allow-only-numeric-0-9-in-html-inputbox-using-jquery
            $( this ).on('keydown', '.kalkulator__input', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});

            var a = $( this ).find("a");
            as.push(a);
            var inputs = $( this ).find("input");
            var h3 = $( this ).find("h3.kalkulator__izracunaj--count");
            h3s.push(h3);

            a.on( "click", function(evt) {
                evt.preventDefault();
                console.log( $( this ).text() );

                var sum = 0;
                inputs.each(function() {
                    console.log( 'val', $( this ).val(), parseFloat($( this ).val()) );

                    var x = parseFloat($( this ).val());

                    sum += isNaN(x) ? 0 : x;
                });

                console.log('rez', sum);

                h3.text(parseFloat(Math.round(sum * 100) / 100).toFixed(2) + " $");
            });

            console.log( index, 'a len', a.length );
        });

        // ukupno

        var kis = $( "#ukupno" );
        console.log('kis len', kis.length);

        kis.each(function() {
            var a = $( this ).find("a");
            var h3 = $( this ).find("h3");

            a.on( "click", function(evt) {
                evt.preventDefault();

                as.forEach(function (a) {
                    a.trigger( "click" );
                });

                var sum = 0;
                h3s.forEach(function (h3) {
                    sum += parseFloat(h3.text());
                });
                h3.text(parseFloat(Math.round(sum * 100) / 100).toFixed(2) + " $");
            });
        });

        console.log('bk len', ks.length);
    })();
});

console.log('hello');