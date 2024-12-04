import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioLocacion = ({ onLocacionCreada, locacion }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tipo: '',
  });

  // Pre-cargar datos si se está editando una locación
  useEffect(() => {
    if (locacion) {
      setFormData({
        nombre: locacion.nombre,
        direccion: locacion.direccion || '',
        tipo: locacion.tipo || '',
      });
    }
  }, [locacion]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (locacion) {
        // Editar una locación existente
        await axios.put(`http://127.0.0.1:8000/api/locations/${locacion.id}/`, formData);
      } else {
        // Crear una nueva locación
        await axios.post('http://127.0.0.1:8000/api/locations/', formData);
      }

      // Notificar al componente padre que se ha creado o actualizado una locación
      onLocacionCreada();
    } catch (error) {
      console.error('Error al guardar la locación:', error);
    }
  };

  return (
    <div>
      <h2>{locacion ? 'Editar Locación' : 'Agregar Locación'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Tipo:
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{locacion ? 'Actualizar Locación' : 'Crear Locación'}</button>
      </form>
    </div>
  );
};

export default FormularioLocacion;
