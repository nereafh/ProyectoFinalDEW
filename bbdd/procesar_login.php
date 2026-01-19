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
    $email = $conn->real_escape_string($_POST['correo_electronico']);
    $password = $_POST['contrasena'];

    // Validar que los campos no estén vacíos
    if (empty($email) || empty($password)) {
        echo "Por favor, rellena todos los campos obligatorios.";
        exit;
    }

    // Buscar el usuario en la base de datos
    $sql = "SELECT * FROM usuarios WHERE correo_electronico = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar la contraseña usando password_verify()
        if (password_verify($password, $user['contrasena'])) {
            // La contraseña es correcta, iniciar sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nombre'];
            $_SESSION['user_email'] = $user['correo_electronico'];
            
            // Redirigir al usuario a la página principal o a una zona de usuario
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