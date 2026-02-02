<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "zonzamas"; //nerea, zonzamas
$password = "Csas1234!";  //nerea, Csas1234!
$dbname = "mascotas";


try {
    $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $img_id = $_GET['id_img'] ?? '';

    // Busca la fila donde la ruta de la imagen contenga el ID del carrusel
    $stmt = $conexion->prepare("SELECT * FROM productos WHERE imagen LIKE :img LIMIT 1");
    $stmt->execute(['img' => "%$img_id%"]);
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($producto ? $producto : ["error" => "No encontrado"]);
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>