// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/equipos.service.js";
import "../style.css";
import "./style_container.css"
import backgroundImage from "./player.jpg";
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
      const res = await backend.crearEquipos(data);
      if (res) {
        setAction("C");
        navigate("/consultarEquipos");
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
          <h5 style={{ textAlign: "center" }}>Registro de Equipos</h5>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Fundado">
            Fundado
            </label>
            <input
              type="date"
              id="Fundado"
              className="form-control"
              {...register("Fundado", {
                required: "Este campo es requerido",
              })}
            />
            {errors.Fecha_de_Inicio && (
              <span className="text-danger">
                {errors.Fecha_de_Inicio.message}
              </span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Nombre_del_Equipo">
            Nombre del Equipo
            </label>
            <input
              type="text"
              id="Nombre_del_Equipo"
              className="form-control"
              {...register("Nombre_del_Equipo", { required: "Este campo es requerido" })}
            />
            {errors.Nombre_del_Equipo && (
              <span className="text-danger">{errors.Nombre_del_Equipo.message}</span>
            )}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Estadio">
            Id_Estadio
            </label>
            <input
              type="number"
              id="Id_Estadio"
              className="form-control"
              {...register("Id_Estadio", { required: "Este campo es requerido" })}
            />
            {errors.Id_Estadio && (
              <span className="text-danger">{errors.Id_Estadio.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Entrenador">
            Id_Entrenador
            </label>
            <input
              type="number"
              id="Id_Entrenador"
              className="form-control"
              {...register("Id_Entrenador", { required: "Este campo es requerido" })}
            />
            {errors.Id_Entrenador && (
              <span className="text-danger">{errors.Id_Entrenador.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Ciudad">
            Ciudad
            </label>
            <input
              type="text"
              id="Ciudad"
              className="form-control"
              {...register("Ciudad", { required: "Este campo es requerido" })}
            />
            {errors.Ciudad && (
              <span className="text-danger">{errors.Ciudad.message}</span>
            )}
          </div>

          <div className="form-group text-center mt-3">
            <button type="submit" className="btn btn-success mx-1">
              Registrar
            </button>
            <button type="reset" className="btn btn-secondary mx-1">
              Limpiar
            </button>
            <Link to="/consultarEquipos" className="btn btn-dark">
              Volver
            </Link>
          </div>

        </form>
      )}
    </div>
  );
}