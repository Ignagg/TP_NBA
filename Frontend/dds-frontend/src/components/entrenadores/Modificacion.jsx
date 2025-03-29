// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import services from "../../services/entrenadores.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"

export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const { Id_Entrenador } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(Id_Entrenador)
        const obtenerUsuario = async () => {
            const data = await services.obtenerPorId(Id_Entrenador)

            console.log(data)
            setValue("Nombre_del_Entrenador", data.Nombre_del_Entrenador)
            setValue('Fecha_de_Nacimiento', data.Fecha_de_Nacimiento)
        }
        obtenerUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Entrenador])

    const onSubmit = async (data) => {
        try {
            await services.actualizarEntrenadores(Id_Entrenador, data)
            navigate("/ConsultarEntrenadores")
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
                <h5>Actualización de Entrenador</h5>
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Nombre">Nombre del Entrenador</label>
                    <input type="text" id="Nombre" className="form-control" {...register("Nombre_del_Entrenador", { required: 'Este campo es requerido' })} />
                    {errors.Nombre_del_Entrenador && <span className='text-danger'>{errors.Nombre_del_Entrenador.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_de_Nacimiento">Fecha de Nacimiento</label>
                    <input type="date" id="Fecha_de_Nacimiento" className="form-control" {...register("Fecha_de_Nacimiento", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_de_Nacimiento && <span className='text-danger'>{errors.Fecha_de_Nacimiento.message}</span>}
                </div>

                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">Actualizar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
                <div className="form-group text-center mt-3">
                    <Link to='/consultarEntrenadores' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
    );
}   
