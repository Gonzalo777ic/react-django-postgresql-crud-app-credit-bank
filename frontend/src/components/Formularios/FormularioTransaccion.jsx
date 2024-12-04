import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioTransaccion = ({ onTransaccionCreada, transaccion }) => {
  const [transaccionData, setTransaccionData] = useState({
    cuenta: '',
    tipo: '',
    monto: 0.00,
    descripcion: '',
    location: '',
  });

  // Si se está editando una transacción, se cargan sus datos
  useEffect(() => {
    if (transaccion) {
      setTransaccionData({
        cuenta: transaccion.cuenta.id,
        tipo: transaccion.tipo,
        monto: transaccion.monto,
        descripcion: transaccion.descripcion,
        location: transaccion.location ? transaccion.location.id : '',
      });
    }
  }, [transaccion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaccionData({
      ...transaccionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (transaccion) {
        // Actualizar transacción
        const response = await axios.put(`http://127.0.0.1:8000/api/transactions/${transaccion.id}/`, transaccionData);
        console.log('Transacción actualizada:', response.data);
      } else {
        // Crear transacción
        const response = await axios.post('http://127.0.0.1:8000/api/transactions/', transaccionData);
        console.log('Transacción creada:', response.data);
      }
      onTransaccionCreada();
    } catch (error) {
      console.error('Error al crear o actualizar la transacción:', error);
    }
  };

  return (
    <div>
      <h2>{transaccion ? 'Editar Transacción' : 'Crear Transacción'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cuenta:
          <input
            type="number"
            name="cuenta"
            value={transaccionData.cuenta}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tipo:
          <input
            type="text"
            name="tipo"
            value={transaccionData.tipo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Monto:
          <input
            type="number"
            name="monto"
            value={transaccionData.monto}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={transaccionData.descripcion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ubicación:
          <input
            type="number"
            name="location"
            value={transaccionData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{transaccion ? 'Actualizar Transacción' : 'Crear Transacción'}</button>
      </form>
    </div>
  );
};

export default FormularioTransaccion;
