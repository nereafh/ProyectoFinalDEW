const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            slides: ['img/promo1.jpg', 'img/promo2.jpg', 'img/promo3.jpg'],
            index: 0,
            transition: 'transform 0.5s ease'
        }
    },
    computed: {
        trackStyle() {
            return { transform: `translateX(-${this.index * 100}%)`, transition: this.transition }
        }
    },
    mounted() {
        setInterval(() => {
            this.index = (this.index + 1) % this.slides.length;
        }, 3000);
    }
});
app.mount('#app');



// --- LÓGICA JS PURO ---


    menu = document.getElementById('lista-desplegable');
    // Muestro el menú al hacer click en productos
    function mostrarMenu() {
        menu.classList.add('visible'); //Añade la clase visible del CSS, gracias a display block !important muestra el menú
        menu.style.setProperty('display', 'block', 'important');
        
    }

/*
    // toggle añade la clase si no está, y la quita si ya está
    menu.classList.toggle('visible');

    // Comprobamos si quedó visible para ajustar el display manual que pusiste
    if (menu.classList.contains('visible')) {
        menu.style.setProperty('display', 'block', 'important');
    } else {
        menu.style.setProperty('display', 'none', 'important');
    }

*/

    
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
