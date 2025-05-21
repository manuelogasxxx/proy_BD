import { Link,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

export const Materias = () => {
    const [materias, setMaterias] = useState([]); //estado para cargar las materias
    const [isActivoToggle, setIsActivoToggle] = useState(true); //estado para el botón de filtrado
    const [cargando, setCargando] = useState(true); //estado para saber si está cargando los datos de la API
    const [error, setError] = useState(null); //estado para saber si existió un error en la carga de datos
    const idUsuario = sessionStorage.getItem('id_usuario');
    const idInstitucion = sessionStorage.getItem('id_institucion');
    const navigate = useNavigate();

    const verAlumnos = (idMateria) => {
        sessionStorage.setItem('id_materia', idMateria);
        navigate("alumnos");
    }

    const borrarMateria = async (idMateria) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta materia?");
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
            setMaterias(prev => prev.filter(i => i.id_materia !== idMateria));
        } catch (error) {
            //console.error("Error al borrar la institucion:", error);
            alert("Ocurrió un error al eliminar: " + error.message);
            setError(error.message);
        }
        
    }

    useEffect(() => {
        const cargarMaterias = async () => {
            //se comprueba que exiatan datos en el sessionStorage
            if (!idUsuario || !idInstitucion ) {
                setError("No se encontró el ID de usuario o el ID de institucion en el sessionStorage.");
                setCargando(false);
                return;
            }
            try {
                let url = `http://localhost:4000/verMaterias/${idUsuario}/${idInstitucion}`;
                url += `?activa=${isActivoToggle}`;
                /*if (isActivoToggle) {
                    url += '?activa=true'; // Añade el parámetro de consulta si el toggle está activo
                } else {
                    url += '?activa=false'; // Añade el parámetro de consulta si el toggle está inactivo
                    // Si quieres que por defecto se muestren todas, podrías omitir esta línea
                    // y el backend devolvería todos los registros al no recibir el parámetro 'activa'.
                }*/
                const respuesta = await fetch(url);

                if (!respuesta.ok) {
                    setIsActivoToggle(true);
                    throw new Error(`No se pudieron cargar las materias: ${respuesta.status}`);
                    //throw new Error(`Error al cargar las opciones: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                setMaterias(datos);
                //console.log(datos)
            } catch (error) {
                //console.error(error.message)
                setError(error.message);
            }finally{
                setCargando(false)
            }
        };
        cargarMaterias();
    }, [isActivoToggle])

    //para los errores
    if (cargando) return <p>Cargando instituciones...</p>;

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;


    return (
        <div>
            <h1>Panel de Materias </h1>
            <header>
                <Link to="crearMaterias">Crear Materia</Link>

            </header>
            <div>
                <label>
                    Mostrar solo materias activas:
                    <input
                        type="checkbox"
                        checked={isActivoToggle}
                        onChange={(e) => setIsActivoToggle(e.target.checked)}
                    />
                </label>
            </div>
            <h1>Lista de materias</h1>
            {
                materias.length === 0 ?(
                    <p> No hay materias registradas</p>
                ):(
                    <div>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Periodo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    materias.map((materia) => (
                                        <tr key={materia.id_materia}>
                                            <td>{materia.id_materia}</td>
                                            <td>{materia.nombre_materia}</td>
                                            <td>{materia.periodo}</td>
                                            <td>
                                                <button onClick={() => verAlumnos(materia.id_materia)}>Ver Alumnos</button>
                                                <button onClick={() => borrarMateria(materia.id_materia)}>Borrar</button>
                                                <button> Actualizar</button>
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
    )

}