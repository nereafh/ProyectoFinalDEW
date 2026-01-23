<?php
session_start();

// Conexión a la base de datos
$servername = "localhost";
$username = "zonzamas"; //nerea
$password = "Csas1234!";  //nerea
$dbname = "mascotas";


$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = $conn->real_escape_string($_POST['nombre']);
    //$id = $conn->real_escape_string($_POST['id']); no lo recojo porque es AUTO_INCREMENT
    $email = $conn->real_escape_string($_POST['correo_electronico']);
    $cuenta_bancaria = $conn->real_escape_string($_POST['cuenta_bancaria']);
    $telefono = $conn->real_escape_string($_POST['telefono']);
    $password = $_POST['contrasena'];

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($email) || empty($password)) {
        echo "Por favor, rellena todos los campos obligatorios.";
        exit;
    }

    // Hashear la contraseña
    $password_hashed = password_hash($password, PASSWORD_BCRYPT);

    // Verificar si el correo ya existe
    $sql_check = "SELECT * FROM clientes WHERE correo_electronico = '$email' "; //OR id = '$id'
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        echo "El correo electrónico o el ID ya están registrados.";
    } else {
        // Insertar el nuevo usuario en la base de datos
        $sql = "INSERT INTO clientes (nombre, correo_electronico, cuenta_bancaria, telefono, contrasena)
                VALUES ('$nombre', '$email', '$cuenta_bancaria', '$telefono', '$password_hashed')";
        if ($conn->query($sql) === TRUE) {
            echo "Registro exitoso. Puedes iniciar sesión.";
        } else {
            echo "Error al registrar: " . $conn->error;
        }
    }

    // Cerrar la conexión
    $conn->close();
}
?>