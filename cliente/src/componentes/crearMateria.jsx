import {useForm} from "react-hook-form";
import styles from '../formularios.module.css'
import { useNavigate } from "react-router-dom";
import styles from '../formularios.module.css';


export default FormularioMaterias=()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors},watch} = useForm();
    const onSubmit= handleSubmit(async(data)=>{

    })

    return(
        <div>
            <div>
                <h2>
                    Registro de Materias
                </h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="usuario">usuario</label>
                        <input 
                            type="text"
                            {...register("nombre",{
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
        </div>
    )
}