import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioTransaccion from '../Formularios/FormularioTransaccion.jsx'; // Asumiendo que tienes un formulario para transacciones
import { Link } from 'react-router-dom'; // Para el link de "Regresar"
import "./Transacciones.css";

const TransaccionesCrud = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [transaccionEditando, setTransaccionEditando] = useState(null);
  const [campoOrden, setCampoOrden] = useState('fecha');
  const [direccionOrden, setDireccionOrden] = useState('asc');
  const [transaccionSeleccionada, setTransaccionSeleccionada] = useState(null);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/transactions/');
        setTransacciones(response.data);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      }
    };
    fetchTransacciones();
  }, []);

  const toggleFormulario = (transaccion = null) => {
    setShowFormulario(!showFormulario);
    setTransaccionEditando(transaccion);
  };

  const handleTransaccionCreada = () => {
    const fetchTransacciones = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/transactions/');
        setTransacciones(response.data);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      }
    };
    fetchTransacciones();
  };

  const handleEliminarTransaccion = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/transactions/${id}/`);
      handleTransaccionCreada();
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
    }
  };

  const ordenarTransacciones = (campo) => {
    const nuevaDireccion = campo === campoOrden && direccionOrden === 'asc' ? 'desc' : 'asc';
    setDireccionOrden(nuevaDireccion);
    setCampoOrden(campo);

    const transaccionesOrdenadas = [...transacciones].sort((a, b) => {
      if (a[campo] < b[campo]) return nuevaDireccion === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return nuevaDireccion === 'asc' ? 1 : -1;
      return 0;
    });

    setTransacciones(transaccionesOrdenadas);
  };

  const handleTransaccionClick = (transaccion) => {
    if (transaccionSeleccionada && transaccionSeleccionada.id === transaccion.id) {
      setTransaccionSeleccionada(null);
    } else {
      setTransaccionSeleccionada(transaccion);
    }
  };

  return (
    <div className="transacciones-container">
      <h2>Transacciones</h2>
      <div className="acciones-superiores">
        <button onClick={() => toggleFormulario()}>
          {showFormulario ? 'Cerrar Formulario' : 'Agregar Transacción'}
        </button>
        <Link to="/" className="regresar-btn">Regresar al Inicio</Link>
      </div>

      {showFormulario && <FormularioTransaccion onTransaccionCreada={handleTransaccionCreada} transaccion={transaccionEditando} />}

      <table>
        <thead>
          <tr>
            <th onClick={() => ordenarTransacciones('fecha')}>Fecha {campoOrden === 'fecha' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarTransacciones('tipo')}>Tipo {campoOrden === 'tipo' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarTransacciones('monto')}>Monto {campoOrden === 'monto' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarTransacciones('descripcion')}>Descripción {campoOrden === 'descripcion' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.length === 0 ? (
            <tr>
              <td colSpan="5">No hay transacciones disponibles</td>
            </tr>
          ) : (
            transacciones.map(transaccion => (
              <tr
                key={transaccion.id}
                onClick={() => handleTransaccionClick(transaccion)}
                style={{
                  backgroundColor: transaccionSeleccionada && transaccionSeleccionada.id === transaccion.id ? '#f0f0f0' : ''
                }}
              >
                <td>{transaccion.fecha}</td>
                <td>{transaccion.tipo}</td>
                <td>{transaccion.monto}</td>
                <td>{transaccion.descripcion}</td>
                <td>
                  <button className="editar" onClick={() => toggleFormulario(transaccion)}>Editar</button>
                  <button className="eliminar" onClick={() => handleEliminarTransaccion(transaccion.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {transaccionSeleccionada && (
        <div className="transaccion-detalles">
          <h3>Detalles de la Transacción</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Descripción</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{transaccionSeleccionada.fecha}</td>
                <td>{transaccionSeleccionada.tipo}</td>
                <td>{transaccionSeleccionada.monto}</td>
                <td>{transaccionSeleccionada.descripcion}</td>
                <td>{transaccionSeleccionada.location?.nombre}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransaccionesCrud;
