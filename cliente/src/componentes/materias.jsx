import { Link } from "react-router-dom"
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export const Materias =()=>{
    const [materiasAPI,setMateriasAPI]=useState([]);
    const id_usuario= sessionStorage.getItem('id_usuario');
    const id_institucion=sessionStorage.getItem('id_institucion');
    const navigate = useNavigate();

    const verAlumnos =(id_materia)=>{
        sessionStorage.setItem('id_materia',id_materia);
        navigate("alumnos");
    }
    
    useEffect(()=>{
        const cargarMaterias = async()=>{
            try {
                const respuesta = await fetch(`http://localhost:4000/verMaterias/${id_usuario}`);
                if (!respuesta.ok) {
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
    },[])
    return(
        <div>
            <h1>Panel de Materias </h1>
            <header>
                <button>crear Materia</button>
                <Link to ="alumnos">CrearInstitucion</Link>
            </header>
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
                            materiasAPI.map((materia)=>(
                                <tr key={materia.id_materia}>
                                    <td>{materia.id_materia}</td>
                                    <td>{materia.nombre_materia}</td>
                                    <td>{materia.periodo}</td>
                                    <td>
                                        <button onClick={()=>verAlumnos(materia.id_materia)}>Ver Alumnos</button>
                                        <button>Borrar</button>
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