// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link,useNavigate, useParams } from "react-router-dom"
import  backend  from "../../services/socios.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"

// Falta modificar
export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const {register, handleSubmit, formState: { errors }, reset, setValue} = useForm()
    const { Id_Socio } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const obtenerUsuario = async () => {
        const data = await backend.obtenerPorId(Id_Socio)
        
        setValue('Nombre',data.Nombre)
        setValue('Id_Equipo',data.Id_Equipo)
        setValue("Fecha_de_Afiliacion", data.Fecha_de_Afiliacion)
        setValue("Edad", data.Edad)
        }
        obtenerUsuario()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Socio])

    const onSubmit = async (data) => {
        try{
        await backend.actualizarSocio(Id_Socio, data)   
        navigate("/ConsultarSocios")}
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
        
                <h5>Actualización de Socio</h5>
        
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
        
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" className="form-control" {...register("Nombre", { required: 'Este campo es requerido' })} />
                    {errors.Nombre && <span className='text-danger'>{errors.Nombre.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Equipo">Id Equipo</label>
                    <input type="number" id="Id_Equipo" className="form-control" {...register("Id_Equipo", { required: 'Este campo es requerido' })} />
                    {errors.Id_Equipo && <span className='text-danger'>{errors.Id_Equipo.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_de_Afiliacion">Fecha_de_Afiliacion</label>
                    <input type="date" id="Fecha_de_Afiliacion" className="form-control" {...register("Fecha_de_Afiliacion", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_de_Afiliacion && <span className='text-danger'>{errors.Fecha_de_Afiliacion.message}</span>}
                </div>
        
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Edad">Edad</label>
                    <input type="number" id="Edad" className="form-control" {...register("Edad", { required: 'Este campo es requerido' })} />
                    {errors.Edad && <span className='text-danger'>{errors.Edad.message}</span>}
                </div>

                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">Registrar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
                <div className="form-group text-center mt-3">
                    <Link to='/ConsultarSocios' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
        );
    }   