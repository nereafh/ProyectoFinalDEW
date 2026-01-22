<?php

//Conexión a la base de datos
session_start();

$servername = "localhost";
$username = "nerea";
$password = "nerea";  
$dbname = "mascotas";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $loginEmail = $conn->real_escape_string($_POST['correo_electronico']);
    $loginPass = $_POST['contrasena'];

    // Validar que los campos no estén vacíos
    if (empty($loginEmail) || empty($loginPass)) {
        echo "Por favor, rellena todos los campos obligatorios.";
        exit;
    }

    // Buscar el usuario en la base de datos
    $sql = "SELECT * FROM clientes WHERE correo_electronico = '$loginEmail'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar la contraseña
        if (password_verify($loginPass, $user['contrasena'])) {
            // La contraseña es correcta, iniciar sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nombre'];
            $_SESSION['user_email'] = $user['correo_electronico'];
            
            // Redirigir al usuario 
            echo "Bienvenido, " . $user['nombre'] . "!";
            // header('Location: home.php');  // Descomenta para redirigir después del login
        } else {
            echo "Correo electrónico o contraseña incorrectos.";
        }
    } else {
        echo "Usuario no encontrado.";
    }

    // Cerrar la conexión
    $conn->close();
}
?>