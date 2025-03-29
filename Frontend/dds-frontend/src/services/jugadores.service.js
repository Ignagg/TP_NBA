import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/jugadores';

const obtenerJugadores = async () => {
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

const crearJugador = async (Jugador) => {
    console.log(Jugador);
    const response = await axios.post(apiUrl, Jugador);
    return response.data;
};

const actualizarJugadores = async (id, Jugador) => {
    const response = await axios.put(`${apiUrl}/${id}`, Jugador);
    return response.data;
};

const eliminarJugador = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerJugadores, obtenerPorId, obtenerPorNombre, crearJugador, actualizarJugadores, eliminarJugador };
