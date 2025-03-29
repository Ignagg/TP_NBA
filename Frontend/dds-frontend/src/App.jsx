import "./App.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/menu/Menu.jsx";
import Inicio from "./components/inicio/Inicio.jsx";
import Mascotas from "./components/mascotas/Consulta.jsx"
import MascotasRegistro from "./components/mascotas/Registro.jsx"
import MascotasModificacion from "./components/mascotas/Modificacion.jsx"
import Jugadores from "./components/jugadores/Consulta.jsx"
import JugadoresRegistro from "./components/jugadores/Registro.jsx"
import JugadoresModificacion from "./components/jugadores/Modificacion.jsx"
import Partidos from "./components/partidos/Consulta.jsx"
import PartidosRegistro from "./components/partidos/Registro.jsx"
import PartidosModificacion from "./components/partidos/Modificacion.jsx"
import EstadioConsulta from "./components/estadios/Consulta.jsx"
import EstadioRegistro from "./components/estadios/Registro.jsx"
import EstadioModificacion from "./components/estadios/Modificacion.jsx"
import Contratos from "./components/contratos/Consulta.jsx"
import ContratosRegistro from "./components/contratos/Registro.jsx"
import ContratosModificacion from "./components/contratos/Modificacion.jsx"
import Entrenadores from "./components/entrenadores/Consulta.jsx"
import EntrenadoresRegistro from "./components/entrenadores/Registro.jsx"
import EntrenadoresModificacion from "./components/entrenadores/Modificacion.jsx"
import Socios from "./components/socios/Consulta.jsx"
import SociosRegistro from "./components/socios/Registro.jsx"
import SociosModificacion from "./components/socios/Modificacion.jsx"
import Equipos from "./components/equipos/Consulta.jsx"
import EquiposRegistro from "./components/equipos/Registro.jsx"
import EquiposModificacion from "./components/equipos/Modificacion.jsx"
function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            {/* Inicio */}
            <Route path="/" element={<Inicio />} />
            {/* Menu */}
            <Route path="/menu" element={<Menu />} />
            {/* Mascotas */}
            <Route path='/ConsultarMascotas' element={<Mascotas />} />
            <Route path='/RegistrarMascotas' element={<MascotasRegistro />} />
            <Route path='/actualizarMascotas/:Id_Mascota' element={<MascotasModificacion/>} />
            {/* Jugadores */}
            <Route path='/ConsultarJugadores' element={<Jugadores />} />
            <Route path='/RegistrarJugadores' element={<JugadoresRegistro />} />
            <Route path='/actualizarJugadores/:Id_Jugadores' element={<JugadoresModificacion/>} />
            {/* Partidos */}
            <Route path='/ConsultarPartidos' element={<Partidos />} />
            <Route path='/RegistrarPartidos' element={<PartidosRegistro />} />
            <Route path='/actualizarPartidos/:Id_Partido' element={<PartidosModificacion/>} />
            {/* Estadios */}
            <Route path='/consultarEstadio' element={<EstadioConsulta />} />
            <Route path='/registrarEstadio' element={<EstadioRegistro />} />
            <Route path='/actualizarEstadios/:Id_Estadio' element={<EstadioModificacion/>} />
            {/* Contratos */}
            <Route path='/consultarContratos' element={<Contratos />} />
            <Route path='/registrarContratos' element={<ContratosRegistro />} />
            <Route path='/actualizarContratos/:Id_Contrato' element={<ContratosModificacion/>} />
            {/* Entrenadores */}
            <Route path='/consultarEntrenadores' element={<Entrenadores />} />
            <Route path='/registrarEntrenadores' element={<EntrenadoresRegistro />} />
            <Route path='/actualizarEntrenadores/:Id_Entrenador' element={<EntrenadoresModificacion/>} />
            {/* Socios */}
            <Route path='/ConsultarSocios' element={<Socios />} />
            <Route path='/RegistrarSocios' element={<SociosRegistro />} />
            <Route path='/actualizarSocios/:Id_Socio' element={<SociosModificacion/>} />
            {/* Equipos */}
            <Route path='/ConsultarEquipos' element={<Equipos />} />
            <Route path='/RegistrarEquipos' element={<EquiposRegistro />} />
            <Route path='/actualizarEquipos/:Id_Equipo' element={<EquiposModificacion/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
