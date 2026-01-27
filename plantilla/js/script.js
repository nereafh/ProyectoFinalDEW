// -------------------- VARIABLES GLOBALES ---------------------
const fotos = document.querySelectorAll('.slide');
const menu = document.getElementById('lista-desplegable');
const estFormulario = document.querySelector('.estFormulario');
const seccionMenu = document.getElementById('seccion-menu');
const seccionLogin = document.getElementById('seccion-login');
const seccionReg = document.getElementById('seccion-reg');
const mainContent = document.getElementById('main-content');
const seccionAcercaDe = document.getElementById('seccion-acerca-de');
const seccionProdTitulo = document.getElementById('seccion-prod');

let indice = 0; // contador carrusel

// -------------------- FUNCIONES DE UTILIDAD (VISTAS) ---------------------

// Limpia la pantalla para que las secciones no se solapen
function resetearPantalla() {
    mainContent.style.display = 'block';           // Asegura que el contenedor de productos sea visible
    estFormulario.style.display = 'none';          // Oculta el bloque de Login/Registro
    seccionAcercaDe.style.display = 'none';        // Oculta Acerca de
    seccionProdTitulo.style.display = 'block';     // Muestra el título "Productos Recomendados"
    menu.style.display = 'none';                   // Cierra el menú desplegable siempre
}

function ocultarProductos() {
    document.getElementById('prod-camas').style.display = 'none';
    document.getElementById('prod-higiene').style.display = 'none';
    document.getElementById('prod-juguetes').style.display = 'none';
    document.getElementById('prod-accesorios').style.display = 'none';
    document.getElementById('prod-comida').style.display = 'none';
}

// -------------------- CARRUSEL DE IMÁGENES ---------------------
function mostrarFoto() {
    fotos.forEach(foto => foto.classList.remove('activa'));
    fotos[indice].classList.add('activa');
}

function siguiente() {
    indice = (indice + 1) % fotos.length;
    mostrarFoto();
}

function anterior() {
    indice = (indice - 1 + fotos.length) % fotos.length;
    mostrarFoto();
}

document.getElementById('btn-next').addEventListener('click', siguiente);
document.getElementById('btn-prev').addEventListener('click', anterior);
setInterval(siguiente, 3000); // Aumentado a 3s para mejor lectura
mostrarFoto();

// -------------------- MENÚ DESPLEGABLE ---------------------
document.getElementById('link-productos').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Toggle: si está abierto se cierra, si está cerrado se abre
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

// Cerrar al clicar fuera
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target.id !== 'link-productos') {
        menu.style.display = 'none';
    }
});

// -------------------- NAVEGACIÓN CATEGORÍAS ---------------------
document.querySelectorAll('.item-categoria').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        resetearPantalla(); // <-- Esto soluciona que el menú funcione tras el login
        ocultarProductos();
        
        const categoriaId = item.getAttribute('data-id');
        const target = document.getElementById(categoriaId);
        if (target) target.style.display = 'block';
    });
});

// -------------------- ACERCA DE ---------------------
document.getElementById('btn-acerca').addEventListener('click', (e) => {
    e.preventDefault();
    resetearPantalla();
    ocultarProductos();
    seccionProdTitulo.style.display = 'none'; 
    seccionAcercaDe.style.display = 'block';
});

// -------------------- LOGIN / REGISTRO (VISTAS) ---------------------
document.getElementById("btn-login").addEventListener("click", e => {
    e.preventDefault();
    resetearPantalla(); // Limpiamos primero
    mainContent.style.display = 'none'; // Luego ocultamos main para el login
    estFormulario.style.display = 'flex';
    cambiarVista('menu');
});

document.getElementById('btn-cerrar').addEventListener('click', e => {
    e.preventDefault();
    resetearPantalla();
});

function cambiarVista(vista) {
    seccionMenu.style.display = 'none';
    seccionLogin.style.display = 'none';
    seccionReg.style.display = 'none';

    if (vista === 'menu') seccionMenu.style.display = 'block';
    if (vista === 'login') seccionLogin.style.display = 'block';
    if (vista === 'registro') seccionReg.style.display = 'block';
}

document.getElementById("btn-ir-login").addEventListener('click', () => cambiarVista('login'));
document.getElementById("btn-ir-registro").addEventListener('click', () => cambiarVista('registro'));

document.querySelectorAll('.btn-volver').forEach(btn => {
    btn.addEventListener('click', () => cambiarVista('menu'));
});

// -------------------- ACCIONES FORMULARIOS ---------------------
document.getElementById('btnEntrar').addEventListener('click', enviarLogin);
document.getElementById('btnFinalizarReg').addEventListener('click', enviarRegistro);

async function enviarLogin() {
    const inputEmail = document.getElementById('loginEmail');
    const inputPass = document.getElementById('loginPass');
    const errorMsg = document.getElementById('errorMsgLogin');
    
    const datosFormulario = new FormData(); 
    datosFormulario.append('correo_electronico', inputEmail.value);
    datosFormulario.append('contrasena', inputPass.value);

    try {
        const respuestaFetch = await fetch('bbdd/procesar_login.php', { method: 'POST', body: datosFormulario });
        const texto = await respuestaFetch.text();

        if (texto.includes("Bienvenido")) {
            const nombreUsuario = texto.split(', ')[1].replace('!', ''); 
            sessionStorage.setItem('usuarioLogueado', nombreUsuario);
            location.reload();
        } else {
            inputEmail.style.border = "2px solid red";
            inputPass.style.border = "2px solid red";
            errorMsg.innerText = "Correo o contraseña incorrectos.";
        }
    } catch (err) {
        console.error("Error en login:", err);
    }
}

async function enviarRegistro() {
    const reglas = {
        Nombre: /^[a-zA-Z\s]{2,50}$/,
        Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        Iban: /^ES\d{22}$/,
        Tel: /^[6789]\d{8}$/,
        Pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };
    
    const inEmail = document.getElementById('regEmail');
    const inIban = document.getElementById('regIban');
    const inTel = document.getElementById('regTel');
    const inNombre = document.getElementById('regNombre');
    const inPass = document.getElementById('regPass');
    const pantallaMsg = document.getElementById('msgPantallaRegistro');

    // Validación de vacíos
    if (!inNombre.value || !inEmail.value || !inIban.value || !inTel.value || !inPass.value) {
        pantallaMsg.style.color = "red";
        pantallaMsg.innerText = "Todos los campos son obligatorios.";
        return; 
    }

    // Validaciones RegEx (Simplificado)
    let error = false;
    const campos = [
        { el: inNombre, reg: reglas.Nombre, err: 'errNombre' },
        { el: inEmail, reg: reglas.Email, err: 'errEmail' },
        { el: inIban, reg: reglas.Iban, err: 'errIban' },
        { el: inTel, reg: reglas.Tel, err: 'errTel' },
        { el: inPass, reg: reglas.Pass, err: 'errContrasena' }
    ];

    campos.forEach(campo => {
        if (!campo.reg.test(campo.el.value)) {
            campo.el.style.border = "2px solid red";
            document.getElementById(campo.err).style.visibility = 'visible';
            error = true;
        } else {
            campo.el.style.border = "1px solid rgb(227, 227, 225)";
            document.getElementById(campo.err).style.visibility = 'hidden';
        }
    });

    if (error) return;

    const datosFormulario = new FormData();
    datosFormulario.append('nombre', inNombre.value);
    datosFormulario.append('correo_electronico', inEmail.value);
    datosFormulario.append('cuenta_bancaria', inIban.value);
    datosFormulario.append('telefono', inTel.value);
    datosFormulario.append('contrasena', inPass.value);

    const res = await fetch('bbdd/procesar_registro.php', { method: 'POST', body: datosFormulario });
    const data = await res.text();
    
    if (data.trim().toLowerCase().includes("exitoso")) {
        pantallaMsg.style.color = "green";
        pantallaMsg.innerText = "¡Bienvenido! Registro completado.";
        setTimeout(() => { location.reload(); }, 2000);
    } else {
        pantallaMsg.style.color = "#e62222";
        pantallaMsg.innerText = data;
    }
}

// -------------------- SESIÓN DE USUARIO ---------------------
function comprobarSesionStorage() {
    const nombre = sessionStorage.getItem('usuarioLogueado');
    if (nombre) {
        const btnLogin = document.getElementById('btn-login');
        btnLogin.parentElement.innerHTML = `
            <button class="btn btn-outline-light me-2" id="btn-carrito">🛒</button>
            <span class="text-white me-2">${nombre}</span>
            <button class="btn btn-sm btn-outline-danger" id="btn-logout">Salir</button>
            <select id="selector-idioma" class="form-select form-select-sm ms-2" style="width: auto;">
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
        `;

        document.getElementById('btn-logout').addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogueado');
            location.reload();
        });
    }
}

comprobarSesionStorage();