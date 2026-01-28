CREATE TABLE IF NOT EXISTS productos (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    descripcion TEXT,
    imagen TEXT,
    precio FLOAT,
    disponibilidad VARCHAR(255)
);

/*
-- Ejemplo de inserción 
INSERT INTO productos (Nombre, descripcion, imagen, precio, disponibilidad) 
VALUES 
('Cama Confort', 'Cama ultra suave para perros grandes', 'img/cama1.jpg', 45.99, 'Disponible'),
('Champú Pro', 'Champú neutro para pieles sensibles', 'img/higiene1.jpg', 12.50, 'Disponible');
*/