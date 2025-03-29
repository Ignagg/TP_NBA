// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import service from '../../services/estadios.service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";
import backgroundImage from "./TD-GARDEN.jpg";

export default function Consulta() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const res = await service.obtenerEstadio();
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
                    const filasFiltradas = await service.obtenerPorNombre(filter);
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

    const handleDeleteUser = async (Id_Estadio) => {
        await service.eliminarEstadio(Id_Estadio);
        await loadData();
    };

    return (
        <div className="imagenFondo">
            
            <div className="container mt-5">
                <Link to='/menu' className='btn btn-dark mx-2 mb-5'>
                    <i className="fa-solid fa-rotate-left"></i>
                </Link>
                <h2 className="text-left mb-5" id="title" style={{ color: "black" }}>Estadios</h2>
                <div className="mb-4">
                    <input type="text"
                        className="form-control"
                        placeholder="Filtrar por nombre"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-dark" style={{ textAlign: "center" }}>
                            <tr>
                                <th scope="col">Id_Estadio</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Ciudad</th>
                                <th scope="col">Capacidad</th>
                                <th scope="col">Fecha_de_Inauguración</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {rows && rows.map((item) => (
                                <tr key={item.Id_Estadio}>
                                    <td>{item.Id_Estadio}</td>
                                    <td>{item.Nombre_del_Estadio}</td>
                                    <td>{item.Ciudad}</td>
                                    <td>{item.Capacidad}</td>
                                    <td>{item.Fecha_de_Inauguración}</td>
                                    <td>
                                        <button
                                            onClick={async () => await handleDeleteUser(item.Id_Estadio)}
                                            className="btn btn-danger mx-1">
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={() => navigate(`/actualizarEstadios/${item.Id_Estadio}`)}
                                            className="btn btn-success mx-1">
                                            Modificar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Link className='btn btn-dark mx-2 mb-5' to='/registrarEstadio'>Registrar Estadio</Link>
                    <Link to='/menu' className='btn btn-dark mx-2 mb-5'>Volver al menú</Link>
                </div>
            </div>
        </div>
    );
}
