CREATE TABLE IF NOT EXISTS productos (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    descripcion TEXT,
    imagen TEXT,
    precio FLOAT,
    disponibilidad VARCHAR(255)
);