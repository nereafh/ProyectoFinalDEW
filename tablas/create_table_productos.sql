CREATE TABLE IF NOT EXISTS productos (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
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
('Pelota Irrompible', 'Juguete de caucho natural ultra resistente para morder.', 'img/juguete2.jpg', 8.95, 'Disponible'),
('Correa Extensible', 'Correa de 5 metros con freno de seguridad y mango ergonómico.', 'img/accesorio1.jpg', 19.50, 'Disponible'),
('Pienso Salmón Premium', 'Alimento sin cereales rico en Omega 3 para piel sana.', 'img/comida1.jpg', 32.00, 'Disponible');
*/

