import axios from 'axios';
const apiUrl = 'http://localhost:3001/api/contratos';

const obtenerContratos = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
};

const obtenerPorDescripcion = async (nombre) => {
    const response = await axios.get(`${apiUrl}/Descripcion/${nombre}`);
    return response.data;
};

const crearContratos = async (Contrato) => {
    console.log(Contrato);
    const response = await axios.post(apiUrl, Contrato);
    return response.data;
};

const actualizarContratos = async (id, Contrato) => {
    const response = await axios.put(`${apiUrl}/${id}`, Contrato);
    return response.data;
};

const eliminarContratos = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
};

export default { obtenerContratos, obtenerPorId, obtenerPorDescripcion, crearContratos, actualizarContratos, eliminarContratos };
