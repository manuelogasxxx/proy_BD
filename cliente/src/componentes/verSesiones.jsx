import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";


export const VerSesiones =()=>{
    const [sesiones, setSesiones] = useState([]); //cargar la información de la API
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const idMateria = sessionStorage.getItem("id_materia");

    useEffect(() => {
    //sessionStorage.removeItem('id_institucion');
        const cargarSesiones = async () => {
        if (!idMateria) {
            setError("No se encontró el ID de la meteria en el sessionStorage.");
            setCargando(false);
            return;
        }
        try {
            const respuesta = await fetch(`http://localhost:4000/verSesionesMateria/${idMateria}`);
            if (!respuesta.ok) {
            throw new Error(`Error al cargar las instituciones1: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setSesiones(datos);
        } catch (error) {
            //console.error("Error al cargar las opciones de la API:", error);
            setError(error.message);
        }
        finally {
            setCargando(false);
        }
        };
        cargarSesiones();
    }, [idMateria]);


    const borrarSesion =async (idSesion)=>{
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta sesion? se borrarán todas las asistencias asociadas");
        if(!confirmar) return;

        try {
            const res = await fetch(`http://localhost:4000/borrarMateria/${idMateria}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al borrar la institución");
            }
            alert("Institución eliminada correctamente.");
            setSesiones(prev => prev.filter(i => i.id_materia !== idMateria));
        } catch (error) {
            //console.error("Error al borrar la institucion:", error);
            alert("Ocurrió un error al eliminar: " + error.message);
            setError(error.message);
        }
    }

    if (cargando) return <p>Cargando instituciones...</p>;

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return(
        <div>
            <h2>Sesiones clase</h2>

            
                <div>
                {
                    sesiones.length === 0 ? (
                        <p>No hay sesiones registradas</p>
                    ) : (
                        <div>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>fecha</th>
                                        <th>Operaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sesiones.map((sesion) => (
                                            <tr key={sesion.id_sesion}>
                                                <td>{sesion.id_sesion}</td>
                                                <td>{format(
                                                    new Date(sesion.fecha),
                                                    "dd 'de' MMMM 'de' yyyy",
                                                    { locale: es }
                                                )}</td>
                                                <td>
                                                    <button onClick={()=>borrarSesion(sesion.id_sesion)}>Borrar</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    )
                }
            </div>
            
        </div>
    )
}




export const VerAsistencias =()=>{
    const [asistencias, setAsistencias] = useState([]); //cargar la información de la API
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const idMateria = sessionStorage.getItem("id_materia");
    const idAlumno = sessionStorage.getItem("id_alumno");

    useEffect(() => {
    //sessionStorage.removeItem('id_institucion');
        const cargarSesiones = async () => {
        if (!idMateria || !idAlumno) {
            setError("No se encontró el ID de la materia o el usuario en el sessionStorage.");
            setCargando(false);
            return;
        }
        try {
            const respuesta = await fetch(`http://localhost:4000/verAsistenciasAlumno/${idMateria}/${idAlumno}`);
            if (!respuesta.ok) {
            throw new Error(`Error al cargar las instituciones1: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setAsistencias(datos);
        } catch (error) {
            //console.error("Error al cargar las opciones de la API:", error);
            setError(error.message);
        }
        finally {
            setCargando(false);
        }
        };
        cargarSesiones();
    }, [idMateria,idAlumno]);


    //actualizar estado de la asistencia
    /*const borrarSesion =async (idSesion)=>{
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta sesion? se borrarán todas las asistencias asociadas");
        if(!confirmar) return;

        try {
            const res = await fetch(`http://localhost:4000/borrarMateria/${idMateria}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al borrar la institución");
            }
            alert("Institución eliminada correctamente.");
            setSesiones(prev => prev.filter(i => i.id_materia !== idMateria));
        } catch (error) {
            //console.error("Error al borrar la institucion:", error);
            alert("Ocurrió un error al eliminar: " + error.message);
            setError(error.message);
        }
    }*/

    if (cargando) return <p>Cargando instituciones...</p>;

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return(
        <div>
            <h2>Asistencias de alumno</h2>

            
                <div>
                {
                    asistencias.length === 0 ? (
                        <p>No hay asistencias registradas para el alumno</p>
                    ) : (
                        <div>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>fecha</th>
                                        <th>tipo</th>
                                        <th>acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        asistencias.map((asistencia) => (
                                            <tr key={asistencia.id_sesion}>
                                                <td>{asistencia.id_sesion}</td>
                                                <td>{format(
                                                    new Date(asistencia.fecha),
                                                    "dd 'de' MMMM 'de' yyyy",
                                                    { locale: es }
                                                )}</td>
                                                <td>{asistencia.tipo_asistencia}</td>
                                                <td>
                                                    <button >Borrar</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    )
                }
            </div>
            
        </div>
    )
}