const { createApp } = Vue;

createApp({
    data() {
        return {
            // Control de Vistas
            vistaActual: 'inicio',     // inicio, detalle, carrito, acerca, auth
            authVista: 'menu',         // menu, login, registro
            catSeleccionada: 'all',    // all, prod-camas, prod-higiene-item, etc.
            menuAbierto: false,
            
            // Datos de Usuario y Sesión
            usuario: sessionStorage.getItem('usuarioLogueado') || null,
            carrito: JSON.parse(localStorage.getItem('carrito')) || [],
            
            // Carrusel
            indexCarrusel: 0,
            imagenesCarrusel: [
                { id: 'juguete2', src: 'img/juguete2.jpg' },
                { id: 'cama1', src: 'img/cama1.jpg' },
                { id: 'higiene1', src: 'img/higiene1.jpg' },
                { id: 'accesorio1', src: 'img/accesorio1.jpg' },
                { id: 'comida1', src: 'img/comida1.jpg' }
            ],

            // Detalle de producto
            productoSeleccionado: {},

            // Formularios (v-model)
            formLogin: { email: '', pass: '' },
            errorMsgLogin: '',
            formReg: { nombre: '', email: '', iban: '', tel: '', pass: '' }
        }
    },

    computed: {
        totalFactura() {
            return this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);
        }
    },

    methods: {
        // --- NAVEGACIÓN ---
        irAInicio() {
            this.vistaActual = 'inicio';
            this.catSeleccionada = 'all';
            this.menuAbierto = false;
        },

        seleccionarCategoria(cat) {
            this.catSeleccionada = cat;
            this.vistaActual = 'inicio';
            this.menuAbierto = false;
        },

        // --- CARRUSEL ---
        siguienteCarrusel() {
            this.indexCarrusel = (this.indexCarrusel + 1) % this.imagenesCarrusel.length;
        },
        anteriorCarrusel() {
            this.indexCarrusel = (this.indexCarrusel - 1 + this.imagenesCarrusel.length) % this.imagenesCarrusel.length;
        },

        // --- LÓGICA DE PRODUCTOS (AJAX) ---
        async verDetalleProducto(idImg) {
            try {
                // El mismo PHP que ya tenías funciona perfecto aquí
                const response = await fetch(`bbdd/get_producto.php?id_img=${idImg}`);
                const data = await response.json();
                if (!data.error) {
                    this.productoSeleccionado = data;
                    this.vistaActual = 'detalle';
                }
            } catch (error) {
                console.error("Error al obtener detalle:", error);
            }
        },

        // --- CARRITO ---
        agregarAlCarrito(prod) {
            if (!this.usuario) {
                alert("Debes iniciar sesión para comprar.");
                this.vistaActual = 'auth';
                this.authVista = 'login';
                return;
            }
            const itemEnCarrito = this.carrito.find(item => item.Nombre === (prod.Nombre || prod.nombre));
            if (itemEnCarrito) {
                itemEnCarrito.cantidad++;
            } else {
                this.carrito.push({
                    Nombre: prod.Nombre || prod.nombre,
                    precio: parseFloat(prod.precio),
                    imagen: prod.imagen,
                    cantidad: 1
                });
            }
            this.guardarCarrito();
        },

        eliminarDelCarrito(index) {
            this.carrito.splice(index, 1);
            this.guardarCarrito();
        },

        guardarCarrito() {
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        },

        confirmarPedido() {
            alert("¡Pedido realizado con éxito!");
            this.carrito = [];
            this.guardarCarrito();
            this.irAInicio();
        },

        // --- AUTENTICACIÓN (Llamadas a tus PHP actuales) ---
        async ejecutarLogin() {
            const formData = new FormData();
            formData.append('correo_electronico', this.formLogin.email);
            formData.append('contrasena', this.formLogin.pass);

            try {
                const res = await fetch('bbdd/procesar_login.php', { method: 'POST', body: formData });
                const texto = await res.text();

                if (texto.includes("Bienvenido")) {
                    const nombre = texto.split(', ')[1].replace('!', '').trim();
                    sessionStorage.setItem('usuarioLogueado', nombre);
                    this.usuario = nombre;
                    this.vistaActual = 'inicio';
                    location.reload(); // Recarga para limpiar estados
                } else {
                    this.errorMsgLogin = "Credenciales incorrectas.";
                }
            } catch (e) {
                this.errorMsgLogin = "Error de conexión con el servidor.";
            }
        },

        // Dentro de methods en tu script.js, asegúrate de que esté así:
        async ejecutarRegistro() {
            const formData = new FormData();
            formData.append('nombre', this.formReg.nombre);
            formData.append('correo_electronico', this.formReg.email);
            formData.append('cuenta_bancaria', this.formReg.iban);
            formData.append('telefono', this.formReg.tel); // <--- Asegúrate de enviar el teléfono
            formData.append('contrasena', this.formReg.pass);

            try {
                const res = await fetch('bbdd/procesar_registro.php', { method: 'POST', body: formData });
                const data = await res.text();
                
                if (data.trim().toLowerCase().includes("exitoso")) {
                    alert("¡Registro completado! Ahora puedes iniciar sesión.");
                    this.authVista = 'login';
                } else {
                    alert(data); // Muestra el error que devuelve el PHP (ej: "Este email ya existe")
                }
            } catch (e) {
                console.error("Error en el registro:", e);
            }
        },

        cerrarSesion() {
            sessionStorage.removeItem('usuarioLogueado');
            this.usuario = null;
            location.reload();
        }
    },

    mounted() {
        // Iniciar autoplay del carrusel
        setInterval(this.siguienteCarrusel, 4000);
    }
}).mount('#app');