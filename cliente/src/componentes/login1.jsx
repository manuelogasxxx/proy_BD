import {useForm} from "react-hook-form";
import styles from '../formularios.module.css'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export const Login=()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors}} = useForm();
    const onSubmit = handleSubmit(async (data)=>{  
        //console.log(data);
        try {
            const res = await fetch('http://localhost:4000/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Usuario o contraseña incorrectos");
            else{
                const result = await res.json();  
                console.log(result)
                sessionStorage.setItem('usuario', result.user.username);
                sessionStorage.setItem('id_usuario', result.user.id_usuario);
                navigate('/inicio');   
            }

        } catch (error) {
            alert(error.message)
        }
    })
 

    return (
        <div className={styles.container}>
            <div className={styles.fromgroup}>
                <h2>Inicio de sesión</h2>
            </div>
            
            <form onSubmit={onSubmit}>
                <div className={styles.fromgroup}>
                    <label htmlFor="username" className={styles.label}>usuario</label>
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
                        className={styles.input}
                    />
                    {
                        errors.usuario && <span className={styles.errorSpan}> {errors.usuario.message}</span>
                    }

                </div>

                <div className={styles.fromgroup}>
                    <label htmlFor="contrasena" className={styles.label}>contraseña</label>
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
                        className={styles.input}
                    />
                    {
                        errors.contrasena && <span className={styles.errorSpan}> {errors.contrasena.message}</span>
                    }
                </div>        
                
                
                
                <Link to="/registro">¿registrar usuario?</Link>
                <button type="submit" className={styles.button}>
                    enviar
                </button>
            </form>
        </div>
    )
}