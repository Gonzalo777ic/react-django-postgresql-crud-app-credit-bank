import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioTarjeta from '../Formularios/FormularioTarjeta';

const TarjetasCrud = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [tarjetaEditando, setTarjetaEditando] = useState(null);
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

  // Cargar la lista de tarjetas al montar el componente
  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cards/');
        setTarjetas(response.data);
      } catch (error) {
        console.error('Error al obtener tarjetas:', error);
      }
    };
    fetchTarjetas();
  }, []);

  const toggleFormulario = (tarjeta = null) => {
    setShowFormulario(!showFormulario);
    setTarjetaEditando(tarjeta);
  };

  const handleTarjetaActualizada = () => {
    const fetchTarjetas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cards/');
        setTarjetas(response.data);
      } catch (error) {
        console.error('Error al obtener tarjetas:', error);
      }
    };
    fetchTarjetas();
  };

  const handleEliminarTarjeta = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cards/${id}/`);
      console.log('Tarjeta eliminada');
      handleTarjetaActualizada();
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  };

  const handleTarjetaClick = (tarjeta) => {
    if (tarjetaSeleccionada && tarjetaSeleccionada.id === tarjeta.id) {
      setTarjetaSeleccionada(null);
    } else {
      setTarjetaSeleccionada(tarjeta);
    }
  };

  return (
    <div>
      <h2>Gestión de Tarjetas</h2>
      <button onClick={() => toggleFormulario()}>
        {showFormulario ? 'Cerrar Formulario' : 'Agregar Tarjeta'}
      </button>

      {showFormulario && (
        <FormularioTarjeta
          onTarjetaActualizada={handleTarjetaActualizada}
          tarjeta={tarjetaEditando}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Número de Tarjeta</th>
            <th>Tipo</th>
            <th>Fecha de Expiración</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tarjetas.length === 0 ? (
            <tr>
              <td colSpan="5">No hay tarjetas disponibles</td>
            </tr>
          ) : (
            tarjetas.map((tarjeta) => (
              <tr
                key={tarjeta.id}
                onClick={() => handleTarjetaClick(tarjeta)}
                style={{
                  backgroundColor:
                    tarjetaSeleccionada && tarjetaSeleccionada.id === tarjeta.id
                      ? '#f0f0f0'
                      : '',
                }}
              >
                <td>{tarjeta.numero_tarjeta}</td>
                {/* Asegúrate de acceder correctamente a las propiedades del tipo de tarjeta */}
                <td>{tarjeta.tipo_tarjeta ? tarjeta.tipo_tarjeta.nombre : 'Sin tipo'}</td> {/* Aquí accedemos a nombre */}
                <td>{tarjeta.fecha_expiracion}</td>
                <td>{tarjeta.estado}</td>
                <td>
                  <button onClick={() => toggleFormulario(tarjeta)}>Editar</button>
                  <button onClick={() => handleEliminarTarjeta(tarjeta.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {tarjetaSeleccionada && (
        <div>
          <h3>Detalles de la Tarjeta</h3>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Tipo</th>
                <th>Fecha de Expiración</th>
                <th>Código de Seguridad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tarjetaSeleccionada.numero_tarjeta}</td>
                {/* Acceder al nombre del tipo de tarjeta de nuevo */}
                <td>{tarjetaSeleccionada.tipo_tarjeta ? tarjetaSeleccionada.tipo_tarjeta.nombre : 'Sin tipo'}</td>
                <td>{tarjetaSeleccionada.fecha_expiracion}</td>
                <td>{tarjetaSeleccionada.codigo_seguridad}</td>
                <td>{tarjetaSeleccionada.estado}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TarjetasCrud;
