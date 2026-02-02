$(document).ready(function() {
    
    //-----------------EFECTO LOGO-------------------
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#logo').stop().animate({ width: '60px' }, 200);
        } else {
            $('#logo').stop().animate({ width: '85px' }, 200);
        }
    });

    //---------------HOVER PRODUCTOS (CodePen 3)----------------------
    $(document).on('mouseenter', '.prod-item', function() {
        $(this).stop().animate({ opacity: 0.7 }, 200);
    }).on('mouseleave', '.prod-item', function() {
        $(this).stop().animate({ opacity: 1 }, 200);
    });

    //------------------EFECTO AL CONFIRMAR COMPRA (CodePen 4: SlideUp)----------------
    // Cuando le das a "Confirmar Pedido", la tabla del carrito desaparece deslizándose
    $(document).on('click', '.btn-success', function() {
        $('table').slideUp(1000);
    });

});