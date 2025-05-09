const pool = require('../config/db');

const crearMateria = async(req,res,next)=>{
    const{id_inst} = req.params;
    const {nombre_materia,periodo,fk_institucion} = req.body;
    try {
        const result = await pool.query(
        "INSERT INTO materias (nombre_materia, periodo, fk_institucion) VALUES ($1,$2,$3) RETURNING*",
        [nombre_materia,periodo,id_inst]
        );
        await pool.query('COMMIT');
        res.status(201).json({message: "Materia creada correctamente",
                            materiaCreada: result.rows[0]});    
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    }
}

//al actualizar una materia no se puede cambiar de institución
const actMateria = async(req,res,next)=>{
    const {id_materia} = req.params;
    const {nombre_materia,periodo,activa} = req.body;
    try {
        const result = await pool.query(
            "UPDATE materias SET nombre_materia =$1, periodo=$2, activa=$3 WHERE id_materia=$4 RETURNING*",
            [nombre_materia,periodo,activa,id_materia]
        );
        if(result.rows.length===0){
            //error específico
            return res.status(404).json({message:"materia no encontarda"});
        }
        pool.query('COMMIT')
        return res.json(result.rows[0]);
    } catch (error) {
        pool.query('ROLLBACK');
        next(error)
    }
}

const borrarMateria = async (req,res,next)=>{
    try {
        const {id_materia} = req.params;
        const result= await pool.query('DELETE FROM materias WHERE id_materia=$1',[id_materia]);
        if(result.rowCount===0){
            return res.status(404).json({message:"Usuario no encontrado"});
        }
        //todo fue bien y el servidor no regresa nada
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

//ver materias relacionadas a una institucion y un usuario
const verMaterias= async(req,res,next)=>{
    try {
        const{id_usuario} = req.params;
        const {rows} = await pool.query('SELECT m.nombre_materia,m.periodo,m.activa FROM materias m JOIN instituciones i ON m.fk_institucion =i.id_institucion JOIN usuarios_instituciones ui ON i.id_institucion = ui.id_institucion WHERE ui.id_usuario=$1',
            [id_usuario]);
        
        if(rows.length ===0){
            return res.status(404).json({message:"materias no encontradas"})
        }
        res.json(rows);
    } catch (error) {
        next(error);
    }
}


//ver materia singualarmente










module.exports ={
    crearMateria, actMateria, borrarMateria,verMaterias
};