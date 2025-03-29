
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/entrenadores.service.js";
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
      const res = await backend.crearEntrenador(data);
      if (res) {
        setAction("C");
        navigate("/consultarEntrenadores");
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
          <h5 style={{ textAlign: "center" }}>Registro de Nuevo Entrenador</h5>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Nombre_del_Entrenador">
              Nombre
            </label>
            <input
              type="text"
              id="Nombre_del_Entrenador"
              className="form-control"
              {...register("Nombre_del_Entrenador", { required: "Este campo es requerido" })}
            />
            {errors.Nombre_del_Entrenador && (
              <span className="text-danger">{errors.Nombre_del_Entrenador.message}</span>
            )}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Fecha_de_Nacimiento">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="Fecha_de_Nacimiento"
              className="form-control"
              {...register("Fecha_de_Nacimiento", {
                required: "Este campo es requerido",
              })}
            />
            {errors.Fecha_de_Nacimiento && (
              <span className="text-danger">
                {errors.Fecha_de_Nacimiento.message}
              </span>
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
            <Link to="/consultarEntrenadores" className="btn btn-dark">
              Volver
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
