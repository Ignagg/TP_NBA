// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import backend from '../../services/partidos.service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";

export default function Consulta() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const res = await backend.obtenerPartidos();
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

    const handleDeleteUser = async (Id_Partido) => {
        await backend.eliminarPartido(Id_Partido);
        await loadData();
    };

    return (
        <div className="imagenFondo">
            <div className="container mt-5">
                <Link to='/menu' className='btn btn-dark mx-2 mb-5'>
                <i className="fa-solid fa-rotate-left"></i>
                </Link>
                <h2 className="text-left mb-5" id="title" style={{ color: "black" }}>Partidos</h2>
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
                            <th scope="col">Id_Partido</th>
                            <th scope="col">Id_Equipo_Local</th>
                            <th scope="col">Id_Equipo_Visitante</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Fecha_del_Partido</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign:"center"}}>
                        {rows && rows.map((item) => (
                            <tr key={item.Id_Partido}>
                                <td>{item.Id_Partido}</td>
                                <td>{item.Id_Equipo_Local}</td>
                                <td>{item.Id_Equipo_Visitante}</td>
                                <td>{item.Descripcion}</td>
                                <td>{item.Fecha_del_Partido}</td>
                                <td>
                                    <button
                                        onClick={async () => await handleDeleteUser(item.Id_Partido)}
                                        className="btn btn-danger mx-1">
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => navigate(`/actualizarPartidos/${item.Id_Partido}`)}
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
                    <Link className='btn btn-dark mx-2 mb-5' to='/RegistrarPartidos'>Registrar Partido</Link>
                    <Link to='/menu' className='btn btn-dark mx-2 mb-5'>Volver al menú</Link>
                </div>
            </div>
        </div>
    );
}
