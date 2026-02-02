$(document).ready(function() {
    // Usamos delegación de eventos para que funcionen aunque Vue cambie el DOM
    $(window).scroll(function() {
        var logo = $('#logo');
        if (logo.length) { // Solo si el logo existe
            if ($(this).scrollTop() > 50) {
                logo.stop().animate({ width: '60px' }, 200);
            } else {
                logo.stop().animate({ width: '85px' }, 200);
            }
        }
    });

    $(document).on('mouseenter', '.prod-item', function() {
        $(this).stop().fadeTo(200, 0.7);
    }).on('mouseleave', '.prod-item', function() {
        $(this).stop().fadeTo(200, 1);
    });

    $(document).on('click', '.btn-success', function() {
        $('table').slideUp(1000);
    });
});