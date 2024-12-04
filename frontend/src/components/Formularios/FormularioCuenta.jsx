import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioCuenta = ({ onCuentaCreada, cuenta }) => {
  const [cuentaData, setCuentaData] = useState({
    cliente: '',
    tipo_cuenta: '',
    saldo: 0.00,
    estado: 'activa',
  });

  // Si se está editando una cuenta, se cargan sus datos
  useEffect(() => {
    if (cuenta) {
      setCuentaData({
        cliente: cuenta.cliente.id,
        tipo_cuenta: cuenta.tipo_cuenta,
        saldo: cuenta.saldo,
        estado: cuenta.estado,
      });
    }
  }, [cuenta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuentaData({
      ...cuentaData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cuenta) {
        // Actualizar cuenta
        const response = await axios.put(`http://127.0.0.1:8000/api/accounts/${cuenta.id}/`, cuentaData);
        console.log('Cuenta actualizada:', response.data);
      } else {
        // Crear cuenta
        const response = await axios.post('http://127.0.0.1:8000/api/accounts/', cuentaData);
        console.log('Cuenta creada:', response.data);
      }
      onCuentaCreada();
    } catch (error) {
      console.error('Error al crear o actualizar la cuenta:', error);
    }
  };

  return (
    <div>
      <h2>{cuenta ? 'Editar Cuenta' : 'Crear Cuenta'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Cliente:
          <input
            type="number"
            name="cliente"
            value={cuentaData.cliente}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tipo de Cuenta:
          <input
            type="text"
            name="tipo_cuenta"
            value={cuentaData.tipo_cuenta}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Saldo:
          <input
            type="number"
            name="saldo"
            value={cuentaData.saldo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Estado:
          <select
            name="estado"
            value={cuentaData.estado}
            onChange={handleChange}
            required
          >
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </label>
        <br />
        <button type="submit">{cuenta ? 'Actualizar Cuenta' : 'Crear Cuenta'}</button>
      </form>
    </div>
  );
};

export default FormularioCuenta;
