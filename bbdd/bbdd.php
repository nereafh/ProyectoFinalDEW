<?php
$host = 'localhost'; 
$usuario = 'zonzamas'; //nerea, zonzamas   
$contrasena = 'Csas1234!'; //nerea, Csas1234!   
$base_de_datos = 'mascotas';  

try {
    $pdo = new PDO("mysql:host=$host;dbname=$base_de_datos", $usuario, $contrasena);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>