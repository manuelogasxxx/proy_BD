CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(16) UNIQUE NOT NULL CHECK (char_length(username) >=4),
    contrasena VARCHAR(16) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido_p VARCHAR(30) NOT NULL,
    apellido_m VARCHAR(30), 
    ultimo_login TIMESTAMP
);

CREATE TABLE tipo_institucion(
    id_tipo_institucion SERIAL PRIMARY KEY,
    nombre_tipo_institucion VARCHAR(20) NOT NULL
);

CREATE TABLE generos(
    id_genero SERIAL PRIMARY KEY,
    nombre_genero VARCHAR(20) NOT NULL
);

CREATE TABLE instituciones(
    id_institucion SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fk_tipo_institucion INT NOT NULL,
    FOREIGN KEY (fk_tipo_institucion) REFERENCES tipo_institucion(id_tipo_institucion)
);

CREATE TABLE usuarios_instituciones(
    id_usuario INT NOT NULL,
    id_institucion INT NOT NULL,
    PRIMARY KEY (id_usuario, id_institucion),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_institucion) REFERENCES instituciones(id_institucion) ON DELETE CASCADE
);