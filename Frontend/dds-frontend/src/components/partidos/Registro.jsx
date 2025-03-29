// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/partidos.service.js";
import "../style.css";
import "./style_container.css"
import backgroundImage from "./player.jpg";
// PARTIDO TIENE Id_Partido, Id_Equipo_Local, Id_Equipo_Visitante, Descripcion, Fecha_del_Partido
export default function Registro() {
  const [action, setAction] = useState("R");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await backend.crearPartido(data);
      if (res) {
        setAction("C");
        navigate("/consultarPartidos");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Se insertaron valores incorrectos, por favor verifique que sean válidos a través de consultas."
      );
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {action === "R" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="registro p-4"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h5 style={{ textAlign: "center" }}>Registro de Nuevo Partido</h5>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Nombre">
              Descripcion
            </label>
            <input
              type="text"
              id="Nombre"
              className="form-control"
              {...register("Descripcion", { required: "Este campo es requerido" })}
            />
            {errors.Descripcion && (
              <span className="text-danger">{errors.Descripcion.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Fecha_del_Partido">
              Fecha del partido
            </label>
            <input
              type="date"
              id="Fecha_del_Partido"
              className="form-control"
              {...register("Fecha_del_Partido", {
                required: "Este campo es requerido",
              })}
            />
            {errors.Fecha_del_Partido && (
              <span className="text-danger">
                {errors.Fecha_del_Partido.message}
              </span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Equipo_Local">
              Equipo Local
            </label>
            <select
              id="Id_Equipo_Local"
              className="form-control"
              {...register("Id_Equipo_Local", {
                required: "Este campo es requerido",
              })}
            >
              <option value="">Seleccione un equipo</option>
              <option value="1">San Antonio Spurs</option>
              <option value="2">Golden State Warriors</option>
              <option value="3">Miami Heat</option>
              <option value="4">LA Clippers</option>
              <option value="5">Milwaukee Bucks</option>
              <option value="6">Boston Celtics</option>
              <option value="7">Orlando Magic</option>
              <option value="8">Toronto Raptors</option>
              <option value="9">Utah Jazz</option>
              <option value="10">Dallas Mavericks</option>
            </select>
            {errors.Id_Equipo_Local && (
              <span className="text-danger">{errors.Id_Equipo_Local.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Equipo_Visitante">
              Equipo Visitante
            </label>
            <select
              id="Id_Equipo_Visitante"
              className="form-control"
              {...register("Id_Equipo_Visitante", {
                required: "Este campo es requerido",
              })}
            >
              <option value="">Seleccione un equipo</option>
              <option value="1">San Antonio Spurs</option>
              <option value="2">Golden State Warriors</option>
              <option value="3">Miami Heat</option>
              <option value="4">LA Clippers</option>
              <option value="5">Milwaukee Bucks</option>
              <option value="6">Boston Celtics</option>
              <option value="7">Orlando Magic</option>
              <option value="8">Toronto Raptors</option>
              <option value="9">Utah Jazz</option>
              <option value="10">Dallas Mavericks</option>
            </select>
            {errors.Id_Equipo_Visitante && (
              <span className="text-danger">{errors.Id_Equipo_Visitante.message}</span>
            )}
          </div>

          <div className="form-group text-center mt-3">
            <button type="submit" className="btn btn-success mx-1">
              Registrar
            </button>
            <button type="reset" className="btn btn-secondary mx-1">
              Limpiar
            </button>
          </div>
          <div className="form-group text-center mt-3">
            <Link to="/consultarPartidos" className="btn btn-dark">
              Volver
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}