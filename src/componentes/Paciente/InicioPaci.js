import React from "react";
import { Link } from "react-router-dom";
import "./InicioPaci.css"; // o tu archivo CSS de estilos

function InicioPaci() {
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
    <div className="menu-container">
      <h2>¡WELCOME!</h2>
      <p>At Health True, your well-being is our priority. We deeply appreciate you choosing us as your health center. Every day, we work with dedication, ethics, and commitment to provide you with the care you deserve.</p>
      <div className="button-group">
            <img className="paci-img" src="/img/paci.png" alt="Paciente Icon" />
            <Link to="/Compra" className="menu-button">Buy medicines</Link>
            <Link to="/ConsulPres" className="menu-button">Consult prescription</Link>
            <Link to="/ConsulCita" className="menu-button">Check appointments</Link>
            <Link to="/ConsulHisto" className="menu-button">Consult medical history</Link>
        </div>
      </div>
    </>
  );
}

export default InicioPaci;
