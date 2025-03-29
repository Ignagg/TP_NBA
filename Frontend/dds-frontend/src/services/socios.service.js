import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/socios';

const obtenerSocio = async () => {
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

const crearSocio = async (Socio) => {
    console.log(Socio);
    const response = await axios.post(apiUrl, Socio);
    return response.data;
};

const actualizarSocio  = async (id, Socio ) => {
    const response = await axios.put(`${apiUrl}/${id}`, Socio );
    return response.data;
};

const eliminarSocio = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerSocio , obtenerPorId, obtenerPorNombre, crearSocio, actualizarSocio , eliminarSocio  };