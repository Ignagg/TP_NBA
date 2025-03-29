import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/equipos';

const obtenerEquipos = async () => {
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

const crearEquipos = async (Equipo) => {
    console.log(Equipo);
    const response = await axios.post(apiUrl, Equipo);
    return response.data;
};

const actualizarEquipos = async (id, Equipo) => {
    const response = await axios.put(`${apiUrl}/${id}`, Equipo);
    return response.data;
};

const eliminarEquipos = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerEquipos, obtenerPorId, obtenerPorNombre, crearEquipos, actualizarEquipos, eliminarEquipos };
