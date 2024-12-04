import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioClientes = ({ onClienteCreado, cliente }) => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  // Si se está editando un cliente, se cargan sus datos
  useEffect(() => {
    if (cliente) {
      setClienteData({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteData({
      ...clienteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cliente) {
        // Actualizar cliente
        const response = await axios.put(`http://127.0.0.1:8000/api/customers/${cliente.id}/`, clienteData);
        console.log('Cliente actualizado:', response.data);
      } else {
        // Crear cliente
        const response = await axios.post('http://127.0.0.1:8000/api/customers/', clienteData);
        console.log('Cliente creado:', response.data);
      }
      onClienteCreado();
    } catch (error) {
      console.error('Error al crear o actualizar el cliente:', error);
    }
  };

  return (
    <div>
      <h2>{cliente ? 'Editar Cliente' : 'Crear Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={clienteData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={clienteData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={clienteData.telefono}
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
            value={clienteData.direccion}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{cliente ? 'Actualizar Cliente' : 'Crear Cliente'}</button>
      </form>
    </div>
  );
};

export default FormularioClientes;
