//este es el panel de Alumnos
import {useForm} from "react-hook-form";
import styles from '../formularios.module.css'
import { useNavigate } from "react-router-dom";
export const Alumnos =()=>{
    return(
        <div>
            <h1>Este es el componente para los alumnos</h1>
            <div>
                <h3>Operaciones generales</h3>
                <header>
                    <button>Crear Alumno</button>
                    <button> pruebitas</button>
                </header>
            </div>
            <div>
                <h3>Operaciones específicas</h3>
                <header>
                    <button>Crear Alumno</button>
                    <button> pruebitas</button>
                </header>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido P</th>
                            <th>Apellido M</th>
                        </tr>

                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

        </div>
    )
}


//se supone que aquí voy a poner las otras cosas

export const CrearAlumno=()=>{
    const navigate = useNavigate();
    const {register, handleSubmit,formState:{errors},watch} = useForm();

    //falta crear esa parte
    const onSubmit =handleSubmit(async(data)=>{
        console.log(data);
        try {
            const res = await fetch('http://localhost:4000/crearAlumno',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username:data.username,
                    contrasena: data.contrasena,
                    nombre:data.nombre,
                    apellido_pat:data.apellido_pat,
                    apellido_mat:data.apellido_mat
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
    }
    )

    return(
        <div>
            <div>
                <h2> Formulario de Alumnos</h2>
            </div>

            <form>

            </form>
        </div>
    )
}