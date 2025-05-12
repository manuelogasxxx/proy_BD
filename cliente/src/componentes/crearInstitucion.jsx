import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const FormularioInstitucion = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [opcionesAPI, setOpcionesAPI] = useState([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [errorCargaOpciones, setErrorCargaOpciones] = useState(null);

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const respuesta = await fetch('http://localhost:4000/verTipoInst');
        if (!respuesta.ok) {
          throw new Error(`Error al cargar las opciones: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setOpcionesAPI(datos);
        setCargandoOpciones(false);
      } catch (error) {
        console.error("Error al cargar las opciones de la API:", error);
        setErrorCargaOpciones(error.message);
        setCargandoOpciones(false);
      }
    };

    cargarOpciones();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    // Aquí puedes enviar los datos del formulario, incluyendo el valor seleccionado del <select>
    const id_usuario = sessionStorage.getItem('id_usuario');
    try {
        console.log(data)
      const res = await fetch(`http://localhost:4000/crearInst/${id_usuario}`, { // Cambia la URL según tu API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.nombre,
          // ... otros campos del formulario
          fk_tipo_institucion: data.atributo_api // El valor del <select> estará aquí
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear la institución');
      }
      navigate('/inicio');
    } catch (error) {
      alert(error.message);
    }
    
  });

  if (cargandoOpciones) {
    return <div>Cargando opciones...</div>;
  }

  if (errorCargaOpciones) {
    return <div>Error al cargar las opciones: {errorCargaOpciones}</div>;
  }

  return (
    <div>
      <div>
        <h2>Registro de instituciones</h2>
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="nombre_institucion">Nombre de la Institución</label>
          <input
            type="text"
            id="nombre_institucion"
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre de la institución es requerido",
              },
              minLength: {
                value: 4,
                message: "El nombre debe tener al menos 4 caracteres",
              },
              maxLength: {
                value: 100,
                message: "El nombre debe tener máximo 100 caracteres",
              },
            })}
          />
          {errors.nombre_institucion && <span>{errors.nombre_institucion.message}</span>}
        </div>

        <div>
          <label htmlFor="atributo_api">Selecciona un atributo</label>
          <select
            id="atributo_api"
            {...register("atributo_api", {
              required: {
                value: true,
                message: "Debes seleccionar un atributo",
              },
            })}
          >
            <option value="">Selecciona una opción</option>
            {opcionesAPI.map((opcion) => (
              <option key={opcion.id_tipo_institucion} value={opcion.id_tipo_institucion}> {/* Ajusta 'id' y 'valor' según la estructura de tu API */}
                {opcion.nombre} {/* Ajusta 'nombre_mostrar' según la estructura de tu API */}
              </option>
            ))}
          </select>
          {errors.atributo_api && <span>{errors.atributo_api.message}</span>}
        </div>

        <button type="submit">
          Enviar
        </button>

      </form>
    </div>
  );
};