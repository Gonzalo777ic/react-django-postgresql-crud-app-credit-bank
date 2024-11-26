import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioClientes from '../Formularios/FormularioCliente';

const ClientesCrud = () => {
  const [clientes, setClientes] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false); // Controla la visibilidad del formulario
  const [clienteEditando, setClienteEditando] = useState(null); // Cliente que se está editando
  const [campoOrden, setCampoOrden] = useState('id'); // Campo por el que se ordena
  const [direccionOrden, setDireccionOrden] = useState('asc'); // Dirección del orden (ascendente o descendente)

  // Cargar la lista de clientes
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customers/');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  // Función para abrir/cerrar el formulario
  const toggleFormulario = (cliente = null) => {
    setShowFormulario(!showFormulario);
    setClienteEditando(cliente); // Si estamos editando, seteamos el cliente
  };

  // Función para actualizar la lista de clientes después de crear o actualizar uno
  const handleClienteCreado = () => {
    // Vuelve a cargar la lista de clientes
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/customers/');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };
    fetchClientes();
  };

  // Eliminar cliente
  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/customers/${id}/`);
      console.log('Cliente eliminado');
      handleClienteCreado(); // Actualizamos la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  // Función para ordenar los clientes
  const ordenarClientes = (campo) => {
    const nuevaDireccion = campo === campoOrden && direccionOrden === 'asc' ? 'desc' : 'asc';
    setDireccionOrden(nuevaDireccion);
    setCampoOrden(campo);

    const clientesOrdenados = [...clientes].sort((a, b) => {
      if (a[campo] < b[campo]) return nuevaDireccion === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return nuevaDireccion === 'asc' ? 1 : -1;
      return 0;
    });

    setClientes(clientesOrdenados);
  };

  return (
    <div>
      <h2>Clientes</h2>
      <button onClick={() => toggleFormulario()}>
        {showFormulario ? 'Cerrar Formulario' : 'Agregar Cliente'}
      </button>

      {/* Mostrar el formulario solo si showFormulario es true */}
      {showFormulario && <FormularioClientes onClienteCreado={handleClienteCreado} cliente={clienteEditando} />}

      <table>
        <thead>
          <tr>
            <th onClick={() => ordenarClientes('id')}>ID {campoOrden === 'id' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarClientes('nombre')}>Nombre {campoOrden === 'nombre' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarClientes('email')}>Email {campoOrden === 'email' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarClientes('telefono')}>Teléfono {campoOrden === 'telefono' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarClientes('direccion')}>Dirección {campoOrden === 'direccion' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarClientes('fecha_registro')}>Fecha de Registro {campoOrden === 'fecha_registro' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="7">No hay clientes disponibles</td>
            </tr>
          ) : (
            clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.fecha_registro}</td>
                <td>
                  <button onClick={() => toggleFormulario(cliente)}>Editar</button>
                  <button onClick={() => handleEliminarCliente(cliente.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesCrud;
