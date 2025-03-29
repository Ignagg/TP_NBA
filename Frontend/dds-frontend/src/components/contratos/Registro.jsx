// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import backend from "../../services/contratos.service.js";
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
      const res = await backend.crearContratos(data);
      if (res) {
        setAction("C");
        navigate("/consultarContratos");
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
          <h5 style={{ textAlign: "center" }}>Registro de Contrato</h5>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Jugador">
            Id_Jugador
            </label>
            <input
              type="number"
              id="Id_Jugador"
              className="form-control"
              {...register("Id_Jugador", { required: "Este campo es requerido" })}
            />
            {errors.Id_Jugador && (
              <span className="text-danger">{errors.Id_Jugador.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Id_Equipo">
            Id_Equipo
            </label>
            <input
              type="number"
              id="Id_Equipo"
              className="form-control"
              {...register("Id_Equipo", { required: "Este campo es requerido" })}
            />
            {errors.Id_Equipo && (
              <span className="text-danger">{errors.Id_Equipo.message}</span>
            )}
          </div>
          
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Fecha_de_Inicio">
            Fecha_de_Inicio
            </label>
            <input
              type="date"
              id="Fecha_de_Inicio"
              className="form-control"
              {...register("Fecha_de_Inicio", {
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
            <label className="form-label" htmlFor="Fecha_de_Fin">
            Fecha_de_Fin
            </label>
            <input
              type="date"
              id="Fecha_de_Fin"
              className="form-control"
              {...register("Fecha_de_Fin", {
                required: "Este campo es requerido",
              })}
            />
            {errors.Fecha_de_Fin && (
              <span className="text-danger">
                {errors.Fecha_de_Fin.message}
              </span>
            )}
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Salario_Total">
            Salario_Total
            </label>
            <input
              type="number"
              id="Salario_Total"
              className="form-control"
              {...register("Salario_Total", { required: "Este campo es requerido" })}
            />
            {errors.Salario_Total && (
              <span className="text-danger">{errors.Salario_Total.message}</span>
            )}
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="Descripcion">
              Descripcion
            </label>
            <input
              type="text"
              id="Descripcion"
              className="form-control"
              {...register("Descripcion", { required: "Este campo es requerido" })}
            />
            {errors.Descripcion && (
              <span className="text-danger">{errors.Descripcion.message}</span>
            )}
          </div>

          <div className="form-group text-center mt-3">
            <button type="submit" className="btn btn-success mx-1">
              Registrar
            </button>
            <button type="reset" className="btn btn-secondary mx-1">
              Limpiar
            </button>
            <Link to="/consultarContratos" className="btn btn-dark">
              Volver
            </Link>
          </div>

        </form>
      )}
    </div>
  );
}