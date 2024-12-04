import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para la redirección
import FormularioCuenta from '../Formularios/FormularioCuenta';
import './CuentasTabla.css';  // Importamos el archivo CSS de estilos

const CuentasCrud = () => {
  const [cuentas, setCuentas] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [cuentaEditando, setCuentaEditando] = useState(null);
  const [campoOrden, setCampoOrden] = useState('id');
  const [direccionOrden, setDireccionOrden] = useState('asc');
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  const navigate = useNavigate();  // Instancia de useNavigate para navegación

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/');
        setCuentas(response.data);
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    };
    fetchCuentas();
  }, []);

  const toggleFormulario = (cuenta = null) => {
    setShowFormulario(!showFormulario);
    setCuentaEditando(cuenta);
  };
  

  const handleCuentaCreada = () => {
    const fetchCuentas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/');
        setCuentas(response.data);
      } catch (error) {
        console.error('Error al obtener cuentas:', error);
      }
    };
    fetchCuentas();
  };

  const handleEliminarCuenta = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/accounts/${id}/`);
      handleCuentaCreada();
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  const ordenarCuentas = (campo) => {
    const nuevaDireccion = campo === campoOrden && direccionOrden === 'asc' ? 'desc' : 'asc';
    setDireccionOrden(nuevaDireccion);
    setCampoOrden(campo);

    const cuentasOrdenadas = [...cuentas].sort((a, b) => {
      if (a[campo] < b[campo]) return nuevaDireccion === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return nuevaDireccion === 'asc' ? 1 : -1;
      return 0;
    });

    setCuentas(cuentasOrdenadas);
  };

  const handleCuentaClick = (cuenta) => {
    if (cuentaSeleccionada && cuentaSeleccionada.id === cuenta.id) {
      setCuentaSeleccionada(null);
    } else {
      setCuentaSeleccionada(cuenta);
    }
  };

  const handleVolverHome = () => {
    navigate('/');  // Redirige al homepage
  };

  return (
    <div className="cuentas-crud">
      <h2>Cuentas</h2>

      {/* Botón para volver al homepage */}
      <button className="btn-home" onClick={handleVolverHome}>
        Volver al Homepage
      </button>

      <button className="btn-toggle-form" onClick={() => toggleFormulario()}>
        {showFormulario ? 'Cerrar Formulario' : 'Agregar Cuenta'}
      </button>

      {/* Mostrar el formulario solo si showFormulario es true */}
      {showFormulario && <FormularioCuenta onCuentaCreada={handleCuentaCreada} cuenta={cuentaEditando} />}

      <table className="cuentas-table">
        <thead>
          <tr>
            <th onClick={() => ordenarCuentas('id')}>ID {campoOrden === 'id' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarCuentas('cliente')}>Cliente {campoOrden === 'cliente' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarCuentas('tipo_cuenta')}>Tipo de Cuenta {campoOrden === 'tipo_cuenta' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarCuentas('saldo')}>Saldo {campoOrden === 'saldo' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarCuentas('estado')}>Estado {campoOrden === 'estado' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuentas.length === 0 ? (
            <tr>
              <td colSpan="6">No hay cuentas disponibles</td>
            </tr>
          ) : (
            cuentas.map(cuenta => (
              <tr
                key={cuenta.id}
                onClick={() => handleCuentaClick(cuenta)}
                className={cuentaSeleccionada && cuentaSeleccionada.id === cuenta.id ? 'selected' : ''}
              >
                <td>{cuenta.id}</td>
                <td>{cuenta.cliente?.nombre}</td>
                <td>{cuenta.tipo_cuenta}</td>
                <td>{cuenta.saldo}</td>
                <td>{cuenta.estado}</td>
                <td>
                  <button className="btn-edit" onClick={() => toggleFormulario(cuenta)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleEliminarCuenta(cuenta.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mostrar los detalles de la cuenta seleccionada */}
      {cuentaSeleccionada && (
        <div className="account-details">
          <h3>Detalles de la Cuenta</h3>
          <table>
            <thead>
              <tr>
                <th>ID de Cuenta</th>
                <th>Tipo de Cuenta</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cuentaSeleccionada.id}</td>
                <td>{cuentaSeleccionada.tipo_cuenta}</td>
                <td>{cuentaSeleccionada.saldo}</td>
                <td>{cuentaSeleccionada.estado}</td>
                <td>{cuentaSeleccionada.fecha_creacion}</td>
              </tr>
            </tbody>
          </table>

          {/* Detalles del cliente relacionado */}
          <h4>Detalles del Cliente</h4>
          <table>
            <thead>
              <tr>
                <th>ID de Cliente</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cuentaSeleccionada.cliente?.id}</td>
                <td>{cuentaSeleccionada.cliente?.nombre}</td>
                <td>{cuentaSeleccionada.cliente?.email}</td>
                <td>{cuentaSeleccionada.cliente?.telefono}</td>
                <td>{cuentaSeleccionada.cliente?.direccion}</td>
                <td>{cuentaSeleccionada.cliente?.fecha_registro}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CuentasCrud;
