import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/mascotas';

const obtenerMascotas = async () => {
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

const crearMascota = async (Mascota) => {
    console.log(Mascota);
    const response = await axios.post(apiUrl, Mascota);
    return response.data;
};

const actualizarMascota = async (id, Mascota) => {
    const response = await axios.put(`${apiUrl}/${id}`, Mascota);
    return response.data;
};

const eliminarMascota = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerMascotas, obtenerPorId, obtenerPorNombre, crearMascota, actualizarMascota, eliminarMascota };
