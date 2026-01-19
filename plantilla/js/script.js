    const fotos = document.querySelectorAll('.slide');
    let indice = 0; //contador de la foto actual

    // Foto actual
    function mostrar() {
        // Recorre las fotos y les quita la clase 'activa' es decir las opaca todas gracias a la clase activa del CSS
        fotos.forEach(foto => foto.classList.remove('activa'));
        // Luego enseña solo la que coincide con el número 'indice', el número índice es la foto en la que estamos
        fotos[indice].classList.add('activa');
    }

    function siguiente() {
        indice = indice + 1;
        if (indice >= fotos.length) {
            indice = 0; // Si llega al final, vuelve a la primera
        }
        mostrar();
    }
    function anterior() {
        indice = indice - 1;
        if (indice < 0) {
            indice = fotos.length - 1; // Si baja de 0, va a la última
        }
        mostrar();
    }

    document.getElementById('btn-next').addEventListener('click', () => {
        siguiente();
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        anterior();
    });

    // Cada 2000 milisegundos (2 segundos) llama a la función siguiente()
    setInterval(siguiente, 2000);

    // Al arrancar, muestra la primera foto
    mostrar();

// --------------------MENÚ DESPLEGABLE---------------------
    menu = document.getElementById('lista-desplegable');
    // Muestro el menú al hacer click en productos
    function mostrarMenu() {
        menu.classList.add('visible'); //Añade la clase visible del CSS, gracias a display block !important muestra el menú
        menu.style.setProperty('display', 'block', 'important');
        
    }

    // Evento para el botón de productos
    document.getElementById('link-productos').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mostrarMenu();
    });
    
    // Cerrar al clicar fuera
    document.addEventListener('click', () => {
        if (menu) {
            menu.classList.remove('visible');
            menu.style.setProperty('display', 'none', 'important');
        }
    });

    // Lógica para las categorías (que cambie el contenido)
    document.querySelectorAll('.item-categoria').forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            const nombre = cat.innerText;
            document.getElementById('main-content').innerHTML = `
                <h2>Sección: ${nombre}</h2>
                <p>Aquí verás todos nuestros productos de la categoría ${nombre}.</p>
            `;
            // El menú se cerrará solo por el evento 'click' del documento
        });
    });
