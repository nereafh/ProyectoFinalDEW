<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// procesar_registro.php
$servername = "localhost";
$username = "zonzamas"; 
$password = "Csas1234!"; 
$dbname = "mascotas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recogemos los datos que envía el FormData del JS
    $nombre = $_POST['nombre'];
    $email = $_POST['correo_electronico'];
    $iban = $_POST['cuenta_bancaria'];
    $tel = $_POST['telefono'];
    $pass = $_POST['contrasena'];

    // Encriptamos la clave
    $password_hashed = password_hash($pass, PASSWORD_BCRYPT);

    // SQL que coincide exactamente con tu tabla 'clientes'
    $sql = "INSERT INTO clientes (nombre, correo_electronico, cuenta_bancaria, telefono, contrasena) 
            VALUES ('$nombre', '$email', '$iban', '$tel', '$password_hashed')";

    if ($conn->query($sql) === TRUE) {
        echo "exitoso"; 
    } else {
        echo "Error en la base de datos: " . $conn->error;
    }
}
$conn->close();
?>