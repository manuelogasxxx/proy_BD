import { useEffect,useState } from "react";

export const Materias =()=>{
    const [materiasAPI,setMateriasAPI]=useState([]);
    const id_usuario= sessionStorage.getItem('id_usuario');
    const id_institucion=sessionStorage.getItem('id_institucion');
    
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
            Esta es la página de materias
            <header>
                <button>crear Materia</button>
            </header>
            <div>
                <h2>Lista de materias</h2>
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
                                        <button>Ver Alumnos</button>
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