import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioTarjeta = ({ tarjeta = null, onTarjetaActualizada }) => {
  const [formData, setFormData] = useState({
    numero_tarjeta: '',
    tipo_tarjeta: '',
    fecha_expiracion: '',
    codigo_seguridad: '',
    estado: 'activa',
  });
  const [tiposTarjeta, setTiposTarjeta] = useState([]); // Lista de tipos de tarjeta

  // Cargar tipos de tarjeta al montar el componente
  useEffect(() => {
    const fetchTiposTarjeta = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/card-types/');
        setTiposTarjeta(response.data);
      } catch (error) {
        console.error('Error al obtener tipos de tarjeta:', error);
      }
    };

    fetchTiposTarjeta();
  }, []);

  // Rellenar el formulario si se está editando una tarjeta
  useEffect(() => {
    if (tarjeta) {
      setFormData({
        numero_tarjeta: tarjeta.numero_tarjeta || '',
        tipo_tarjeta: tarjeta.tipo_tarjeta || '',
        fecha_expiracion: tarjeta.fecha_expiracion || '',
        codigo_seguridad: tarjeta.codigo_seguridad || '',
        estado: tarjeta.estado || 'activa',
      });
    }
  }, [tarjeta]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple de los campos requeridos
    if (!formData.numero_tarjeta || !formData.tipo_tarjeta || !formData.fecha_expiracion || !formData.codigo_seguridad) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      if (tarjeta) {
        // Editar tarjeta
        await axios.put(`http://127.0.0.1:8000/api/cards/${tarjeta.id}/`, formData);
      } else {
        // Crear nueva tarjeta
        await axios.post('http://127.0.0.1:8000/api/cards/', formData);
      }
      onTarjetaActualizada(); // Refrescar la lista de tarjetas
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al guardar la tarjeta. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Número de Tarjeta:</label>
        <input
          type="text"
          name="numero_tarjeta"
          value={formData.numero_tarjeta}
          onChange={handleChange}
          maxLength="16"
          required
        />
      </div>

      <div>
        <label>Tipo de Tarjeta:</label>
        <select
          name="tipo_tarjeta"
          value={formData.tipo_tarjeta}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo</option>
          {tiposTarjeta.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Fecha de Expiración:</label>
        <input
          type="date"
          name="fecha_expiracion"
          value={formData.fecha_expiracion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Código de Seguridad:</label>
        <input
          type="text"
          name="codigo_seguridad"
          value={formData.codigo_seguridad}
          onChange={handleChange}
          maxLength="3"
          required
        />
      </div>

      <div>
        <label>Estado:</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="activa">Activa</option>
          <option value="inactiva">Inactiva</option>
          <option value="bloqueada">Bloqueada</option>
        </select>
      </div>

      <button type="submit">{tarjeta ? 'Actualizar' : 'Crear'} Tarjeta</button>
    </form>
  );
};

export default FormularioTarjeta;
