import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirección
import axios from 'axios';
import FormularioLocacion from '../Formularios/FormulariosLocacion'; // Importa el formulario creado

const LocacionesCrud = () => {
  const [locaciones, setLocaciones] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false); // Controla la visibilidad del formulario
  const [locacionEditando, setLocacionEditando] = useState(null); // Locación que se está editando
  const [campoOrden, setCampoOrden] = useState('id'); // Campo por el que se ordena
  const [direccionOrden, setDireccionOrden] = useState('asc'); // Dirección del orden (ascendente o descendente)
  const [locacionSeleccionada, setLocacionSeleccionada] = useState(null); // Locación seleccionada para ver más detalles

  const navigate = useNavigate(); // Para redireccionar al homepage

  // Cargar la lista de locaciones
  useEffect(() => {
    const fetchLocaciones = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/locations/');
        setLocaciones(response.data);
      } catch (error) {
        console.error('Error al obtener locaciones:', error);
      }
    };
    fetchLocaciones();
  }, []);

  // Función para abrir/cerrar el formulario
  const toggleFormulario = (locacion = null) => {
    setShowFormulario(!showFormulario);
    setLocacionEditando(locacion); // Si estamos editando, seteamos la locación
  };

  // Función para actualizar la lista de locaciones después de crear o actualizar una
  const handleLocacionCreada = () => {
    const fetchLocaciones = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/locations/');
        setLocaciones(response.data);
      } catch (error) {
        console.error('Error al obtener locaciones:', error);
      }
    };
    fetchLocaciones();
  };

  // Eliminar locación
  const handleEliminarLocacion = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/locations/${id}/`);
      handleLocacionCreada(); // Actualizamos la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar la locación:', error);
    }
  };

  // Función para ordenar las locaciones
  const ordenarLocaciones = (campo) => {
    const nuevaDireccion = campo === campoOrden && direccionOrden === 'asc' ? 'desc' : 'asc';
    setDireccionOrden(nuevaDireccion);
    setCampoOrden(campo);

    const locacionesOrdenadas = [...locaciones].sort((a, b) => {
      if (a[campo] < b[campo]) return nuevaDireccion === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return nuevaDireccion === 'asc' ? 1 : -1;
      return 0;
    });

    setLocaciones(locacionesOrdenadas);
  };

  return (
    <div className="locaciones-crud">
      <h2 className="titulo">Gestión de Locaciones</h2>
      
      {/* Botón para volver al homepage */}
      <button className="boton volver-home" onClick={() => navigate('/')}>
        Volver al Home
      </button>

      {/* Botón para agregar o cerrar formulario */}
      <button className="boton agregar-locacion" onClick={() => toggleFormulario()}>
        {showFormulario ? 'Cerrar Formulario' : 'Agregar Locación'}
      </button>

      {/* Mostrar el formulario solo si showFormulario es true */}
      {showFormulario && <FormularioLocacion onLocacionCreada={handleLocacionCreada} locacion={locacionEditando} />}

      <table className="tabla">
        <thead>
          <tr>
            <th onClick={() => ordenarLocaciones('id')}>ID {campoOrden === 'id' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarLocaciones('nombre')}>Nombre {campoOrden === 'nombre' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarLocaciones('direccion')}>Dirección {campoOrden === 'direccion' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => ordenarLocaciones('tipo')}>Tipo {campoOrden === 'tipo' ? (direccionOrden === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {locaciones.length === 0 ? (
            <tr>
              <td colSpan="5">No hay locaciones disponibles</td>
            </tr>
          ) : (
            locaciones.map((locacion) => (
              <tr key={locacion.id}>
                <td>{locacion.id}</td>
                <td>{locacion.nombre}</td>
                <td>{locacion.direccion}</td>
                <td>{locacion.tipo}</td>
                <td>
                  <button className="boton editar" onClick={() => toggleFormulario(locacion)}>Editar</button>
                  <button className="boton eliminar" onClick={() => handleEliminarLocacion(locacion.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LocacionesCrud;
