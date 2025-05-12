import {useForm} from "react-hook-form";
import styles from '../formularios.module.css'
import { useNavigate } from "react-router-dom";
export const Formulario =()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors},watch} = useForm();

    const onSubmit = handleSubmit(async (data)=>{
        console.log(data);
        try {
            const res = await fetch('http://localhost:4000/crearUsuario',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username:data.username,
                    contrasena: data.contrasena,
                    nombre:data.nombre,
                    apellido_pat:data.apellido_p,
                    apellido_mat:data.apellido_m
                })
            });
            if (!res.ok) {
            // Si el estado no es OK (2xx), lanzar un error con el mensaje de la API
            const errorData = await res.json(); // Intentar obtener el mensaje de error del cuerpo
            throw new Error(errorData.message || 'Error al crear el usuario'); // Usar un mensaje genérico si no hay uno específico
            }  
            navigate('/');
        } catch (error) {
            alert(error.message)
        }
        
    })
    return(
        <div>
            <div>
                <h2>Registro de usuarios</h2>
            </div>
            
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="usuario">usuario</label>
                    <input 
                        type="text"
                        {...register("username",{
                            required:{
                                value: true,
                                message: "usuario es requerido"
                            },
                            minLength:{
                                value: 4,
                                message: "usuario debe tener al menos 4 caracteres"
                            },
                            maxLength:{
                                value: 16,
                                message: "usuario debe tener máximo 16 caracteres"
                            }
                        })}
                    />
                    {
                        errors.usuario && <span> {errors.usuario.message}</span>
                    }
                </div>
                
                <div>
                    <label htmlFor="contraseña">contraseña</label>
                    <input 
                        type="password"
                        {...register("contrasena",{
                            required:{
                                value: true,
                                message: "contraseña es requerida"
                            },
                            minLength:{
                                value: 8,
                                message: "contraseña debe tener al menos 8 caracteres"
                            },
                            maxLength:{
                                value: 16,
                                message: "contraseña debe tener máximo 16 caracteres"
                            }
                        })}
                    />
                    {
                        errors.contrasena && <span> {errors.contrasena.message}</span>
                    }
                </div>
                
                <div>
                    <label htmlFor="confirmarContraseña">Confirmar contraseña</label>
                    <input 
                        type="password"
                        {...register("confirmarContrasena",{
                            required:{
                                value: true,
                                message: "confirmar contraseña es requerida"
                            },
                            minLength:{
                                value: 8,
                                message: "contraseña debe tener al menos 8 caracteres"
                            },
                            maxLength:{
                                value: 16,
                                message: "contraseña debe tener máximo 16 caracteres"
                            },
                            validate: (value)=>{
                                if(value === watch('contrasena')){
                                    return true;
                                }
                                else{
                                    return "las contraseñas no coincide"
                                }
                            }
                        })}
                    />
                    {
                        errors.confirmarContrasena && <span> {errors.confirmarContrasena.message}</span>
                    }
                </div>
                

                

                <label htmlFor="nombre" className={styles.pruebita}>Nombre</label>
                <input 
                    type="text"
                    {...register("nombre",{
                        required:{
                            value: true,
                            message: "nombre es requerido"
                        },
                        maxLength:{
                            value: 30,
                            message: "nombre debe tener máximo 30 caracteres"
                        }
                    })}
                />
                {
                    errors.nombre && <span> {errors.nombre.message}</span>
                }
                
                <label htmlFor="apellido_p">Apellido paterno</label>
                <input 
                    type="text"
                    {...register("apellido_pat",{
                        required:{
                            value: true,
                            message: "apellido paterno es requerido"
                        },
                        maxLength:{
                            value: 30,
                            message: "apellido paterno debe tener máximo 30 caracteres"
                        }
                    })}
                />
                {
                    errors.apellido_p && <span> {errors.apellido_p.message}</span>
                }

                <label htmlFor="apellido_m">Apellido materno</label>
                <input 
                    type="text"
                    {...register("apellido_mat",{
                        maxLength:{
                            value: 30,
                            message: "apellido materno debe tener máximo 30 caracteres"
                        }
                    })}
                />
                {
                    errors.apellido_m && <span> {errors.apellido_m.message}</span>
                }

                <button type= "submit">
                    Enviar
                </button>
                
            </form>
        </div>
    )

}