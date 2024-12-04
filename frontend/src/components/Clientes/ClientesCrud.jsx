import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para redirección
import FormularioClientes from '../Formularios/FormularioCliente';
import './ClientesCrud.css';

const ClientesCrud = () => {
  const [clientes, setClientes] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [campoOrden, setCampoOrden] = useState('id');
  const [direccionOrden, setDireccionOrden] = useState('asc');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const navigate = useNavigate();  // Instancia de useNavigate para navegación

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

  const toggleFormulario = (cliente = null) => {
    setShowFormulario(!showFormulario);
    setClienteEditando(cliente);
  };

  const handleClienteCreado = () => {
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

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/customers/${id}/`);
      handleClienteCreado();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

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

  const handleClienteClick = (cliente) => {
    if (clienteSeleccionado && clienteSeleccionado.id === cliente.id) {
      setClienteSeleccionado(null);
    } else {
      setClienteSeleccionado(cliente);
    }
  };

  const handleVolverHome = () => {
    navigate('/');  // Redirige al homepage (ruta base)
  };

  return (
    <div className="clientes-crud">
      <h2>Clientes</h2>
      
      <button className="btn-home" onClick={handleVolverHome}>
        Volver al Homepage
      </button>

      <button className="btn-toggle-form" onClick={() => toggleFormulario()}>
        {showFormulario ? 'Cerrar Formulario' : 'Agregar Cliente'}
      </button>

      {showFormulario && <FormularioClientes onClienteCreado={handleClienteCreado} cliente={clienteEditando} />}

      <table className="clientes-table">
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
              <tr
                key={cliente.id}
                onClick={() => handleClienteClick(cliente)}
                className={clienteSeleccionado && clienteSeleccionado.id === cliente.id ? 'selected' : ''}
              >
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.fecha_registro}</td>
                <td>
                  <button className="btn-edit" onClick={() => toggleFormulario(cliente)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleEliminarCliente(cliente.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {clienteSeleccionado && (
        <div className="client-details">
          <h3>Detalles de Cliente: {clienteSeleccionado.nombre}</h3>

          {clienteSeleccionado.cuentas && clienteSeleccionado.cuentas.length > 0 && (
            <div className="client-info">
              <h4>Cuentas Asociadas</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID Cuenta</th>
                    <th>Tipo Cuenta</th>
                    <th>Saldo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {clienteSeleccionado.cuentas.map(cuenta => (
                    <tr key={cuenta.id}>
                      <td>{cuenta.id}</td>
                      <td>{cuenta.tipo_cuenta}</td>
                      <td>{cuenta.saldo}</td>
                      <td>{cuenta.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Otras secciones de detalle como transacciones, tarjetas, etc. */}
        </div>
      )}
    </div>
  );
};

export default ClientesCrud;
