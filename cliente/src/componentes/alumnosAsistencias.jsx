import React, { useState, useEffect } from 'react';

export const Asistencias=()=> {
  const [estadisticasAlumnos, setEstadisticasAlumnos] = useState([]);
  const [detallesMateria, setDetallesMateria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    const idMateria = sessionStorage.getItem('id_materia');
    const id_usuario=sessionStorage.getItem('id_usuario');
  useEffect(() => {
    const obtenerEstadisticas = async () => {
      setIsLoading(true);
      setError(null);
    
      try {
        const response = await fetch(`http://localhost:4000/estadisticasAsistencia/${idMateria}`); // Ajusta la URL de tu API
        if (!response.ok) {
          const message = `Error al obtener las estadísticas de asistencia: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setEstadisticasAlumnos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerEstadisticas();
  }, [idMateria]);

  useEffect(() => {
    
    const obtenerDetallesMateria = async () => {
      setIsLoading(true);
      setError(null);
    
      try {
        const response = await fetch(`http://localhost:4000/verDetallesMateria/${idMateria}/${id_usuario}`); // Ajusta la URL de tu API
        if (!response.ok) {
          const message = `Error al obtener los detalles de la materis: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setDetallesMateria(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerDetallesMateria();
  }, [id_usuario]);

  if (isLoading) {
    return <div>Cargando estadísticas de asistencia...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Estadísticas de Asistencia</h2>
      <h3>Profesor: {detallesMateria.nombre_usuario} {detallesMateria.apellido_p_usuario} {detallesMateria.apellido_m_usuario} </h3>
      <h3>Institucion: {detallesMateria.nombre_institucion}</h3>
      <h3>Tipo: {detallesMateria.nombre_tipo_institucion}</h3>
      <h3>Materia: {detallesMateria.nombre_materia}</h3>
      {estadisticasAlumnos.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID Alumno</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Asistencias</th>
              <th>Faltas</th>
              <th>Justificantes</th>
              <th>Total Sesiones</th>
              <th>% Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {estadisticasAlumnos.map(alumno => (
              <tr key={alumno.id_alumno}>
                <td>{alumno.id_alumno}</td>
                <td>{alumno.nombre_alumno}</td>
                <td>{alumno.apellido_p_alumno}</td>
                <td>{alumno.apellido_m_alumno}</td>
                <td>{alumno.asistencias}</td>
                <td>{alumno.faltas}</td>
                <td>{alumno.justificantes}</td>
                <td>{alumno.total_sesiones}</td>
                <td>{alumno.porcentaje_asistencia.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay estadísticas de asistencia disponibles para esta materia.</p>
      )}
    </div>
  );
}
