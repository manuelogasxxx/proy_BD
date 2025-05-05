//peticiones de la base de datos

//inicio de sesión
const pool = require('../config/db')
const loginUser = async (req,res)=>{
    console.log('aaa');
};

//método post
const crearUsuario = async (req,res,next)=>{
    const {username,contrasena,nombre, apellido_pat, apellido_mat} = req.body

    try {
        const result = await pool.query(
        "INSERT INTO usuarios (username,contrasena,nombre_usuario,apellido_pat_usuario, apellido_mat_usuario) VALUES ($1,$2,$3,$4,$5) RETURNING*",
        [username,contrasena,nombre, apellido_pat, apellido_mat]
        );
        res.json(result.rows[0]);    
    } catch (error) {
        next(error)
    }
    
};

const act_usuario = async (req,res,next)=>{
    const {id} = req.params;
    const {username,contrasena,nombre, apellido_pat, apellido_mat} = req.body

    try {
        const result = await pool.query(
        "UPDATE usuarios SET username=$1,contrasena=$2,nombre_usuario=$3,apellido_pat_usuario=$4, apellido_mat_usuario=$5 WHERE id_usuario=$6  RETURNING*",
        [username,contrasena,nombre, apellido_pat, apellido_mat,id]
        );
        if(result.rows.length ===0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.json(result.rows[0]);    
    } catch (error) {
        next(error)
    }
};


module.exports = {
    loginUser, crearUsuario, act_usuario
}



