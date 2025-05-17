import {useForm} from "react-hook-form";
import styles from '../formularios.module.css'
import { useNavigate } from "react-router-dom";


export const CrearMaterias=()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors},watch} = useForm();
    const onSubmit= handleSubmit(async(data)=>{
        try {
            const id_inst = sessionStorage.getItem('id_institucion')
            console.log(sessionStorage.getItem('id_institucion'))
            console.log('ID de institución:', id_inst);
            console.log('Datos a enviar:', {
            nombre_materia: data.nombre_materia,
            periodo: data.periodo,
            activa: data.activa
            });
            const res = await fetch(`http://localhost:4000/crearMateria/${id_inst}`,{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre_materia:data.nombre_materia,
                    periodo: data.periodo,
                    activa:data.activa
                })
            });
            if (!res.ok) {
            // Si el estado no es OK (2xx), lanzar un error con el mensaje de la API
            const errorData = await res.json(); // Intentar obtener el mensaje de error del cuerpo
            throw new Error(errorData.message || 'Error al crear la materia'); // Usar un mensaje genérico si no hay uno específico
            }  
            navigate('/inicio/materias');
        } catch (error) {
            alert(error.message)
        }

    })

    return(
        <div>
            <div>
                <h2>
                    Registro de Materias
                </h2>
                <form onSubmit={onSubmit}>
                    <label htmlFor="nombre" className={styles.pruebita}>nombre</label>
                    <input
                        type="text"
                        {...register("nombre_materia", {
                            required: {
                                value: true,
                                message: "usuario es requerido"
                            },
                            minLength: {
                                value: 1,
                                message: "usuario debe tener al menos 4 caracteres"
                            },
                            maxLength: {
                                value: 50,
                                message: "usuario debe tener máximo 16 caracteres"
                            }
                        })}
                    />
                    {
                        errors.nombre && <span> {errors.nombre.message}</span>
                    }

                    <label htmlFor="periodo" className={styles.pruebita}>periodo</label>
                    <input
                        type="text"
                        {...register("periodo", {
                            minLength: {
                                value: 1,
                                message: "periodo debe tener al menos 1 caracteres"
                            },
                            maxLength: {
                                value: 30,
                                message: "periodo debe tener máximo 30 caracteres"
                            }
                        })}
                    />
                    {
                        errors.periodo && <span> {errors.periodo.message}</span>
                    }


                    <label htmlFor="activa" className={styles.pruebita}>¿activa?</label>
                    <input
                        type="checkbox"
                        id="activa"
                        {...register("activa")}
                    />
                    {
                        errors.confirmarContrasena && <span> {errors.confirmarContrasena.message}</span>
                    }    
                    
                    <button type= "submit" className={styles.pruebita}>
                        Enviar
                    </button>
                    
                </form>
            </div>
        </div>
    )
}