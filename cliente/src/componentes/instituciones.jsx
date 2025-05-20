import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Instituciones = () => {
  const [instituciones, setInstituciones] = useState([]); //cargar la información de la API
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const idUsuario = sessionStorage.getItem('id_usuario');
  const navigate = useNavigate();
  useEffect(() => {
    //sessionStorage.removeItem('id_institucion');
    const cargarInstituciones = async () => {
      if (!idUsuario) {
        setError("No se encontró el ID de usuario en el sessionStorage.");
        setCargando(false);
        return;
      }
      try {
        const respuesta = await fetch(`http://localhost:4000/verInst/${idUsuario}`);
        if (!respuesta.ok) {
          throw new Error(`Error al cargar las instituciones1: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setInstituciones(datos);
      } catch (error) {
        console.error("Error al cargar las opciones de la API:", error);
        setError(error.message);
      }
      finally {
        setCargando(false);
      }
    };
    cargarInstituciones();
  }, [idUsuario]);//id_usuario

  const verMaterias = (idInstitucion) => {
    sessionStorage.setItem('id_institucion', idInstitucion);
    //console.log(sessionStorage.getItem('id_institucion'))
    navigate("materias");
  }

  const borrarInstitucion = async (idInstitucion) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta institución?");
    if (confirmar) {
      try {
        const res = await fetch(`http://localhost:4000/borrarInst/${idInstitucion}`, {
          method: "DELETE"
        })
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al borrar la institución");
        }
        alert("Institución eliminada correctamente.");
        setInstituciones(prev => prev.filter(i => i.id_institucion !== idInstitucion));
      } catch (error) {
        console.error("Error al borrar la institucion:", error);
        alert("Ocurrió un error al eliminar: " + error.message);
        setError(error.message);
      }
    }
  }

  //para los errores
  if (cargando) return <p>Cargando instituciones...</p>;

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Panel de Instituciones</h1>
      <header>
        <Link to="crearInstitucion">CrearInstitucion</Link>
      </header>

      <div>
        <h3>Lista de Instituciones</h3>
        {
          instituciones.length === 0 ? (
            <p>No hay instituciones registradas.</p>
          ) : (
              <table border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {instituciones.map((institucion) => (
                    <tr key={institucion.id_institucion}>
                      <td>{institucion.id_institucion}</td>
                      <td>{institucion.nombre_institucion}</td>
                      <td>{institucion.nombre}</td>
                      <td>
                        <button onClick={() => verMaterias(institucion.id_institucion)}>ver</button>
                        <button onClick={() => borrarInstitucion(institucion.id_institucion)}>borrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          )}
      </div>

    </div>
  )
}