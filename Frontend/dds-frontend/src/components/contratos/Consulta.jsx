// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import backend from '../../services/contratos.service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";

export default function Consulta() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const res = await backend.obtenerContratos();
            setRows(res.Items); // Ajuste para trabajar con el formato de datos
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const filasFiltradas = async () => {
            if (filter) {
                try {
                    const filasFiltradas = await backend.obtenerPorDescripcion(filter);
                    setRows(filasFiltradas);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            } else {
                loadData();
            }
        };
        filasFiltradas();
    }, [filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleDeleteUser = async (Id_Contrato) => {
        await backend.eliminarContratos(Id_Contrato);
        await loadData();
    };

    return (
        <div className="imagenFondo">
            <div className="container mt-5">
                <Link to='/menu' className='btn btn-dark mx-2 mb-5'>
                <i className="fa-solid fa-rotate-left"></i>
                </Link>
                <h2 className="text-left mb-5" id="title" style={{ color: "black" }}>Contratos</h2>
                <div className="mb-4">
                    <input type="text"
                           className="form-control"
                           placeholder="Filtrar por descripcion"
                           value={filter}
                           onChange={handleFilterChange}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-dark" style={{textAlign:"center"}}>
                        <tr>
                            <th scope="col">Id_Contrato</th>
                            <th scope="col">Id_Jugador</th>
                            <th scope="col">Id_Equipo</th>
                            <th scope="col">Fecha_de_Inicio</th>
                            <th scope="col">Fecha_de_Fin</th>
                            <th scope="col">Salario_Total</th>
                            <th scope='col'>Descripcion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign:"center"}}>
                        {rows && rows.map((item) => (
                            <tr key={item.Id_Contrato}>
                                <td>{item.Id_Contrato}</td>
                                <td>{item.Id_Jugador}</td>
                                <td>{item.Id_Equipo}</td>
                                <td>{item.Fecha_de_Inicio}</td>
                                <td>{item.Fecha_de_Fin}</td>
                                <td>{item.Salario_Total}</td>
                                <td>{item.Descripcion}</td>
                                <td>
                                    <button
                                        onClick={async () => await handleDeleteUser(item.Id_Contrato)}
                                        className="btn btn-danger mx-1">
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => navigate(`/actualizarContratos/${item.Id_Contrato}`)}
                                        className="btn btn-success mx-1">
                                        Modificar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div style={{textAlign:"center"}}>
                    <Link className='btn btn-dark mx-2 mb-5' to='/RegistrarContratos'>Registrar Contrato</Link>
                    <Link to='/menu' className='btn btn-dark mx-2 mb-5'>Volver al menú</Link>
                </div>
            </div>
        </div>
    );
}
