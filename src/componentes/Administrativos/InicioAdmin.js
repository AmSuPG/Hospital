import React from "react";
import { Link } from "react-router-dom";
import "./InicioAdmin.css"; // o tu archivo CSS de estilos

function InicioAdmin() {
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
         </div>   
    </header>
    <div className="menu-container1">
      <h2>¡WELCOME AGAIN, ADMIN!</h2>
      <p className="parr">What would you like to do today?</p>
      <div className="button-group1">
        <div className="people">
            <img className="emple-img" src="/img/empleado.png" alt="People Icon" />
            <Link to="/paciente" className="menu-button">Register new pacient</Link>
            <Link to="/admin" className="menu-button">Register new admin</Link>
            <Link to="/medico" className="menu-button">Register new doctor</Link>
            <Link to="/farmaceutico" className="menu-button">Register new pharmacist</Link>
        </div>
        <div className="date">
            <img className="cita-img" src="/img/cita.png" alt="cita Icon" />
            <Link to="/AgendarCita" className="menu-button">Schedule appointments</Link>
            <Link to="/ConsultarAgendaMed" className="menu-button">Consult doctors' schedules</Link>
            <Link to="/CrearAgenda" className="menu-button">Create agendas for doctors</Link>
        </div>
        <div className="medicines">
            <img className="medica-img" src="/img/medica.png" alt="medicamneto Icon" />
            <Link to="/RegistrarMedi" className="menu-button">Register medications</Link>
            <Link to="/regFarmacias" className="menu-button">Register pharmacies</Link>
            <Link to="/consulFarma" className="menu-button">Consult pharmacies</Link>  
            <Link to="/consulMedi" className="menu-button">Consult medications</Link>
        </div>
      </div>
      </div>
    </>
  );
}

export default InicioAdmin;
