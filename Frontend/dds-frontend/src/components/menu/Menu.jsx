// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StylesMenu.css";
import Logo from "./logo";
import { Navbar } from "react-bootstrap";

export default function Component() {
  return (
    <div className="bg-light rounded border p-4 w-100 max-w-4xl mx-auto">
      <Navbar bg="light" expand="lg">
        <div className="h4 d-flex justify-content-left align-items-left">
          <Link className="btn btn-light" to="../">
            <i className="fa-solid fa-basketball"></i>
          </Link>
        </div>
        <div className="h4 d-flex justify-content-center align-items-center">
          Menu
        </div>
      </Navbar>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div style={{ width: 40, height: 40 }} className="rounded-circle">
            <Logo />
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="../ConsultarEquipos"
          >
            <div className="card-body">
              <i className="fa-solid fa-people-group"></i>
              <h3 className="card-title h5">Equipos</h3>
              <p className="card-text text-muted">Consulta los equipos</p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="../ConsultarContratos"
          >
            <div className="card-body">
              <i className="fa-solid fa-file-contract"></i>
              <h3 className="card-title h5">Contratos</h3>
              <p className="card-text text-muted">
                Conoce a los equipos que compiten.
              </p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="../ConsultarMascotas"
          >
            <div className="card-body">
              <i className="fa-solid fa-paw"></i>
              <h3 className="card-title h5">Mascotas</h3>
              <p className="card-text text-muted">
                Descubre información sobre las mascotas.
              </p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="/ConsultarSocios"
          >
            <div className="card-body">
              <i className="fa-solid fa-handshake"></i>
              <h3 className="card-title h5">Socios</h3>
              <p className="card-text text-muted">Consulta los socios.</p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="../ConsultarPartidos"
          >
            <div className="card-body">
              <i className="fa-solid fa-flag-checkered"></i>
              <h3 className="card-title h5">Partidos</h3>
              <p className="card-text text-muted">
                Mantente al tanto de los partidos.
              </p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="../ConsultarEntrenadores"
          >
            <div className="card-body">
              <i className="fa-solid fa-dumbbell"></i>
              <h3 className="card-title h5">Entrenadores</h3>
              <p className="card-text text-muted">
                Conoce quienes son los entrenadores.
              </p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="/consultarEstadio"
          >
            <div className="card-body">
              <i className="fa-solid fa-inbox"></i>
              <h3 className="card-title h5">Estadios</h3>
              <p className="card-text text-muted">Consultar estadios.</p>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link
            className="card text-center h-100 btn btn-outline-danger"
            to="../ConsultarJugadores"
          >
            <div className="card-body">
              <i className="fa-solid fa-person"></i>
              <h3 className="card-title h5">Jugadores</h3>
              <p className="card-text text-muted">
                Mantente informado sobre quienes son los jugadores.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
