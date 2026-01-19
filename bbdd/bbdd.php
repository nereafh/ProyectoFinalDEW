<?php
$host = 'localhost'; 
$usuario = 'nerea';    
$contrasena = 'nerea';     
$base_de_datos = 'mascotas';  //Cambiar según sea

try {
    $pdo = new PDO("mysql:host=$host;dbname=$base_de_datos", $usuario, $contrasena);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>