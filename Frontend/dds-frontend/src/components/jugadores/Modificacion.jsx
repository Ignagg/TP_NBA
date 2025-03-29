// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import services from "../../services/jugadores.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"

export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const { Id_Jugadores } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(Id_Jugadores)
        const obtenerUsuario = async () => {
            const data = await services.obtenerPorId(Id_Jugadores)

            console.log(data)
            setValue("Nombre_del_Jugador", data.Nombre_del_Jugador)
            setValue("Id_Equipo", data.Id_Equipo)
            setValue('Fecha_de_Nacimiento', data.Fecha_de_Nacimiento)
        }
        obtenerUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Jugadores])

    const onSubmit = async (data) => {
        try {
            await services.actualizarJugadores(Id_Jugadores, data)
            navigate("/ConsultarJugadores")
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
                <h5>Actualización de Jugador</h5>
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Nombre_del_Jugador">Nombre del Jugador</label>
                    <input type="text" id="Nombre_del_Jugador" className="form-control" {...register("Nombre_del_Jugador", { required: 'Este campo es requerido' })} />
                    {errors.Nombre_del_Jugador && <span className='text-danger'>{errors.Nombre_del_Jugador.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Equipo">Id Equipo</label>
                    <input type="number" id="Id_Equipo" className="form-control" {...register("Id_Equipo", { required: 'Este campo es requerido' })} />
                    {errors.Id_Equipo && <span className='text-danger'>{errors.Id_Equipo.message}</span>}
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
                    <Link to='/consultarJugadores' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
    );
}   

