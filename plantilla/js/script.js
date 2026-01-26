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
    const menu = document.getElementById('lista-desplegable');
    // Muestro el menú al hacer click en productos

    function mostrarMenu() {
       menu.style.display = 'block'; // Lo muestra
        
    }
    // Evento para el botón de productos
    document.getElementById('link-productos').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mostrarMenu(); //menu.style.display = 'block';
    });
    

    //Cerrar al clicar fuera del contenido
    /*
    e.target -> representa el elemento en el que se hizo clic.
    menu.contains(e.target) -> verifica si el elemento clicado está dentro del menú desplegable.
    Si el clic no es dentro del menú se cierra el menú.
    */
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) {
            menu.classList.remove('visible'); //Quita la clase visible del CSS, gracias a display none !important oculta el menú
            menu.style.setProperty('display', 'none', 'important'); // Lo oculta
        }
    });


//--------------------MOSTRAR INFORMACIÓN PRODUCTOS EN DIVPRINCIPAL---------------------------
//Oculto todo
function ocultarProductos(){
    document.getElementById('prod-camas').style.display = 'none';
    document.getElementById('prod-higiene').style.display = 'none';
    document.getElementById('prod-juguetes').style.display = 'none';
    document.getElementById('prod-accesorios').style.display = 'none';
    document.getElementById('prod-comida').style.display = 'none';
}

//Evento para cada sección del menú usando los item-categoria
const itemCategorias = document.querySelectorAll('.item-categoria');
//Primer índice camas, segundo higiene, tercero juguetes, cuarto accesorios, quinto comida
itemCategorias[0].addEventListener('click', e => {
    e.preventDefault();
    ocultarProductos();
    document.getElementById('prod-camas').style.display = 'block';
    menu.style.display = 'none'; //Oculto el menú al clicar
});

itemCategorias[1].addEventListener('click', e => {
    e.preventDefault();
    ocultarProductos();
    document.getElementById('prod-higiene').style.display = 'block';
    menu.style.display = 'none'; //Oculto el menú al clicar
});

itemCategorias[2].addEventListener('click', e => {
    e.preventDefault();
    ocultarProductos();
    document.getElementById('prod-juguetes').style.display = 'block';
    menu.style.display = 'none'; //Oculto el menú al clicar
});

itemCategorias[3].addEventListener('click', e => {
    e.preventDefault();
    ocultarProductos();
    document.getElementById('prod-accesorios').style.display = 'block';
    menu.style.display = 'none'; //Oculto el menú al clicar
});

itemCategorias[4].addEventListener('click', e => {
    e.preventDefault();
    ocultarProductos();
    document.getElementById('prod-comida').style.display = 'block';
    menu.style.display = 'none'; //Oculto el menú al clicar
});


//--------------------INICIAR SESIÓN/REGISTRARSE---------------------
const estFormulario = document.querySelector('.estFormulario');
const seccionMenu = document.getElementById('seccion-menu');
const seccionLogin = document.getElementById('seccion-login');
const seccionReg = document.getElementById('seccion-reg');
const mainContent = document.getElementById('main-content');


document.getElementById("btn-login").addEventListener("click", e => {
    e.preventDefault();
    mainContent.style.display = 'none'; //Oculta el contenido principal
    estFormulario.style.display = 'flex'; //Muestra el menú de login/registro
});

document.getElementById('btn-cerrar').addEventListener('click', e => {
    e.preventDefault();
    mainContent.style.display = 'block'; //Muestra el contenido principal
    estFormulario.style.display = 'none'; //Deja de mostrar el menú de login/registro
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

/*
Cerrar al clicar fuera del contenido
estFormulario.addEventListener('click', e => {
    if (e.target === estFormulario) {
        estFormulario.style.display = 'none';
    }
});
*/


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
    const texto = await respuestaFetch.text();

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

    const reglas = {

    // Validaciones básicas
     Nombre: /^[a-zA-Z\s]{2,50}$/,
     Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
     Iban: /^ES\d{22}$/,
     Tel: /^[6789]\d{8}$/,
     Pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    }
    
    let error = false;
    const inEmail = document.getElementById('regEmail');
    const inIban = document.getElementById('regIban');
    const inTel = document.getElementById('regTel');
    const inNombre = document.getElementById('regNombre');
    const inPass = document.getElementById('regPass');


    // Validar Nombre
    //Lo que hace .value es obtener el valor actual del campo de entrada (input) en un formulario HTML.
    if (!reglas.Nombre.test(inNombre.value)) {
        document.getElementById('regNombre').style.border = "2px solid red";
        document.getElementById('errNombre').style.visibility = 'visible'; // Muestra el mensaje de error
        error = true;
    } else {
        document.getElementById('regNombre').style.border = "rgb(227, 227, 225) solid 1px";
        document.getElementById('errNombre').style.visibility = 'hidden';  // Oculta el mensaje de error
    }

    // Validar Email
    if (!reglas.Email.test(inEmail.value)) {
        document.getElementById('regEmail').style.border = "2px solid red";
        document.getElementById('errEmail').style.visibility = 'visible'; 
        error = true;
    } else {
        document.getElementById('regEmail').style.border = "rgb(227, 227, 225) solid 1px";
        document.getElementById('errEmail').style.visibility = 'hidden'; 
    }

    // Validar IBAN
    if (!reglas.Iban.test(inIban.value)) {
        document.getElementById('regIban').style.border = "2px solid red";
        document.getElementById('errIban').style.visibility = 'visible'; 
        error = true;
    } else {
        document.getElementById('regIban').style.border = "rgb(227, 227, 225) solid 1px";
        document.getElementById('errIban').style.visibility = 'hidden'; 
    }


    // Validar Teléfono
    if (!reglas.Tel.test(inTel.value)) {
        document.getElementById('regTel').style.border = "2px solid red";
        document.getElementById('errTel').style.visibility = 'visible'; 
        error = true;
    } else {
        document.getElementById('regTel').style.border = "rgb(227, 227, 225) solid 1px";
        document.getElementById('errTel').style.visibility = 'hidden'; 
    }

    // Validar Contraseña
    if (!reglas.Pass.test(inPass.value)) {
        document.getElementById('regPass').style.border = "2px solid red";
        document.getElementById('errContrasena').style.visibility = 'visible'; 
        error = true;
    } else {
        document.getElementById('regPass').style.border = "rgb(227, 227, 225) solid 1px";
        document.getElementById('errContrasena').style.visibility = 'hidden'; 
    }
    


    const datosFormulario = new FormData();
    datosFormulario.append('nombre', document.getElementById('regNombre').value);
    datosFormulario.append('correo_electronico', document.getElementById('regEmail').value);
    datosFormulario.append('cuenta_bancaria', document.getElementById('regIban').value);
    datosFormulario.append('telefono', document.getElementById('regTel').value);
    datosFormulario.append('contrasena', document.getElementById('regPass').value);

    // Antes: fetch('./bbdd/procesar_registro.php'...)
    // 1. Enviamos al PHP
    const res = await fetch('bbdd/procesar_registro.php', { method: 'POST', body: datosFormulario });
    
    // 2. Primero obtenemos el texto de la respuesta
    const data = await res.text();
    
    const pantallaMsg = document.getElementById('msgPantallaRegistro'); // Referencia al nuevo párrafo

    if (data.includes("exitoso")) {
        // 1. Mostrar mensaje verde de éxito
        pantallaMsg.style.color = "green";
        pantallaMsg.innerText = "¡Bienvenido! Registro completado con éxito.";
        
        // 2. Esperar 2 segundos para que el usuario lo lea y recargar
        setTimeout(() => {
            location.reload();
        }, 2000);
    
    } else {
        // Mostrar mensaje de error en rojo directamente en el formulario
        pantallaMsg.style.color = "red";
        pantallaMsg.innerText = "Error: " + data;
    }
}

/*
No me funciona el registro, le doy al botón y no hace nada.
Posible causa: La ruta del fetch en enviarRegistro() es incorrecta o el archivo bbdd/procesar_registro.php no existe o tiene errores.
Solución: Verificar que la ruta es correcta y que el archivo PHP está presente y sin errores.
*/









function comprobarSesionStorage() {

    const nombre = sessionStorage.getItem('usuarioLogueado'); // CORRECCIÓN

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