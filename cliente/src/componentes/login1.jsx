import {useForm} from "react-hook-form";
import '../formularios.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Login=()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors}} = useForm();
    const onSubmit = handleSubmit((data)=>{  
        console.log(data);
        navigate('/');
    })
 

    return (
        <div>
            <h2>Inicio de sesión</h2>
            <form onSubmit={onSubmit}>
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
                
                
                <Link to="/registro">¿registrar usuario?</Link>
                <button type="submit">
                    enviar
                </button>
            </form>
        </div>
    )
}