import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioPrestamo = ({ onPrestamoActualizado, prestamo }) => {
  const [prestamoData, setPrestamoData] = useState({
    cliente: '',
    monto_prestamo: '',
    tasa_interes: '',
    fecha_finalizacion: '',
    estado: 'activo',
  });

  // Cargar datos en caso de editar un préstamo
  useEffect(() => {
    if (prestamo) {
      setPrestamoData({
        cliente: prestamo.cliente.id,
        monto_prestamo: prestamo.monto_prestamo,
        tasa_interes: prestamo.tasa_interes,
        fecha_finalizacion: prestamo.fecha_finalizacion || '',
        estado: prestamo.estado,
      });
    }
  }, [prestamo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestamoData({
      ...prestamoData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (prestamo) {
        // Actualizar préstamo
        await axios.put(`http://127.0.0.1:8000/api/loans/${prestamo.id}/`, prestamoData);
      } else {
        // Crear préstamo
        await axios.post('http://127.0.0.1:8000/api/loans/', prestamoData);
      }
      onPrestamoActualizado();
    } catch (error) {
      console.error('Error al guardar el préstamo:', error);
    }
  };

  return (
    <div>
      <h2>{prestamo ? 'Editar Préstamo' : 'Agregar Préstamo'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cliente:
          <input
            type="number"
            name="cliente"
            value={prestamoData.cliente}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Monto del Préstamo:
          <input
            type="number"
            name="monto_prestamo"
            value={prestamoData.monto_prestamo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tasa de Interés:
          <input
            type="number"
            step="0.01"
            name="tasa_interes"
            value={prestamoData.tasa_interes}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Fecha de Finalización:
          <input
            type="date"
            name="fecha_finalizacion"
            value={prestamoData.fecha_finalizacion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Estado:
          <select
            name="estado"
            value={prestamoData.estado}
            onChange={handleChange}
            required
          >
            <option value="activo">Activo</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </label>
        <br />
        <button type="submit">{prestamo ? 'Actualizar Préstamo' : 'Crear Préstamo'}</button>
      </form>
    </div>
  );
};

export default FormularioPrestamo;
