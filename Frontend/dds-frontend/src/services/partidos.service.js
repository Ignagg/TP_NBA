import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/partidos';

const obtenerPartidos = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
};

const obtenerPorDescripcion = async (descripcion) => {
    const response = await axios.get(`${apiUrl}/descripcion/${descripcion}`);
    return response.data;
};

const crearPartido = async (Partido) => {
    console.log(Partido);
    const response = await axios.post(apiUrl, Partido);
    return response.data;
};

const actualizarPartido = async (id, Partido) => {
    const response = await axios.put(`${apiUrl}/${id}`, Partido);
    return response.data;
};

const eliminarPartido = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerPartidos, obtenerPorId, obtenerPorDescripcion, crearPartido, actualizarPartido, eliminarPartido };
