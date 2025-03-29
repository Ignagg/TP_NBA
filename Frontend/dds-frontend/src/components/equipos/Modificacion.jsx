// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../../services/equipos.service.js";
import "../style.css";
import backgroundImage from "./player.jpg";

export default function UpdateForm() {
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { Id_Equipo } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(Id_Equipo);
    const obtenerUsuario = async () => {
      const data = await services.obtenerPorId(Id_Equipo);
      console.log(data);
      setValue("Id_Equipo", data.Id_Equipo);
      setValue("Fundado", data.Fundado);
      setValue("Nombre_del_Equipo", data.Nombre_del_Equipo);
      setValue("Id_Estadio", data.Id_Estadio);
      setValue("Id_Entrenador", data.Id_Entrenador);
      setValue("Ciudad", data.Ciudad);
    };
    obtenerUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id_Equipo]);

  const onSubmit = async (data) => {
    try {
      await services.actualizarEquipos(Id_Equipo, data);
      navigate("/ConsultarEquipos");
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
      <form onSubmit={handleSubmit(onSubmit)} className="registro">
        <h5>Actualización de Equipos</h5>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="Id_Equipo">
            Id del Equipo
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
          <label className="form-label" htmlFor="Fundado">
            Fundado
          </label>
          <input
            type="date"
            id="Fundado"
            className="form-control"
            {...register("Fundado", { required: "Este campo es requerido" })}
          />
          {errors.Fundado && (
            <span className="text-danger">{errors.Fundado.message}</span>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="Nombre">
            Nombre del Equipo
          </label>
          <input
            type="text"
            id="Nombre_del_Equipo"
            className="form-control"
            {...register("Nombre_del_Equipo", {
              required: "Este campo es requerido",
            })}
          />
          {errors.Nombre_del_Equipo && (
            <span className="text-danger">
              {errors.Nombre_del_Equipo.message}
            </span>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="Id_Estadio">
            Id del Estadio
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
            Id del Entrenador
          </label>
          <input
            type="number"
            id="Id_Entrenador"
            className="form-control"
            {...register("Id_Entrenador", {
              required: "Este campo es requerido",
            })}
          />
          {errors.Id_Entrenador && (
            <span className="text-danger">{errors.Id_Entrenador.message}</span>
          )}
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="Nombre">
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
            Actualizar
          </button>
          <button type="reset" className="btn btn-secondary mx-1">
            Limpiar
          </button>
          <Link to="/consultarEquipos" className="btn btn-dark">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
}
