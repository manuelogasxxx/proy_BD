import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useForm } from "react-hook-form";
import styles from "../formularios.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export const VerUsuario = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const [cargandoOpciones, setCargandoOpciones] = useState(true);
    const [errorCarga, setErrorCarga] = useState(null);
    const [ultimoLogin, setUltimoLogin] = useState(null);
    const [idUsuario] = useState(sessionStorage.getItem('id_usuario'));
    useEffect(() => {
        const cargarOpciones = async () => {
            try {
                const respuesta = await fetch(`http://localhost:4000/verUsuario/${idUsuario}`);
                if (!respuesta.ok) {
                    throw new Error(`Error al cargar las opciones: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                setCargandoOpciones(false);
                //establecer los campos del formulario
                setValue("username", datos.username);
                setValue("contrasena", datos.contrasena);
                setValue("nombre", datos.nombre);
                setValue("apellido_p", datos.apellido_p);
                setValue("apellido_m", datos.apellido_m);
                setUltimoLogin(datos.ultimo_login);
                console.log(datos);
            } catch (error) {
                console.error("Error al cargar las opciones de la API:", error);
                setErrorCarga(error.message);
            }finally{
                setCargandoOpciones(false);
            }
        };
        if (idUsuario) {
            cargarOpciones();
        }
    }, [idUsuario]);

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const id = sessionStorage.getItem("id_usuario");
        const confirmar = window.confirm(
            "¿Desea actualizar el usuario? será redirigido al LOGIN"
        );
        if (confirmar && id) {
            try {
                const res = await fetch(`http://localhost:4000/actUsuario/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: data.username,
                        contrasena: data.contrasena,
                        nombre: data.nombre,
                        apellido_p: data.apellido_p,
                        apellido_m: data.apellido_m,
                    }),
                });
                if (!res.ok) {
                    // Si el estado no es OK (2xx), lanzar un error con el mensaje de la API
                    const errorData = await res.json(); // Intentar obtener el mensaje de error del cuerpo
                    throw new Error(
                        errorData.message || "Error al actualizar el usuario"
                    ); // Usar un mensaje genérico si no hay uno específico
                }
                sessionStorage.clear();
                navigate("/");
            } catch (error) {
                alert(error.message);
            }
        }
    });


    //función para borrar el usuario
    const borrarUsuario= async ()=>{
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar el usuario? Se perdeá todooo!");
        if(!confirmar) return;
        
        try {
            const res = await fetch(
                `http://localhost:4000/borrarUsuario/${idUsuario}`,
                {
                    method: "DELETE",
                }
            );
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al borrar el usuario");
            }

            alert("Usuario eliminado exitosamente.");
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            console.error("Error al borrar al usuario:", error);
            setErrorCarga(error.message);
        }
      }

    //esta es una parte complementaria para los errores
    if (cargandoOpciones) {
      return <p>Cargando datos del usuario...</p>; // o spinner
    }

    if (errorCarga) {
      return <p style={{ color: "red" }}>Error: {errorCarga}</p>;
    }

    //return principal
    return (
        <div>
            <div>
                <h2>Información de Usuario</h2>
            </div>
            {ultimoLogin && (
                <label>
                    Último login:{" "}
                    {format(
                        new Date(ultimoLogin),
                        "dd 'de' MMMM 'de' yyyy 'a las' HH:mm:ss",
                        { locale: es }
                    )}
                </label>
            )}

            <div>
                <label>¿eliminar usuario? </label>
                <button onClick={()=>borrarUsuario()} className={styles.pruebita}>Eliminar Usuario</button>
            </div>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="usuario" className={styles.pruebita}>
                        usuario
                    </label>
                    <input
                        type="text"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "usuario es requerido",
                            },
                            minLength: {
                                value: 4,
                                message: "usuario debe tener al menos 4 caracteres",
                            },
                            maxLength: {
                                value: 16,
                                message: "usuario debe tener máximo 16 caracteres",
                            },
                        })}
                    />
                    {errors.username && <span> {errors.username.message}</span>}
                </div>

                <div>
                    <label htmlFor="contrasena" className={styles.pruebita}>
                        contraseña
                    </label>
                    <input
                        type="password"
                        {...register("contrasena", {
                            required: {
                                value: true,
                                message: "contraseña es requerida",
                            },
                            minLength: {
                                value: 8,
                                message: "contraseña debe tener al menos 8 caracteres",
                            },
                            maxLength: {
                                value: 16,
                                message: "contraseña debe tener máximo 16 caracteres",
                            },
                        })}
                    />
                    {errors.contrasena && <span> {errors.contrasena.message}</span>}
                </div>

                <div>
                    <label htmlFor="confirmarContraseña" className={styles.pruebita}>
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        {...register("confirmarContrasena", {
                            required: {
                                value: true,
                                message: "confirmar contraseña es requerida",
                            },
                            minLength: {
                                value: 8,
                                message: "contraseña debe tener al menos 8 caracteres",
                            },
                            maxLength: {
                                value: 16,
                                message: "contraseña debe tener máximo 16 caracteres",
                            },
                            validate: (value) => {
                                if (value === watch("contrasena")) {
                                    return true;
                                } else {
                                    return "las contraseñas no coincide";
                                }
                            },
                        })}
                    />
                    {errors.confirmarContrasena && (
                        <span> {errors.confirmarContrasena.message}</span>
                    )}
                </div>

                <label htmlFor="nombre" className={styles.pruebita}>
                    Nombre
                </label>
                <input
                    type="text"
                    {...register("nombre", {
                        required: {
                            value: true,
                            message: "nombre es requerido",
                        },
                        maxLength: {
                            value: 30,
                            message: "nombre debe tener máximo 30 caracteres",
                        },
                    })}
                />
                {errors.nombre && <span> {errors.nombre.message}</span>}

                <label htmlFor="apellido_p" className={styles.pruebita}>
                    Apellido paterno
                </label>
                <input
                    type="text"
                    {...register("apellido_p", {
                        required: {
                            value: true,
                            message: "apellido paterno es requerido",
                        },
                        maxLength: {
                            value: 30,
                            message: "apellido paterno debe tener máximo 30 caracteres",
                        },
                    })}
                />
                {errors.apellido_p && <span> {errors.apellido_p.message}</span>}

                <label htmlFor="apellido_m" className={styles.pruebita}>
                    Apellido materno
                </label>
                <input
                    type="text"
                    {...register("apellido_m", {
                        maxLength: {
                            value: 30,
                            message: "apellido materno debe tener máximo 30 caracteres",
                        },
                    })}
                />
                {errors.apellido_m && <span> {errors.apellido_m.message}</span>}

                <button type="submit" className={styles.pruebita}>
                    Actualizar Datos
                </button>
            </form>
        </div>
    );
};
