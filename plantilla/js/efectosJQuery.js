$(document).ready(function() {
    
    // 1. EFECTO LOGO (Se mantiene igual)
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#logo').stop().animate({ width: '60px' }, 200);
        } else {
            $('#logo').stop().animate({ width: '85px' }, 200);
        }
    });

    // 2. VALIDACIÓN VISUAL (CodePen 3: Focus/Blur con delegación)
    // Usamos $(document).on para que jQuery encuentre los inputs aunque Vue los cree tarde
    $(document).on('focus', 'input.form-control', function() {
        $(this).css({
            'border-color': '#ffc107',
            'box-shadow': '0 0 10px #ffc107',
            'transition': 'all 0.3s'
        });
    });

    $(document).on('blur', 'input.form-control', function() {
        $(this).css({
            'border-color': '',
            'box-shadow': ''
        });
    });

    // 3. ANIMACIÓN DE CARRITO (CodePen 4: Animate)
    // El botón de "Añadir" ahora hará un efecto de rebote muy claro
    $(document).on('click', '.btn-dark', function() {
        // Buscamos el icono del carrito en el navbar para que brille
        $(".btn-outline-light").animate({ opacity: 0.2 }, 100)
                               .animate({ opacity: 1 }, 100)
                               .animate({ opacity: 0.2 }, 100)
                               .animate({ opacity: 1 }, 100);
        
        // El botón pulsado se desplaza a la derecha y vuelve (CodePen 4: Custom animate)
        $(this).animate({ marginLeft: "20px" }, 100).animate({ marginLeft: "0px" }, 100);
    });

    // 4. EFECTO HOVER PRODUCTOS (CodePen 3)
    $(document).on('mouseenter', '.prod-item', function() {
        $(this).stop().animate({ opacity: 0.7 }, 200);
    }).on('mouseleave', '.prod-item', function() {
        $(this).stop().animate({ opacity: 1 }, 200);
    });

    // 5. EFECTO AL CONFIRMAR COMPRA (CodePen 4: SlideUp)
    // Cuando le das a "Confirmar Pedido", la tabla del carrito desaparece deslizándose
    $(document).on('click', '.btn-success', function() {
        $('table').slideUp(1000);
    });

});