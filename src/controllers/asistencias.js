//aquí van a estar las peticiones relacionadas con las asistencias

const pool = require('../config/db');

const contarSesionesClase = async (req, res, next) => {
  try {
    const { id_materia } = req.params;
    const result = await pool.query(
      'SELECT COUNT(*) FROM sesiones_clase WHERE fk_materia = $1',
      [id_materia]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Materia no encontrada o sin sesiones registradas' });
    }

    // El resultado de COUNT(*) viene en la primera fila y primera columna, con un nombre como "count"
    const cantidadSesiones = parseInt(result.rows[0].count);

    res.json({ cantidad_sesiones: cantidadSesiones });

  } catch (error) {
    next(error);
  }
};





//la bastardita

const obtenerEstadisticasAsistenciaPorMateria = async (req, res, next) => {
    try {
        const { id_materia } = req.params;

        const query = `
            WITH AlumnosEnMateria AS (
                SELECT DISTINCT i.fk_alumno
                FROM inscripciones i
                WHERE i.fk_materia = $1
            ),
            ConteoAsistenciaPorAlumno AS (
                SELECT
                    aem.fk_alumno,
                    SUM(CASE WHEN asis.fk_tipo_lista = 1 THEN 1 ELSE 0 END) AS asistencias,
                    SUM(CASE WHEN asis.fk_tipo_lista = 2 THEN 1 ELSE 0 END) AS faltas,
                    SUM(CASE WHEN asis.fk_tipo_lista = 3 THEN 1 ELSE 0 END) AS justificantes
                FROM AlumnosEnMateria aem
                LEFT JOIN asistencias asis ON aem.fk_alumno = asis.fk_alumno
                LEFT JOIN sesiones_clase sc ON asis.fk_sesion = sc.id_sesion AND sc.fk_materia = $1
                GROUP BY aem.fk_alumno
            ),
            TotalSesionesMateria AS (
                SELECT COUNT(*) AS total_sesiones
                FROM sesiones_clase sc
                WHERE sc.fk_materia = $1
            )
            SELECT
                a.id_alumno,
                a.nombre_alumno,
                a.apellido_p_alumno,
                a.apellido_m_alumno,
                COALESCE(caa.asistencias, 0) AS asistencias,
                COALESCE(caa.faltas, 0) AS faltas,
                COALESCE(caa.justificantes, 0) AS justificantes,
                tsm.total_sesiones,
                CASE
                    WHEN tsm.total_sesiones > 0 THEN
                        (CAST(COALESCE(caa.asistencias, 0) + COALESCE(caa.justificantes, 0) AS DECIMAL(10, 2)) / tsm.total_sesiones) * 100
                    ELSE
                        0
                END AS porcentaje_asistencia
            FROM AlumnosEnMateria aem
            JOIN alumnos a ON aem.fk_alumno = a.id_alumno
            LEFT JOIN ConteoAsistenciaPorAlumno caa ON aem.fk_alumno = caa.fk_alumno
            CROSS JOIN TotalSesionesMateria tsm
            ORDER BY a.nombre_alumno;
        `;

        const result = await pool.query(query, [id_materia]);

        const estadisticasPorAlumno = result.rows.map(row => ({
            id_alumno: parseInt(row.id_alumno),
            nombre_alumno: row.nombre_alumno,
            apellido_p_alumno: row.apellido_p_alumno,
            asistencias: parseInt(row.asistencias),
            apellido_m_alumno: row.apellido_m_alumno,
            faltas: parseInt(row.faltas),
            justificantes: parseInt(row.justificantes),
            total_sesiones: parseInt(row.total_sesiones),
            porcentaje_asistencia: parseFloat(row.porcentaje_asistencia),
        }));

        res.json(estadisticasPorAlumno);

    } catch (error) {
        console.error("Error al obtener estadísticas de asistencia por materia:", error);
        next(error);
    }
};



//traer todos los datos desde el contexto de materias

const verDetalleMateria = async (req, res, next) => {
    try {
        const { id_materia, id_usuario } = req.params; // Asumo que recibes el id_usuario en los parámetros

        const query = `
            SELECT
                m.id_materia,
                m.nombre_materia,
                i.nombre_institucion,
                ti.nombre AS nombre_tipo_institucion,
                u.id_usuario,
                u.nombre AS nombre_usuario,
                u.apellido_p as apellido_p_usuario,
                u.apellido_m as apellido_m_usuario
            FROM
                materias m
            JOIN
                instituciones i ON m.fk_institucion = i.id_institucion
            JOIN
                tipo_institucion ti ON i.fk_tipo_institucion = ti.id_tipo_institucion
            JOIN
                usuarios_instituciones ui ON i.id_institucion = ui.id_institucion
            JOIN
                usuarios u ON ui.id_usuario = u.id_usuario
            WHERE
                m.id_materia = $1
                AND u.id_usuario = $2;
        `;
        const values = [id_materia, id_usuario];

        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron resultados para la materia y el usuario especificados" });
        }

        res.json(rows[0]);

    } catch (error) {
        next(error);
    }
};



//las consultas para pasar lista
//crear lista
//petición para ver las asistencias de un alumno incrito a una materia
const obtenerAsistenciasAlumno = async (req, res, next) => {
  const { id_alumno, id_materia } = req.params;

  // Query para obtener las asistencias de un alumno en una materia específica
  let query = `
    SELECT
      s.id_sesion,
      s.fecha,
      t.descripcion AS tipo_asistencia
    FROM asistencias a
    JOIN sesiones_clase s ON a.fk_sesion = s.id_sesion
    JOIN tipos_lista t ON a.fk_tipo_lista = t.id_tipo_lista
    WHERE a.fk_alumno = $1
    AND s.fk_materia = $2
    ORDER BY s.fecha ASC;  -- Ordenar por fecha de sesión
  `;

  const values = [id_alumno, id_materia];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const obtenerSesionesMateria = async (req, res, next) => {
  const { id_materia } = req.params;

  let query = `
    SELECT
      s.id_sesion,
      s.fecha::DATE
    FROM sesiones_clase s
    WHERE s.fk_materia = $1
    ORDER BY s.fecha ASC;  -- Ordenar por fecha de sesión
  `;

  const values = [id_materia];

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
module.exports={
    contarSesionesClase,
    obtenerEstadisticasAsistenciaPorMateria,
    verDetalleMateria, 
    obtenerAsistenciasAlumno,
    obtenerSesionesMateria
}