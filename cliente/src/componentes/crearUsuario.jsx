import {useForm} from "react-hook-form";
import styles from '../formularios.module.css'
import { useNavigate } from "react-router-dom";
export const Formulario =()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors},watch} = useForm();

    const onSubmit = handleSubmit((data)=>{
        console.log(data);
        navigate('/instituciones');
    })
    return(
        <div>
            <div>
                <h2>Registro de usuarios</h2>
            </div>
            
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlfor="usuario">usuario</label>
                    <input 
                        type="text"
                        {...register("usuario",{
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
                    <label htmlfor="contraseña">contraseña</label>
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
                    <label htmlfor="confirmarContraseña">Confirmar contraseña</label>
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
                

                

                <label htmlfor="nombre" className={styles.pruebita}>Nombre</label>
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
                
                <label htmlfor="apellido_p">Apellido paterno</label>
                <input 
                    type="text"
                    {...register("apellido_p",{
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

                <label htmlfor="apellido_m">Apellido materno</label>
                <input 
                    type="text"
                    {...register("apellido_m",{
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