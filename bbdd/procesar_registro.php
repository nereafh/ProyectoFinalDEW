<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

$servername = "localhost";
$username = "zonzamas"; 
$password = "Csas1234!"; 
$dbname = "mascotas";

// Establecemos la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si hay error de conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Recogemos y saneamos los datos para evitar Inyección SQL
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $email  = $conn->real_escape_string($_POST['correo_electronico']);
    $iban   = $conn->real_escape_string($_POST['cuenta_bancaria']);
    $tel    = $conn->real_escape_string($_POST['telefono']);
    $pass   = $_POST['contrasena'];

    // 2. Encriptamos la contraseña con BCRYPT
    $password_hashed = password_hash($pass, PASSWORD_BCRYPT);

    // 3. Intentamos realizar la inserción
    $sql = "INSERT INTO clientes (nombre, correo_electronico, cuenta_bancaria, telefono, contrasena) 
            VALUES ('$nombre', '$email', '$iban', '$tel', '$password_hashed')";

    try {
        if ($conn->query($sql) === TRUE) {
            echo "exitoso"; 
        } else {
            // Este bloque se ejecutaría si falla algo que no sea un error de SQL Exception
            echo "Error inesperado al registrar.";
        }
    } catch (mysqli_sql_exception $e) {
        // 4. Capturamos errores específicos de la base de datos
        // El código 1062 es el error de MySQL para "Duplicate entry"
        if ($e->getCode() == 1062) {
            echo "Este usuario con este email ya está registrado.";
        } else {
            // Otros errores (tabla no encontrada, columnas mal escritas, etc.)
            echo "Error técnico: " . $e->getMessage();
        }
    }
}

$conn->close();
?>