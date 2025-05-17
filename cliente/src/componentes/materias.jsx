import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Materias = () => {
    const [materiasAPI, setMateriasAPI] = useState([]); //estado para cargar las materias
    const [isActivoToggle, setIsActivoToggle] = useState(true); //estado para el botón de filtrado
    const id_usuario = sessionStorage.getItem('id_usuario');
    const id_institucion = sessionStorage.getItem('id_institucion');
    const navigate = useNavigate();

    const verAlumnos = (id_materia) => {
        sessionStorage.setItem('id_materia', id_materia);
        navigate("alumnos");
    }

    const borrarMateria = async (id_institucion) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta materia?");
        if (confirmar) {
            try {
                const result = await fetch(`http://localhost:4000/borrarMateria/${id_institucion}`, {
                    method: "DELETE"
                })
            } catch (error) {
                console.error("Error al borrar la institucion:", error);
                //setError(error.message);
            }
        }
    }

    useEffect(() => {
        const cargarMaterias = async () => {
            try {
                let url = `http://localhost:4000/verMaterias/${id_usuario}`;

                if (isActivoToggle) {
                    url += '?activa=true'; // Añade el parámetro de consulta si el toggle está activo
                } else {
                    url += '?activa=false'; // Añade el parámetro de consulta si el toggle está inactivo
                    // Si quieres que por defecto se muestren todas, podrías omitir esta línea
                    // y el backend devolvería todos los registros al no recibir el parámetro 'activa'.
                }

                const respuesta = await fetch(url);

                if (!respuesta.ok) {
                    window.alert("no existen materias desactivadas :)");
                    setIsActivoToggle(true);
                    throw new Error(`Error al cargar las opciones: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                setMateriasAPI(datos);
                console.log(datos)
            } catch (error) {
                console.error(error.message)
            }
        };
        cargarMaterias();
    }, [isActivoToggle])
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
                            materiasAPI.map((materia) => (
                                <tr key={materia.id_materia}>
                                    <td>{materia.id_materia}</td>
                                    <td>{materia.nombre_materia}</td>
                                    <td>{materia.periodo}</td>
                                    <td>
                                        <button onClick={() => verAlumnos(materia.id_materia)}>Ver Alumnos</button>
                                        <button onClick={() => borrarMateria(materia.id_materia)}>Borrar</button>
                                        
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}