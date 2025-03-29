// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import services from "../../services/estadios.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"

export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const { Id_Estadio } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(Id_Estadio)
        const obtenerUsuario = async () => {
            const data = await services.obtenerPorId(Id_Estadio)

            console.log(data)
            setValue("Nombre_del_Estadio", data.Nombre_del_Estadio)
            setValue('Ciudad', data.Ciudad)
            setValue('Fecha_de_Inauguración', data.Fecha_de_Inauguración)
            setValue("Capacidad", data.Capacidad)

        }
        obtenerUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Estadio])

    const onSubmit = async (data) => {
        try {
            await services.actualizarEstadio(Id_Estadio, data)
            navigate("/consultarEstadio")
        }
        catch (error) {
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
                <h5>Actualización de Estadio</h5>
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Nombre">Nombre del Estadio</label>
                    <input type="text" id="Nombre" className="form-control" {...register("Nombre_del_Estadio", { required: 'Este campo es requerido' })} />
                    {errors.Nombre_del_Estadio && <span className='text-danger'>{errors.Nombre_del_Estadio.message}</span>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Ciudad">Ciudad</label>
                    <input type="text" id="Ciudad" className="form-control" {...register("Ciudad", { required: 'Este campo es requerido' })} />
                    {errors.Ciudad && <span className='text-danger'>{errors.Ciudad.message}</span>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Capacidad">Capacidad</label>
                    <input type="number" id="Capacidad" className="form-control" {...register("Capacidad", { required: 'Este campo es requerido' })} />
                    {errors.Capacidad && <span className='text-danger'>{errors.Capacidad.message}</span>}
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_de_Inauguración">Fecha de Inauguración</label>
                    <input type="date" id="Fecha_de_Inauguración" className="form-control" {...register("Fecha_de_Inauguración", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_de_Inauguración && <span className='text-danger'>{errors.Fecha_de_Inauguración.message}</span>}
                </div>

                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">Actualizar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
                <div className="form-group text-center mt-3">
                    <Link to='/consultarEstadio' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
    );
}   
