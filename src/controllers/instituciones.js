//peticiones para las instituciones / tipo institucion //usuario_institucion
const pool = require('../config/db');


//crear institucion

//esta función ya incluye la relación con usuario_institucion
const crearInst = async(req,res,next)=>{
    const{id_usuario} = req.params;
    const {nombre,fk_tipo_institucion} = req.body;
    try {
        const result = await pool.query(
        "INSERT INTO instituciones (nombre_institucion,fk_tipo_institucion) VALUES ($1,$2) RETURNING*",
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

//ver info de una institucion
const verInst= async(req,res,next)=>{
    try {
        const{id} = req.params;
        const result = await pool.query('SELECT * FROM instituciones WHERE id_institucion=$1',[id]);
        
        if(result.rows.length ===0){
            return res.status(404).json({message:"institucion  no encontrado"})
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

//ver todas las instituciones asociadas a un usuario
//Se corrigió esta consulta
const verInstUser= async(req,res,next)=>{
    try {
        const{id_usuario, id_ins} = req.params;
        const {rows} = await pool.query(`SELECT 
                                        i.id_institucion,
                                        i.nombre_institucion,
                                        ti.nombre 
                                        FROM instituciones i 
                                        JOIN usuarios_instituciones ui ON i.id_institucion = ui.id_institucion
                                        JOIN tipo_institucion ti ON i.fk_tipo_institucion = ti.id_tipo_institucion 
                                        WHERE ui.id_usuario = $1`,
            [id_usuario]);
        
        //si no encuentra instituciones no necesariamente está mal
        /*if(rows.length ===0){
            return res.status(404).json({message:"institucion  no encontrado"})
        }*/
        res.json(rows);
    } catch (error) {
        next(error);
    }
}


//función para traer los tipo de instutuciones
const verTipoInst= async(req,res,next)=>{
    try {
        const {rows} = await pool.query('SELECT * FROM tipo_institucion',
            );
        
        if(rows.length ===0){
            return res.status(404).json({message:"Tipos de institucion  no encontrados"})
        }
        res.json(rows);
    } catch (error) {
        next(error);
    }
}

//función para borrar una institucion
const borrarInstitucion = async (req,res,next)=>{
    try {
        const {id_institucion} = req.params;
        const result= await pool.query('DELETE FROM instituciones WHERE id_institucion=$1',[id_institucion]);
        if(result.rowCount===0){
            return res.status(404).json({message:"Usuario no encontrado"});
        }
        //todo fue bien y el servidor no regresa nada
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    crearInst,verInstUser,verTipoInst,borrarInstitucion
};