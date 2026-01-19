<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Conexión con la base de datos
require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos JSON enviados desde el frontend
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //Validar que se recibieron todos los datos necesarios
    if (empty($data['nombre']) || empty($data['id']) || empty($data['correo']) || empty($data['telefono']) || empty($data['tarjetaBanco']) || empty($data['password'])) {
        echo json_encode(['message' => 'Faltan datos necesarios', 'status' => 'error']);
        exit;
    }

    // ¿?
    $nombre = htmlspecialchars($data['nombre']);
    $id = htmlspecialchars($data['id']);
    $correo = htmlspecialchars($data['correo']);
    $telefono = htmlspecialchars($data['telefono']);
    $tarjetaBanco = htmlspecialchars($data['tarjetaBanco']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);  // Encriptamos la contraseña

    //Si todo es correcto inserto en la base de datos
    $sql = "INSERT INTO usuarios (nombre, id, correo, telefono, tarjetaBanco, password) 
            VALUES (:nombre, :id, :correo, :telefono, :tarjetaBanco, :password)";
    
    // Ejecutar la consulta
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':tarjetaBanco', $tarjetaBanco);
        $stmt->bindParam(':password', $password);
        
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Usuario registrado correctamente', 'status' => 'success']);
        } else {
            echo json_encode(['message' => 'Error al registrar el usuario', 'status' => 'error']);
        }
    
} catch (PDOException $e) {
        echo json_encode(['message' => 'Error de base de datos: ' . $e->getMessage(), 'status' => 'error']);
    }
} else {
    echo json_encode(['message' => 'Método no permitido', 'status' => 'error']);
}