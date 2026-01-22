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





//--------------------INICIAR SESIÓN/REGISTRARSE---------------------

const contenido = document.getElementById('contenido-modal');
const modal = document.getElementById('modal');
const seccionMenu = document.getElementById('seccion-menu');
const seccionLogin = document.getElementById('seccion-login');
const seccionReg = document.getElementById('seccion-reg');


document.getElementById("btn-login").addEventListener("click", e => {
    e.preventDefault();
    modal.style.display = 'flex'; //Muestra el menú de login/registro
});

document.getElementById('btn-cerrar-modal').addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'none'; //Deja de mostrar el menú de login/registro
});



//Botones login y registro
document.getElementById("btn-ir-login").addEventListener('click', e => {
    e.preventDefault();
    cambiarVista('login');
});
document.getElementById("btn-ir-registro").addEventListener('click', e => {
    e.preventDefault();
    cambiarVista('registro');
});

//Cambiar vista
function cambiarVista(vista){
    //Empiezan todas ocultas:
    seccionMenu.style.display = 'none';
    seccionLogin.style.display = 'none';
    seccionReg.style.display = 'none';

    switch(vista){
        case 'menu': 
            seccionMenu.style.display = 'block';
        break;

        case 'login': 
            seccionLogin.style.display = 'block';
        break;

        case 'registro': 
            seccionReg.style.display = 'block';
        break;

        default:
            seccionMenu.style.display = 'none';
        break;

    }
}



//Botones volver y entrar
document.querySelectorAll('.btn-volver').forEach(cadaBotonVolver => {
    cadaBotonVolver.addEventListener('click', (e) => {
        e.preventDefault();
        cambiarVista('menu');
    });
});

document.getElementById('btnEntrar').addEventListener('click', e => {
    enviarLogin();
});
document.getElementById('btnFinalizarReg').addEventListener('click', e => {
    enviarRegistro();
});

//Login  
async function enviarLogin() {
    const inputEmail = document.getElementById('loginEmail');
    const inputPass = document.getElementById('loginPass');
    const errorMsg = document.getElementById('errorMsgLogin');
    
    /*
    FormData crea un conjunto de pares clave/valor, luego se envian mediante una solicitud fetch o XMLHttpRequest.

    nombreObjetoFormData.append('clave', 'valor'); -> agrega un nuevo par clave/valor al objeto FormData.
    clave sería el nombre del campo del formulario y valor sería el valor que se quiere enviar.
    */
    const datosFormulario = new FormData(); 
    datosFormulario.append('correo_electronico', inputEmail.value);
    datosFormulario.append('contrasena', inputPass.value);

    const respuestaFetch = await fetch('bbdd/procesar_login.php', { method: 'POST', body: datosFormulario });
    const texto = await respuestaFetch.text(); //Convertir la respuesta en texto

    
    //sessionStorage.setItem('clave', 'valor'); -> almacena datos en el sessionStorage del navegador.
    if (texto.includes("Bienvenido")) {
        const nombreUsuario = texto.split(', ')[1].replace('!', ''); 
        sessionStorage.setItem('usuarioLogueado', nombreUsuario);
        location.reload(); // Recarga para entrar
    } else {
        inputEmail.style.border = "2px solid red";
        inputPass.style.border = "2px solid red";
        errorMsg.innerText = "Debes registrarte primero, el correo o contraseña no existe.";
    }
}

//Registro
async function enviarRegistro() {
    const inNombre = document.getElementById('regNombre');
    const inEmail = document.getElementById('regEmail');
    const inIban = document.getElementById('regIban');
    const inTel = document.getElementById('regTel');
    
    // Reset bordes
    [inNombre, inEmail, inIban, inTel].forEach(i => i.style.border = "1px solid #ced4da");

    // Validaciones básicas
    const rNombre = /^[a-zA-Z\s]{2,50}$/;
    const rEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rIban = /^ES\d{22}$/; 
    const rTel = /^[6789]\d{8}$/; 

    let error = false;
    if (!rNombre.test(inNombre.value)) { inNombre.style.border = "2px solid red"; error = true; }
    if (!rEmail.test(inEmail.value)) { inEmail.style.border = "2px solid red"; error = true; }
    if (!rIban.test(inIban.value)) { inIban.style.border = "2px solid red"; error = true; }
    if (!rTel.test(inTel.value)) { inTel.style.border = "2px solid red"; error = true; }

    if (error) return;

    const datosFormulario = new FormData();
    datosFormulario.append('nombre', document.getElementById('regNombre').value);
    datosFormulario.append('correo_electronico', inEmail.value);
    datosFormulario.append('cuenta_bancaria', inIban.value);
    datosFormulario.append('telefono', inTel.value);
    datosFormulario.append('contrasena', document.getElementById('regPass').value);

    const res = await fetch('bbdd/procesar_registro.php', { method: 'POST', body: datosFormulario });
    const data = await res.text();
    
    if (data.includes("exitoso")) {
        alert("Bienvenido");
        location.reload();
    } else {
        alert("Error: " + data); // Aquí podrías poner un mensaje bajo el input también
    }
}

function comprobarSesionStorage() {
    const nombre = sessionStorage.getItem('usuarioLogueado');

    if (nombre) {
        // Si existe el nombre, modificamos el menú
        const btnLogin = document.getElementById('btn-login');
        
        // Cambiamos el icono por el nombre y un botón de cerrar sesión
        btnLogin.parentElement.innerHTML = `
            <button class="btn btn-outline-light me-2" id="btn-carrito">🛒</button>
            <span class="text-white me-2">${nombre}</span>
            <button class="btn btn-sm btn-outline-danger" id="btn-logout">Salir</button>
            <select id="selector-idioma" class="form-select form-select-sm" style="width: auto;">
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
        `;

        // Lógica para cerrar sesión
        document.getElementById('btn-logout').addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogueado'); // Borramos el dato
            location.reload(); // Recargamos para que vuelva a salir el icono 👤
        });
    }
}

// Ejecutamos la comprobación siempre que cargue la página
comprobarSesionStorage();