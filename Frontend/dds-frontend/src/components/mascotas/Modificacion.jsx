// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link,useNavigate, useParams } from "react-router-dom"
import  backend  from "../../services/mascotas.service.js"
import "../style.css"
import backgroundImage from "./player.jpg"

export default function UpdateForm() {
    // eslint-disable-next-line no-unused-vars
    const {register, handleSubmit, formState: { errors }, reset, setValue} = useForm()
    const { Id_Mascota } = useParams()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(Id_Mascota)
        const obtenerUsuario = async () => {
        const data = await backend.obtenerPorId(Id_Mascota)
        
        console.log(data)
        setValue("Nombre", data.Nombre)
        setValue('Equipo',data.Id_Equipo)
        setValue('Fecha_de_Aparicion',data.Fecha_de_Aparicion)
        setValue("Edad", data.Edad)
        }
        obtenerUsuario()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Mascota])

    const onSubmit = async (data) => {
        try{
        await backend.actualizarMascota(Id_Mascota, data)   
        navigate("/consultarMascotas")}
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
        
                <h5>Actualización de Mascota</h5>
        
                {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
        
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Nombre">Nombre</label>
                    <input type="text" id="Nombre" className="form-control" {...register("Nombre", { required: 'Este campo es requerido' })} />
                    {errors.Nombre && <span className='text-danger'>{errors.Nombre.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Id_Equipo">Equipo</label>
                    <select id="Id_Equipo" className="form-control" {...register("Id_Equipo", { required: 'Este campo es requerido' })}>
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
                    {errors.Id_Equipo && <span className='text-danger'>{errors.Id_Equipo.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Edad">Edad</label>
                    <input type="Number" id="Fecha_de_Nacimiento" className="form-control" {...register("Edad", { required: 'Este campo es requerido' })} />
                    {errors.Edad && <span className='text-danger'>{errors.Edad.message}</span>}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="Fecha_de_Aparicion">Fecha de Aparicion</label>
                    <input type="date" id="Fecha_de_Nacimiento" className="form-control" {...register("Fecha_de_Aparicion", { required: 'Este campo es requerido' })} />
                    {errors.Fecha_de_Aparicion && <span className='text-danger'>{errors.Fecha_de_Aparicion.message}</span>}
                </div>
        
                
        
                <div className="form-group text-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">Registrar</button>
                    <button type="reset" className="btn btn-secondary mx-1">Limpiar</button>
                </div>
                <div className="form-group text-center mt-3">
                    <Link to='/consultarMascotas' className='btn btn-dark'>Volver</Link>
                </div>
            </form>
        </div>
        );
    }   
