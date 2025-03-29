import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/estadios';

const obtenerEstadio = async () => {
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

const crearEstadio = async (Estadio) => {
    console.log(Estadio);
    const response = await axios.post(apiUrl, Estadio);
    return response.data;
};

const actualizarEstadio = async (id, Estadio) => {
    const response = await axios.put(`${apiUrl}/${id}`, Estadio);
    return response.data;
};

const eliminarEstadio = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerEstadio, obtenerPorId, obtenerPorNombre, crearEstadio, actualizarEstadio, eliminarEstadio };
