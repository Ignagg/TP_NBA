// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import backend from '../../services/jugadores.service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";

export default function Consulta() {
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const res = await backend.obtenerJugadores();
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
                    const filasFiltradas = await backend.obtenerPorNombre(filter);
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

    const handleDeleteUser = async (Id_Jugadores) => {
        await backend.eliminarJugador(Id_Jugadores);
        await loadData();
    };

    return (
        <div className="imagenFondo">
            <div className="container mt-5">
                <Link to='/menu' className='btn btn-dark mx-2 mb-5'>
                <i className="fa-solid fa-rotate-left"></i>
                </Link>
                <h2 className="text-left mb-5" id="title" style={{ color: "black" }}>Jugadores</h2>
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
                        <thead className="table-dark" style={{textAlign:"center"}}>
                        <tr>
                            <th scope="col">Id_Jugadores</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Id_Equipo</th>
                            <th scope="col">Fecha_de_Nacimiento</th>
                            <th scope="col">Acciones</th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign:"center"}}>
                        {rows && rows.map((item) => (
                            <tr key={item.Id_Jugadores}>
                                <td>{item.Id_Jugadores}</td>
                                <td>{item.Nombre_del_Jugador}</td>
                                <td>{item.Id_Equipo}</td>
                                <td>{item.Fecha_de_Nacimiento}</td>
                                <td>
                                    <button
                                        onClick={async () => await handleDeleteUser(item.Id_Jugadores)}
                                        className="btn btn-danger mx-1">
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => navigate(`/actualizarJugadores/${item.Id_Jugadores}`)}
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
                    <Link className='btn btn-dark mx-2 mb-5' to='/RegistrarJugadores'>Registrar Jugador</Link>
                    <Link to='/menu' className='btn btn-dark mx-2 mb-5'>Volver al menú</Link>
                </div>
            </div>
        </div>
    );
}
