// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link,useNavigate, useParams } from "react-router-dom"
import  backend  from "../../services/partidos.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"
// Falta modificar
export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const {register, handleSubmit, formState: { errors }, reset, setValue} = useForm()
    const { Id_Partido } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const obtenerUsuario = async () => {
        const data = await backend.obtenerPorId(Id_Partido)
        
        setValue('Id_Equipo_Local',data.Id_Equipo_Local)
        setValue('Id_Equipo_Visitante',data.Id_Equipo_Visitante)
        setValue("Descripcion", data.Descripcion)
        setValue("Fecha_del_Partido", data.Fecha_del_Partido)
        }
        obtenerUsuario()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Partido])

    const onSubmit = async (data) => {
        try{
        await backend.actualizarPartido(Id_Partido, data)   
        navigate("/consultarPartidos")}
        catch (error){
            console.error(error)
            setErrorMessage("Se insertaron valores incorrectos, por favor verifique que sean válidos a través de consultas.");
        }
  }
        
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
        
                <h5>Actualización de Partido</h5>
        
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
        
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Equipo_Local">Equipo Local</label>
                    <input type="text" id="Id_Equipo_Local" className="form-control" {...register("Id_Equipo_Local", { required: 'Este campo es requerido' })} />
                    {errors.Id_Equipo_Local && <span className='text-danger'>{errors.Id_Equipo_Local.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Equipo_Visitante">Equipo Visitante</label>
                    <input type="text" id="Id_Equipo_Visitante" className="form-control" {...register("Id_Equipo_Visitante", { required: 'Este campo es requerido' })} />
                    {errors.Id_Equipo_Visitante && <span className='text-danger'>{errors.Id_Equipo_Visitante.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Descripcion">Descripcion</label>
                    <input type="text" id="Descripcion" className="form-control" {...register("Descripcion", { required: 'Este campo es requerido' })} />
                    {errors.Descripcion && <span className='text-danger'>{errors.Descripcion.message}</span>}
                </div>
        
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_del_Partido">Fecha del Partido</label>
                    <input type="date" id="Fecha_de_Nacimiento" className="form-control" {...register("Fecha_del_Partido", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_del_Partido && <span className='text-danger'>{errors.Fecha_del_Partido.message}</span>}
                </div>

                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">Registrar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
                <div className="form-group text-center mt-3">
                    <Link to='/consultarPartidos' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
        );
    }   