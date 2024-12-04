import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Para el botón de volver al homepage
import FormularioPrestamo from '../Formularios/FormularioPrestamos.jsx'; // Asumiendo que tienes un formulario para préstamos
import './PrestamosCrud.css'; // Estilos específicos del componente

const PrestamosCrud = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [prestamoEditando, setPrestamoEditando] = useState(null);
  const [campoOrden, setCampoOrden] = useState('fecha_inicio');
  const [direccionOrden, setDireccionOrden] = useState('asc');
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/loans/');
        setPrestamos(response.data);
      } catch (error) {
        console.error('Error al obtener préstamos:', error);
      }
    };
    fetchPrestamos();
  }, []);

  const toggleFormulario = (prestamo = null) => {
    setPrestamoEditando(prestamo);
    setShowFormulario((prev) => !prev);
  };

  const handlePrestamoActualizado = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/loans/');
      setPrestamos(response.data);
      setShowFormulario(false); // Cerrar formulario después de actualizar
      setPrestamoEditando(null);
    } catch (error) {
      console.error('Error al actualizar préstamos:', error);
    }
  };

  const handleEliminarPrestamo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/loans/${id}/`);
      handlePrestamoActualizado();
    } catch (error) {
      console.error('Error al eliminar el préstamo:', error);
    }
  };

  const ordenarPrestamos = (campo) => {
    const nuevaDireccion = campo === campoOrden && direccionOrden === 'asc' ? 'desc' : 'asc';
    setDireccionOrden(nuevaDireccion);
    setCampoOrden(campo);

    const prestamosOrdenados = [...prestamos].sort((a, b) => {
      if (a[campo] < b[campo]) return nuevaDireccion === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return nuevaDireccion === 'asc' ? 1 : -1;
      return 0;
    });

    setPrestamos(prestamosOrdenados);
  };

  const handlePrestamoClick = (prestamo) => {
    if (prestamoSeleccionado && prestamoSeleccionado.id === prestamo.id) {
      setPrestamoSeleccionado(null);
    } else {
      setPrestamoSeleccionado(prestamo);
    }
  };

  return (
    <div className="prestamos-container">
      <h2>Préstamos</h2>
      <div className="acciones-superiores">
        <button onClick={() => toggleFormulario()}>
          {showFormulario ? 'Cerrar Formulario' : 'Agregar Préstamo'}
        </button>
        <Link to="/" className="volver-homepage-btn">Volver al Homepage</Link>
      </div>

      {showFormulario && (
        <FormularioPrestamo
          onPrestamoActualizado={handlePrestamoActualizado}
          prestamo={prestamoEditando}
        />
      )}

      <table>
        <thead>
          <tr>
            <th onClick={() => ordenarPrestamos('fecha_inicio')}>
              Fecha Inicio {campoOrden === 'fecha_inicio' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => ordenarPrestamos('monto_prestamo')}>
              Monto {campoOrden === 'monto_prestamo' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => ordenarPrestamos('tasa_interes')}>
              Tasa de Interés {campoOrden === 'tasa_interes' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length === 0 ? (
            <tr>
              <td colSpan="4">No hay préstamos disponibles</td>
            </tr>
          ) : (
            prestamos.map((prestamo) => (
              <tr
                key={prestamo.id}
                onClick={() => handlePrestamoClick(prestamo)}
                style={{
                  backgroundColor:
                    prestamoSeleccionado && prestamoSeleccionado.id === prestamo.id ? '#f0f0f0' : '',
                }}
              >
                <td>{prestamo.fecha_inicio}</td>
                <td>{prestamo.monto_prestamo}</td>
                <td>{prestamo.tasa_interes}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFormulario(prestamo);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEliminarPrestamo(prestamo.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {prestamoSeleccionado && (
        <div>
          <h3>Detalles del Préstamo</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Monto</th>
                <th>Tasa de Interés</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{prestamoSeleccionado.fecha_inicio}</td>
                <td>{prestamoSeleccionado.fecha_finalizacion}</td>
                <td>{prestamoSeleccionado.monto_prestamo}</td>
                <td>{prestamoSeleccionado.tasa_interes}</td>
                <td>{prestamoSeleccionado.estado}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrestamosCrud;
