// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/mascotas.service.js";
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
      const res = await backend.crearMascota(data);
      if (res) {
        setAction("C");
        navigate("/consultarMascotas");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Se insertaron valores incorrectos de ID, por favor verifique que sean válidos a través de consultas."
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
          <h5 style={{ textAlign: "center" }}>Registro de Nueva Mascota</h5>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Nombre">
              Nombre
            </label>
            <input
              type="text"
              id="Nombre"
              className="form-control"
              {...register("Nombre", { required: "Este campo es requerido" })}
            />
            {errors.Nombre && (
              <span className="text-danger">{errors.Nombre.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Edad">
              Edad
            </label>
            <input
              type="number"
              id="Edad"
              className="form-control"
              {...register("Edad", { required: "Este campo es requerido" })}
            />
            {errors.Edad && (
              <span className="text-danger">{errors.Edad.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Fecha_de_Aparicion">
              Fecha de Aparición
            </label>
            <input
              type="date"
              id="Fecha_de_Aparicion"
              className="form-control"
              {...register("Fecha_de_Aparicion", {
                required: "Este campo es requerido",
              })}
            />
            {errors.Fecha_de_Aparicion && (
              <span className="text-danger">
                {errors.Fecha_de_Aparicion.message}
              </span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Equipo">
              Equipo
            </label>
            <select
              id="Id_Equipo"
              className="form-control"
              {...register("Id_Equipo", {
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
            {errors.Id_Equipo && (
              <span className="text-danger">{errors.Id_Equipo.message}</span>
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
            <Link to="/consultarMascotas" className="btn btn-dark">
              Volver
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}