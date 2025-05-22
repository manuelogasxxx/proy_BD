//este es el panel de Alumnos
import { useForm } from "react-hook-form";
import styles from '../formularios.module.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Alumnos = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [alumnos, setAlumnos] = useState([]); //estado para cargar las materias
    const [isActivoToggleHombre, setIsActivoToggleHombre] = useState(true);
    const [isActivoToggleMujer, setIsActivoToggleMujer] = useState(true);
    const [cargando, setCargando] = useState(true); //estado para saber si está cargando los datos de la API
    const [error, setError] = useState(null); //estado para saber si existió un error en la carga de datos 
    const idMateria = sessionStorage.getItem('id_materia');
    //funciones para los botones
    const crearAlumno = () => {
        navigate("crearAlumno");
    }

    const verEstadisticas = () => {
        navigate("asistencias");
    }

    const verSesiones=()=>{
        navigate("verSesiones")
    }

    const verAsistencias=(idAlumno)=>{
        navigate("verAsistencias");
        sessionStorage.setItem('id_alumno',idAlumno);
    }


    useEffect(() => {
        //revisar el sessionStorage antes de continuar con la función
        const cargarMaterias = async () => {
            if (!idMateria) {
                setError("No se encontró el ID de usuario o el ID de institucion en el sessionStorage.");
                setCargando(false);
                return;
            }
            let genero = '';
            if (isActivoToggleHombre && isActivoToggleMujer) genero = 'T';
            else {
                if (isActivoToggleHombre) genero = 'H';
                if (isActivoToggleMujer) genero = 'M';
            }
            if (!isActivoToggleHombre && !isActivoToggleMujer) {
                setIsActivoToggleHombre(true);
                setIsActivoToggleMujer(true);
                genero = 'T';
                //poner una ventanita
            }
            try {
                let url = `http://localhost:4000/verAlumnosInscritos/${idMateria}/${genero}`;

                const respuesta = await fetch(url, {
                    method: 'GET',
                });

                if (!respuesta.ok) {
                    throw new Error(`Error al cargar las opciones: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                setAlumnos(datos);
                console.log(datos)
            } catch (error) {
                //console.error(error.message)
                setError(error.message)
            } finally {
                setCargando(false)
            }
        };
        cargarMaterias();
    }, [isActivoToggleHombre, isActivoToggleMujer])

    if (cargando) return <p>Cargando instituciones...</p>;

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h1>Panel de Alumnos</h1>
            <div>
                <h3>Operaciones generales</h3>
                <header>
                    <button onClick={()=>crearAlumno()}>Crear Alumno</button>
                    <button onClick={()=>verSesiones()}> pruebitas</button>
                </header>

            </div>
                <h3>Operaciones específicas</h3>
                <header>
                    <button onClick={() => verEstadisticas()}>Resumen de Asistencias</button>
                    <button> Resumen de calificaciones</button>
                </header>
                <label>Mostrar Hombres
                    <input
                        type="checkbox"
                        checked={isActivoToggleHombre}
                        onChange={(e) => setIsActivoToggleHombre(e.target.checked)}
                    />
                </label>
                <label>Mostrar Mujeres
                    <input
                        type="checkbox"
                        checked={isActivoToggleMujer}
                        onChange={(e) => setIsActivoToggleMujer(e.target.checked)}
                    />
                </label>
            <div>
                {
                    alumnos.length === 0 ? (
                        <p>No hay alumnos inscritos</p>
                    ) : (
                        <div>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido P</th>
                                        <th>Apellido M</th>
                                        <th>genero</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        alumnos.map((alumno) => (
                                            <tr key={alumno.id_alumno}>
                                                <td>{alumno.nombre_alumno}</td>
                                                <td>{alumno.apellido_p_alumno}</td>
                                                <td>{alumno.apellido_m_alumno}</td>
                                                <td>{alumno.gen}</td>

                                                <td>
                                                    <button onClick={()=>verAsistencias(alumno.id_alumno)} >Ver Asistencias</button>
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


//se supone que aquí voy a poner las otras cosas

export const CrearAlumno = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [opcionesAPI, setOpcionesAPI] = useState([]);
    const [cargandoOpciones, setCargandoOpciones] = useState(true);
    const [errorCargaOpciones, setErrorCargaOpciones] = useState(null);
    const idInstitucion=sessionStorage.getItem('id_institucion');
    const idMateria=sessionStorage.getItem('id_materia');
    useEffect(() => {
        const cargarOpciones = async () => {
        try {
            const respuesta = await fetch('http://localhost:4000/verGeneros');
            if (!respuesta.ok) {
            throw new Error(`Error al cargar los generos: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setOpcionesAPI(datos);
            setCargandoOpciones(false);
        } catch (error) {
            console.error("Error al cargar las opciones de la API:", error);
            setErrorCargaOpciones(error.message);
            setCargandoOpciones(false);
        }
        };

        cargarOpciones();
    }, []);
    //falta crear esa parte
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        try {
            const res = await fetch(`http://localhost:4000/crearAlumno/${idInstitucion}/${idMateria}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: data.nombre,
                    apellido_p: data.apellido_p,
                    apellido_m: data.apellido_m,
                    apellido_pat: data.apellido_pat,
                    fk_genero: data.atributo_api
                })
            });
            if (!res.ok) {
                // Si el estado no es OK (2xx), lanzar un error con el mensaje de la API
                const errorData = await res.json(); // Intentar obtener el mensaje de error del cuerpo
                throw new Error(errorData.message || 'Error al crear el usuario'); // Usar un mensaje genérico si no hay uno específico
            }
            navigate("/inicio/materias/alumnos");
            alert("Alumno creado correctamente");
        } catch (error) {
            alert(error.message)
        }
    }
    );

    //para los errores
    if (cargandoOpciones) return <p>Cargando generos...</p>;

    if (errorCargaOpciones) return <p style={{ color: "red" }}>Error: {errorCargaOpciones}</p>;

    return (
        <div>
            <div>
                <h2> Formulario de Alumnos</h2>
            </div>

            <form onSubmit={onSubmit}>
                <label htmlFor="nombre" className={styles.pruebita}>Nombre</label>
                <input
                    type="text"
                    {...register("nombre", {
                        required: {
                            value: true,
                            message: "usuario es requerido"
                        },
                        minLength: {
                            value: 4,
                            message: "usuario debe tener al menos 4 caracteres"
                        },
                        maxLength: {
                            value: 16,
                            message: "usuario debe tener máximo 16 caracteres"
                        }
                    })}
                />
                {
                    errors.nombre && <span> {errors.nombre.message}</span>
                }

                <label htmlFor="apellido_p" className={styles.pruebita}>Apellido Paterno</label>
                <input
                    type="text"
                    {...register("apellido_p", {
                        required: {
                            value: true,
                            message: "apellido paterno es requerido"
                        },
                        minLength: {
                            value: 1,
                            message: "apellido paterno debe tener al menos 1 caracteres"
                        },
                        maxLength: {
                            value: 30,
                            message: "apellido paterno debe tener máximo 30 caracteres"
                        }
                    })}
                />
                {
                    errors.apellido_p && <span> {errors.apellido_p.message}</span>
                }

                <label htmlFor="apellido_m" className={styles.pruebita}>Apellido Materno</label>
                <input
                    type="text"
                    {...register("apellido_m", {
                        maxLength: {
                            value: 30,
                            message: "usuario debe tener máximo 30 caracteres"
                        }
                    })}
                />
                {
                    errors.apellido_m && <span> {errors.apellido_m.message}</span>
                }
                <label htmlFor="atributo_api" className={styles.pruebita}>Selecciona un genero</label>
                <select
                    id="atributo_api"
                    {...register("atributo_api", {
                        required: {
                            value: true,
                            message: "Debes seleccionar un genero",
                        },
                    })}
                >
                    <option value="">Selecciona una opción</option>
                    {opcionesAPI.map((opcion) => (
                        <option key={opcion.id_genero} value={opcion.id_genero}> {/* Ajusta 'id' y 'valor' según la estructura de tu API */}
                            {opcion.nombre_genero} {/* Ajusta 'nombre_mostrar' según la estructura de tu API */}
                        </option>
                    ))}
                </select>
                {errors.atributo_api && <span>{errors.atributo_api.message}</span>}

                <button type="submit" className={styles.pruebita}>
                    Enviar
                </button>

            </form>
        </div>
    )
}