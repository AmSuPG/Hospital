import React from "react";
import { Link } from "react-router-dom";
import "./CrearAgenda.css"; // o tu archivo CSS de estilos

function CrearAgenda() {
  return (
    <>
    <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
            <Link to="/">
             <img className="home"
                src="/img/home.png"
                alt="Volver al inicio"
             />
            </Link>  
             <div className="back">
            <Link to="/InicioAdmin">
             <img className="back1"
                src="/img/back.png"
                alt="Volver a inicio Administrativo"
             />
            </Link>
         </div>
         </div>   
    </header>
    <main className="body">
    <div className="form-container">
      <form className="agenda-form">
        <h2>Registro de agendas</h2>
        <label htmlFor="idE">Id. Empleado</label>
        <input type="number" id="idE" placeholder="Ingrese número de registro de empleado" required />

        <label htmlFor="horaIni">Hora de inicio</label>
        <input type="time" id="horaini" placeholder="Ingrese la hora de inicio" required />

        <label htmlFor="horafin">Hora de fin</label>
        <input type="time" id="medicamen" placeholder="Ingrese la hora de finalización" required />

        <label htmlFor="fecha">Fecha</label>
        <input type="date" id="fecha" placeholder="Ingrese fecha" required />

        <button type="submit">Guardar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default CrearAgenda;