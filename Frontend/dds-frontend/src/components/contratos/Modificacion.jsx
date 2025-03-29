// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import services from "../../services/contratos.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"

export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const { Id_Contrato } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(Id_Contrato)
        const obtenerUsuario = async () => {
            const data = await services.obtenerPorId(Id_Contrato)
            console.log(data)
            setValue("Id_Jugador", data.Id_Jugador)
            setValue('Id_Equipo', data.Id_Equipo)
            setValue('Fecha_de_Inicio', data.Fecha_de_Inicio)
            setValue("Fecha_de_Fin", data.Fecha_de_Fin)
            setValue('Salario_Total', data.Salario_Total)
            setValue('Descripcion', data.Descripcion)
        }
        obtenerUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Contrato])

    const onSubmit = async (data) => {
        try {
            await services.actualizarContratos(Id_Contrato, data)
            navigate("/ConsultarContratos")
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
                <h5>Actualización de Contratos</h5>
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Jugador">Id del Jugador</label>
                    <input type="number" id="Id_Jugador" className="form-control" {...register("Id_Jugador", { required: 'Este campo es requerido' })} />
                    {errors.Id_Jugador && <span className='text-danger'>{errors.Id_Jugador.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Equipo">Id del Equipo</label>
                    <input type="number" id="Id_Equipo" className="form-control" {...register("Id_Equipo", { required: 'Este campo es requerido' })} />
                    {errors.Id_Equipo && <span className='text-danger'>{errors.Id_Equipo.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_de_Nacimiento">Fecha de Inicio</label>
                    <input type="date" id="Fecha_de_Inicio" className="form-control" {...register("Fecha_de_Inicio", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_de_Inicio && <span className='text-danger'>{errors.Fecha_de_Inicio.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_de_Fin">Fecha de Fin</label>
                    <input type="date" id="Fecha_de_Fin" className="form-control" {...register("Fecha_de_Fin", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_de_Fin && <span className='text-danger'>{errors.Fecha_de_Fin.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Nombre">Salario</label>
                    <input type="number" id="Salario_Total" className="form-control" {...register("Salario_Total", { required: 'Este campo es requerido' })} />
                    {errors.Salario_Total && <span className='text-danger'>{errors.Salario_Total.message}</span>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Nombre">Descripcion</label>
                    <input type="text" id="Descripcion" className="form-control" {...register("Descripcion", { required: 'Este campo es requerido' })} />
                    {errors.Descripcion && <span className='text-danger'>{errors.Descripcion.message}</span>}
                </div>
                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">Actualizar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                    <Link to='/consultarContratos' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
    );
}   
