/*
Crear usuario con todos los privilegios con root
mysql -u root -p
CREATE USER 'nerea'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON *.* TO 'nerea'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
*/


/*
Crear la base de datos con usuario existente
mysql -u nerea -p
CREATE DATABASE IF NOT EXISTS mascotas;
GRANT ALL PRIVILEGES ON mascotas.* TO 'nerea'@'localhost';
FLUSH PRIVILEGES;

USE mascotas;
*/

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    cuenta_bancaria VARCHAR(30),
    telefono VARCHAR(15),
    contrasena VARCHAR(255) NOT NULL,  
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

