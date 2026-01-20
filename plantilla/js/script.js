   // --------------------CARRUSEL DE IMÁGENES---------------------
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
    document.querySelectorAll('.item-categoria').forEach(categoria => {
        categoria.addEventListener('click', (e) => {
            e.preventDefault();
            const nombre = categoria.innerText;
            document.getElementById('main-content').innerHTML = `
                <h2>Sección: ${nombre}</h2>
                <p>Aquí verás todos nuestros productos de la categoría ${nombre}.</p>
            `;
            // El menú se cerrará solo por el evento 'click' del documento
        });
    });





//--------------------BOTÓN LOGIN---------------------

const contenido = document.getElementById('contenido-modal');
const modal = document.getElementById('modal');

document.getElementById('btn-login').addEventListener('click', () => {
    modal.style.display = 'flex'; //Muestra el menú de login/registro
});
document.getElementById('btn-cerrar-modal').addEventListener('click', () => {
    modal.style.display = 'none'; //Deja de mostrar el menú de login/registro
});

document.getElementById('btn-ir-login').addEventListener('onclick', () => {
    mostrarFormLogin();
});
document.getElementById('btn-ir-registro').addEventListener('onclick', () => {
    mostrarFormLogin();
});



// --- VISTA LOGIN ---
function mostrarFormLogin() {
    contenido.innerHTML = `
        <h4>Iniciar Sesión</h4>
        <div id="mensaje-error" class="text-danger mb-2"></div>
        <input type="email" id="email-login" class="form-control mb-2" placeholder="Correo electrónico" required>
        <input type="password" id="pass-login" class="form-control mb-2" placeholder="Contraseña" required>
        <button class="btn btn-primary w-100" id="enviar-login">Entrar</button>
        <button class="btn btn-link w-100 mt-2" id="volver-menu">Volver atrás</button>
    `;

    document.getElementById('volver-menu').addEventListener('click', abrirMenuOpciones);

    document.getElementById('enviar-login').addEventListener('click', async () => {
        const email = document.getElementById('email-login').value;
        const pass = document.getElementById('pass-login').value;

        // AJAX enviando datos a procesar_login.php
        const datos = new FormData();
        datos.append('correo_electronico', email);
        datos.append('contrasena', pass);

        const respuesta = await fetch('procesar_login.php', { method: 'POST', body: datos });
        const texto = await respuesta.text();

        if (texto.includes("Bienvenido")) {
            alert(texto);
            location.reload(); // Recarga para mostrar que ya entró
        } else {
            // Si no está en la BBDD, sale el mensaje del enunciado
            document.getElementById('mensaje-error').innerHTML = "Usuario no encontrado. <b>Debes registrarte primero.</b>";
        }
    });
}

// --- VISTA REGISTRO ---
function mostrarFormRegistro() {
    contenidoModal.innerHTML = `
        <h4>Formulario de Registro</h4>
        <input type="text" id="reg-nombre" class="form-control mb-2" placeholder="Nombre completo">
        <input type="email" id="reg-email" class="form-control mb-2" placeholder="Correo electrónico">
        <input type="text" id="reg-iban" class="form-control mb-2" placeholder="Cuenta bancaria (ES...)">
        <input type="text" id="reg-tel" class="form-control mb-2" placeholder="Número de teléfono (9 dígitos)">
        <input type="password" id="reg-pass" class="form-control mb-2" placeholder="Contraseña">
        <button class="btn btn-success w-100" id="enviar-registro">Registrar e Ingresar</button>
        <button class="btn btn-link w-100 mt-2" id="volver-menu">Volver atrás</button>
    `;

    document.getElementById('volver-menu').addEventListener('click', abrirMenuOpciones);

    document.getElementById('enviar-registro').addEventListener('click', async () => {
        // Recoger valores
        const nombre = document.getElementById('reg-nombre').value;
        const email = document.getElementById('reg-email').value;
        const iban = document.getElementById('reg-iban').value;
        const tel = document.getElementById('reg-tel').value;
        const pass = document.getElementById('reg-pass').value;

        // --- VALIDACIÓN REGEX ---
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexIban = /^ES\d{22}$/; // Ejemplo: ES + 22 números
        const regexTel = /^[6789]\d{8}$/; // Empieza por 6,7,8 o 9 y tiene 8 más

        if (!nombre) return alert("El nombre es obligatorio");
        if (!regexEmail.test(email)) return alert("El correo no es válido");
        if (!regexIban.test(iban)) return alert("El IBAN debe ser ES seguido de 22 números");
        if (!regexTel.test(tel)) return alert("El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9");
        if (pass.length < 4) return alert("La contraseña es muy corta");

        // Si todo es correcto, AJAX a procesar_registro.php
        const datosReg = new FormData();
        datosReg.append('nombre', nombre);
        datosReg.append('correo_electronico', email);
        datosReg.append('cuenta_bancaria', iban);
        datosReg.append('telefono', tel);
        datosReg.append('contrasena', pass);
        datosReg.append('id', Date.now()); // Generamos un ID simple

        const respuesta = await fetch('procesar_registro.php', { method: 'POST', body: datosReg });
        const resultado = await respuesta.text();
        
        alert(resultado);
        if (resultado.includes("exitoso")) {
            location.reload();
        }
    });
}





