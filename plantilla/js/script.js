const { createApp } = Vue;

createApp({
    data() {
        return {
            idioma: 'es',
            textos: traducciones,
            vistaActual: 'inicio',
            authVista: 'menu',
            catSeleccionada: 'all',
            menuAbierto: false,
            usuario: sessionStorage.getItem('usuarioLogueado') || null,
            carrito: JSON.parse(localStorage.getItem('carrito')) || [],
            indexCarrusel: 0,
            imagenesCarrusel: [
                { id: 'juguete2', src: 'img/juguete2.jpg' },
                { id: 'cama1', src: 'img/cama1.jpg' },
                { id: 'higiene1', src: 'img/higiene1.jpg' },
                { id: 'accesorio1', src: 'img/accesorio1.jpg' },
                { id: 'comida1', src: 'img/comida1.jpg' }
            ],
            productoSeleccionado: {},
            formLogin: { email: '', pass: '' },
            formReg: { nombre: '', email: '', iban: '', tel: '', pass: '' },
            
            // --- NUEVO: Objeto para mensajes de error ---
            errores: {
                login: '',
                regNombre: '',
                regEmail: '',
                regIban: '',
                regTel: '',
                regPass: '',
                regGlobal: '',
                compra: ''
            }
        }
    },

    computed: {
        totalFactura() {
            return this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);
        }
    },

    methods: {
        irAInicio() { this.vistaActual = 'inicio'; this.catSeleccionada = 'all'; this.menuAbierto = false; },
        seleccionarCategoria(cat) { this.catSeleccionada = cat; this.vistaActual = 'inicio'; this.menuAbierto = false; },
        siguienteCarrusel() { this.indexCarrusel = (this.indexCarrusel + 1) % this.imagenesCarrusel.length; },
        anteriorCarrusel() { this.indexCarrusel = (this.indexCarrusel - 1 + this.imagenesCarrusel.length) % this.imagenesCarrusel.length; },

                async verDetalleProducto(idImg) {
            try {
                // Hacemos la petición al PHP usando el ID de la imagen
                const response = await fetch(`bbdd/get_producto.php?id_img=${idImg}`);
                const data = await response.json();
                
                if (!data.error) {
                    // Guardamos los datos recibidos en el objeto que usa la vista de detalle
                    this.productoSeleccionado = data;
                    // Cambiamos la vista
                    this.vistaActual = 'detalle';
                    // Scroll arriba para que el usuario vea el producto
                    window.scrollTo({top: 0, behavior: 'smooth'});
                } else {
                    console.error("Producto no encontrado en la base de datos");
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
            }
        },

        // --- LÓGICA DE VALIDACIÓN (JS PURO) ---
        validarRegistro() {
            let esValido = true;
            // Reset de errores
            Object.keys(this.errores).forEach(key => this.errores[key] = '');

            const regexNombre = /^[a-zA-Z\s]{2,50}$/;
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const regexIban = /^ES\d{22}$/;
            const regexTel = /^[6789]\d{8}$/;
            const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            // Usamos las variables de lang.js
            if (!regexNombre.test(this.formReg.nombre)) { this.errores.regNombre = this.textos[this.idioma].mensajes.vNombre; esValido = false; }
            if (!regexEmail.test(this.formReg.email)) { this.errores.regEmail = this.textos[this.idioma].mensajes.vEmail; esValido = false; }
            if (!regexIban.test(this.formReg.iban)) { this.errores.regIban = this.textos[this.idioma].mensajes.vIban; esValido = false; }
            if (!regexTel.test(this.formReg.tel)) { this.errores.regTel = this.textos[this.idioma].mensajes.vTel; esValido = false; }
            if (!regexPass.test(this.formReg.pass)) { this.errores.regPass = this.textos[this.idioma].mensajes.vPass; esValido = false; }

            return esValido;
        },

        async ejecutarLogin() {
            this.errores.login = '';
            const formData = new FormData();
            formData.append('correo_electronico', this.formLogin.email);
            formData.append('contrasena', this.formLogin.pass);

            try {
                const res = await fetch('bbdd/procesar_login.php', { method: 'POST', body: formData });
                const texto = await res.text();
                if (texto.includes("Bienvenido")) {
                    const nombre = texto.split(', ')[1].replace('!', '').trim();
                    sessionStorage.setItem('usuarioLogueado', nombre);
                    location.reload();
                } else {
                    this.errores.login = this.textos[this.idioma].mensajes.loginErr;                
                }
            } catch (e) { this.errores.login = "Error de servidor."; }
        },

        async ejecutarRegistro() {
            if (!this.validarRegistro()) return;

            const formData = new FormData();
            formData.append('nombre', this.formReg.nombre);
            formData.append('correo_electronico', this.formReg.email);
            formData.append('cuenta_bancaria', this.formReg.iban);
            formData.append('telefono', this.formReg.tel);
            formData.append('contrasena', this.formReg.pass);

            try {
                const res = await fetch('bbdd/procesar_registro.php', { method: 'POST', body: formData });
                const data = await res.text();
                if (data.toLowerCase().includes("exitoso")) {
                    this.authVista = 'login';
                    this.errores.login = this.textos[this.idioma].mensajes.regExito;
                } else {
                    this.errores.regGlobal = data;
                }
            } catch (e) { this.errores.regGlobal = "Error al conectar."; }
        },

        agregarAlCarrito(prod) {
            if (!this.usuario) {
                this.vistaActual = 'auth';
                this.authVista = 'login';
                this.errores.login = this.textos[this.idioma].mensajes.loginComprar;
                return;
            }
            const item = this.carrito.find(i => i.nombre === (prod.nombre || prod.nombre));
            if (item) item.cantidad++;
            else this.carrito.push({ nombre: prod.nombre || prod.nombre, precio: parseFloat(prod.precio), imagen: prod.imagen, cantidad: 1 });
            this.guardarCarrito();
        },

        eliminarDelCarrito(index) { this.carrito.splice(index, 1); this.guardarCarrito(); },
        guardarCarrito() { localStorage.setItem('carrito', JSON.stringify(this.carrito)); },
        
        confirmarPedido() { 
            this.errores.compra = this.textos[this.idioma].mensajes.compraExito;
            setTimeout(() => { this.carrito = []; 
                this.guardarCarrito(); this.irAInicio(); 
                this.errores.compra = ''; }, 2000); 
            },
        
            cerrarSesion() { sessionStorage.removeItem('usuarioLogueado'); location.reload(); }
    },

    mounted() { setInterval(this.siguienteCarrusel, 4000); }
}).mount('#app');