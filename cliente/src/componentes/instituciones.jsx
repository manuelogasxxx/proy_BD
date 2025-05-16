
import { Link } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Instituciones=()=>{
    const [instituciones, setInstitucionesAPI]=useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null);
    const id_usuario= sessionStorage.getItem('id_usuario');
    const navigate = useNavigate();
    console.log(id_usuario)
    useEffect(() => {
      sessionStorage.removeItem('id_institucion');
        const cargarOpciones = async () => {
            if (!id_usuario) {
                setError("No se encontró el ID de usuario en el sessionStorage.");
                setCargando(false);
                return;
            }
          try {
            const respuesta = await fetch(`http://localhost:4000/verInst/${id_usuario}`);
            if (!respuesta.ok) {
              throw new Error(`Error al cargar las opciones: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setInstitucionesAPI(datos);
          } catch (error) {
            console.error("Error al cargar las opciones de la API:", error);
            setError(error.message);
          }
          finally{
            setCargando(false);
          }
        };
        cargarOpciones();
      }, []);//id_usuario

      const verMaterias =(id_institucion)=>{
        sessionStorage.setItem('id_institucion',id_institucion);
        navigate("materias");
      }

      const borrarMateria= async (id_institucion)=>{
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta institución?");
        if(confirmar){
          try {
            const result = await fetch(`http://localhost:4000/borrarInst/${id_institucion}`,{
              method:"DELETE"
            })
          } catch (error) {
            console.error("Error al borrar la institucion:", error);
            setError(error.message);
          }
        }
      }

    return(
    <div>
        <h1>Panel de Instituciones</h1>
        <header>
            <Link to="/inicio">Home</Link>
            <Link to ="crearInstitucion">CrearInstitucion</Link>  
        </header>

        <div>
            <h3>Lista de Instituciones</h3>
            <table border="1">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {instituciones.map((institucion) => (
                    <tr key={institucion.id_institucion}>
                        <td>{institucion.id_institucion}</td>
                        <td>{institucion.nombre_institucion}</td>
                        <td>{institucion.nombre}</td>
                        <td>
                            <button onClick={()=>verMaterias(institucion.id_institucion)}>ver</button>
                            <button onClick={()=>borrarMateria(institucion.id_institucion)}>borrar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </div> 
    )
}