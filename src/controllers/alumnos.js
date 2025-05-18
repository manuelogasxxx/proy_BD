//peticiones a la base de datos para los alumnos
// alumnosController.js
const pool = require('../config/db'); // Asegúrate de que la ruta a tu archivo db.js sea correcta

//en este archivo tambien se incluyen las consultas para inscripciones



const obtenerAlumnoPorId = async (req, res, next) => {
  const { id_alumno } = req.params;
  try {
    const result = await pool.query('SELECT * FROM alumnos WHERE id_alumno = $1', [id_alumno]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//ver a los alumnos inscritos a una materia en particular
const obtenerAlumnosInscritos = async (req, res, next) => {
  const { id_materia, genero } = req.params;
  //para género T,H,M
  let query = `
    SELECT
      a.id_alumno,
      a.nombre_alumno,
      a.apellido_p_alumno,
      a.apellido_m_alumno,
      g.nombre_genero AS gen
    FROM inscripciones i
    JOIN alumnos a ON i.fk_alumno = a.id_alumno
    JOIN generos g ON a.fk_genero = g.id_genero
    WHERE i.fk_materia = $1 AND i.activa = TRUE
  `;
  const values = [id_materia];

  if (genero==='H') {
    query += ` AND g.id_genero = 2`;
  }
  else{
    if(genero==='M'){
      query += ` AND g.id_genero = 1`
    }  
  }

  query += ` ORDER BY a.apellido_p_alumno ASC`; // Agregamos la cláusula ORDER BY

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

//neceaita una segunda consulta para poder inscribir al alumno
const crearAlumno = async (req, res, next) => {
    const {id_inst} = req.params;
    const {id_materia}=req.params;
    const { nombre, apellido_p, apellido_m, fk_genero} = req.body;
    try {
    const result = await pool.query(
        'INSERT INTO alumnos (nombre_alumno, apellido_p_alumno, apellido_m_alumno, fk_genero, fk_institucion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, apellido_p, apellido_m, fk_genero, id_inst]
    );
    const id_alumno= result.rows[0].id_alumno;
    //hacer la otra inserción
    const result1 = await pool.query(
            'INSERT INTO inscripciones (fk_alumno,fk_materia, fecha_inscripcion) VALUES ($1,$2,NOW()) RETURNING*',
            [id_alumno,id_materia]
        );
    await pool.query('COMMIT');
    res.status(201).json({message: "institucion creada y relacion establexida",
                            materia_creada: result.rows[0],
                            inscripcion:result1.rows[0]});

    res.status(201).json(result.rows[0]);
    } catch (error) {
    next(error);
    }
};


//ver alumnos inscritos

const actualizarAlumno = async (req, res, next) => {
  const { id } = req.params;
  const { nombre_alumno, apellido_p_alumno, apellido_m_alumno, fk_genero, fk_institucion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE alumnos SET nombre_alumno = $2, apellido_p_alumno = $3, apellido_m_alumno = $4, fk_genero = $5, fk_institucion = $6 WHERE id_alumno = $1 RETURNING *',
      [id, nombre_alumno, apellido_p_alumno, apellido_m_alumno, fk_genero, fk_institucion]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const eliminarAlumno = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM alumnos WHERE id_alumno = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(204).send(); // 204 No Content para indicar eliminación exitosa
  } catch (error) {
    next(error);
  }
};

module.exports = {

  crearAlumno,
  obtenerAlumnosInscritos

};
