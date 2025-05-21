//peticiones de la base de datos

//inicio de sesión
const pool = require('../config/db')


//método post
const crearUsuario = async (req,res,next)=>{
    const {username,contrasena,nombre, apellido_p, apellido_m} = req.body
    console.log('Datos recibidos:', { username, contrasena, nombre, apellido_p, apellido_m });
    try {
        const result = await pool.query(
        "INSERT INTO usuarios (username,contrasena,nombre,apellido_p, apellido_m) VALUES ($1,$2,$3,$4,$5) RETURNING*",
        [username,contrasena,nombre, apellido_p, apellido_m]
        );
        console.log('Resultado de la consulta:', result.rows[0]);
        res.json(result.rows[0]);    
    } catch (error) {
        next(error)
    }
};

//metodo put
const actUsuario = async (req,res,next)=>{
    const {id} = req.params;
    const {username,contrasena,nombre, apellido_p, apellido_m} = req.body

    try {
        const result = await pool.query(
        "UPDATE usuarios SET username=$1,contrasena=$2,nombre=$3,apellido_p=$4, apellido_m=$5 WHERE id_usuario=$6  RETURNING*",
        [username,contrasena,nombre, apellido_p, apellido_m,id]
        );
        if(result.rows.length ===0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.json(result.rows[0]);    
    } catch (error) {
        next(error)
    }
};

//metodo get
const loginUsuario= async(req,res,next)=>{
    try {
        const{ username, contrasena} = req.body;
        const result = await pool.query(
            'SELECT id_usuario, username FROM usuarios WHERE username=$1 AND contrasena=$2',
            [username,contrasena]
        );
        if(result.rows.length ===0){
            return res.status(401).json({message:"credenciales inválidas"})
        }
        const usuario=result.rows[0];
        await pool.query(
            'UPDATE usuarios SET ultimo_login = NOW() WHERE id_usuario = $1',
            [usuario.id_usuario]
        );
        res.json({ message: 'Inicio de sesión exitoso', user: result.rows[0] }); 
    } catch (error) {
        next(error);
    }
}

//función para ver el usuario

//metodo get
const verUsuario= async(req,res,next)=>{
    try {
        const{id} = req.params;
        const result = await pool.query('SELECT username, contrasena, nombre, apellido_p,apellido_m,ultimo_login FROM usuarios WHERE id_usuario=$1',[id]);
        
        if(result.rows.length ===0){
            return res.status(404).json({message:"usuario no encontrado"})
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const borrarUsuario = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const result= await pool.query('DELETE FROM usuarios WHERE id_usuario=$1',[id]);
        if(result.rowCount===0){
            return res.status(404).json({message:"Usuario no encontrado"});
        }
        //todo fue bien y el servidor no regresa nada
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const crearInstitucion = async(req,res,next)=>{
    const{id_usuario} = req.params;
    const {nombre,fk_tipo_institucion} = req.body;
    try {
        const result = await pool.query(
        "INSERT INTO instituciones (nombre,fk_tipo_institucion) VALUES ($1,$2) RETURNING*",
        [nombre,fk_tipo_institucion]
        );
        //recupera el id de la institución creada
        const id_institucion = result.rows[0].id_institucion;
        //crea la relación
        const result1 = await pool.query(
            'INSERT INTO usuarios_instituciones (id_usuario,id_institucion) VALUES ($1,$2) RETURNING*',
            [id_usuario,id_institucion]
        );
        await pool.query('COMMIT');
        res.status(201).json({message: "institucion creada y relacion establexida",
                            istitucionCreada: result.rows[0],
                            relacionUsuarioInstitucion:result1.rows[0]});    
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    } 
};


//función para ver los géneros
const verGeneros= async(req,res,next)=>{
    try {
        const {rows} = await pool.query('SELECT * FROM generos',
            );
        
        if(rows.length ===0){
            return res.status(404).json({message:"Géneros no encontrados"})
        }
        res.json(rows);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginUsuario, crearUsuario, actUsuario,verUsuario,borrarUsuario,crearInstitucion,verGeneros
}



