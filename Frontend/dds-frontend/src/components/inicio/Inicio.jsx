import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from './f259e187d343dfe0c54a8b4baa2defa8.jpg';
import './StylesInicio.css';
export default function Component() {
  return (
    <section
      className="vh-100 d-flex align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      <div className="container text-center" id="Inicio">
        <div className="mb-4">
          <h1 className="display-4 font-weight-bold font-encabezado">
            Bienvenido al mundo del baloncesto
          </h1>
          <p className="lead mx-auto font-body text-center">
            Explora el emocionante universo del baloncesto, desde las últimas
            noticias hasta los mejores jugadores y equipos. ¡Únete a nosotros en
            esta apasionante aventura!
          </p>
          <div className="btn">
            <Link className="btn btn-light" to="../menu">
              Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

