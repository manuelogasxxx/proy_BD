//peticiones a la base de datos para los alumnos
// alumnosController.js
const pool = require('../db'); // Asegúrate de que la ruta a tu archivo db.js sea correcta

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

const crearAlumno = async (req, res, next) => {
    const {id_institucion} = req.params; 
    const { nombre, apellido_p, apellido_m, fk_genero, fk_institucion } = req.body;
    try {
    const result = await pool.query(
        'INSERT INTO alumnos (nombre_alumno, apellido_p_alumno, apellido_m_alumno, fk_genero, fk_institucion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre_alumno, apellido_p_alumno, apellido_m_alumno, fk_genero, fk_institucion]
    );
    res.status(201).json(result.rows[0]);
    } catch (error) {
    next(error);
    }
};

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
  obtenerAlumnos,
  obtenerAlumnoPorId,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno,
};
