import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/entrenadores';

const obtenerEntrenadores = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
};

const obtenerPorNombre = async (nombre) => {
    const response = await axios.get(`${apiUrl}/nombre/${nombre}`);
    return response.data;
};

const crearEntrenador = async (Entrenador) => {
    console.log(Entrenador);
    const response = await axios.post(apiUrl, Entrenador);
    return response.data;
};

const actualizarEntrenadores  = async (id, Entrenadores ) => {
    const response = await axios.put(`${apiUrl}/${id}`, Entrenadores );
    return response.data;
};

const eliminarEntrenadores = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerEntrenadores , obtenerPorId, obtenerPorNombre, crearEntrenador, actualizarEntrenadores , eliminarEntrenadores  };
