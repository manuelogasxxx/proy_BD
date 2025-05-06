const pool = require('../config/db');


//crear institucion

//esta función ya incluye la relación con usuario_institucion
const crearInst = async(req,res,next)=>{
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



module.export = {
    crearInst
};