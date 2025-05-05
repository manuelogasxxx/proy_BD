//peticiones de la base de datos

//inicio de sesión
const pool = require('../config/db')
const loginUser = async (req,res)=>{
    console.log('aaa');
};

//método post
const crearUsuario = async (req,res)=>{
    const {username,contrasena,nombre, apellido_pat, apellido_mat} = req.body

    try {
        const result = await pool.query(
        "INSERT INTO usuarios (username,contrasena,nombre_usuario,apellido_pat_usuario, apellido_mat_usuario) VALUES ($1,$2,$3,$4,$5) RETURNING*",
        [username,contrasena,nombre, apellido_pat, apellido_mat]
        );
        res.json(result.rows[0]);    
    } catch (error) {
        res.json({error: error.message});
    }
    
};


module.exports = {
    loginUser, crearUsuario
}



