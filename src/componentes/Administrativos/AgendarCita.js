import React from "react";
import { Link } from "react-router-dom";
import "./AgendarCita.css"; // o tu archivo CSS de estilos

function AgendarCita() {
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
                alt="Volver a inicio administrativo"
             />
            </Link>
         </div>
         </div>   
    </header>
    <main className="body">
    <div className="form-container">
      <form className="prescrip-form">
        <h2>Ingrese los datos para programar cita médica.</h2>
        <label htmlFor="cita">Id. Agenda</label>
        <input type="number" id="agenda" placeholder="Ingrese número de agenda" required />

        <label htmlFor="paciente">Id. Paciente</label>
        <input type="number" id="paciente" placeholder="Ingrese número de registro del paciente" required />

        <label htmlFor="admin">Cédula de Administrador</label>
        <input type="number" id="admin" placeholder="Ingrese el número de identificación del Administrador" required />

        <label htmlFor="consultorio">Consultorio</label>
        <input type="text" id="consultorio" placeholder="Ingrese número de consultorio" required />

        <label htmlFor="departamento">Departamento</label>
        <input type="text" id="dept" placeholder="Ingrese el departamento al que pertenece" required />

        <label htmlFor="edificio">Edificio</label>
        <input type="text" id="edif" placeholder="Ingrese nombre del edificio" required />

       <button type="submit">Guardar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default AgendarCita;