import React from "react";
import { Link } from "react-router-dom";
import "./InicioMedi.css"; // o tu archivo CSS de estilos

function InicioMed() {
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
      <h2>¡WELCOME AGAIN,DOCTOR!</h2>
      <p className="par">We are pleased to know that you are part of us</p>
      <div className="button-group">
            <img className="doc-img" src="/img/doc.png" alt="Doc Icon" />
            <Link to="/ConsultarAgenda" className="menu-button">Check agenda</Link>
            <Link to="/Prescripcion" className="menu-button">Rgenerate prescription</Link>
            <Link to="/ActualHistor" className="menu-button">Update medical history</Link>
        </div>
      </div>
    </>
  );
}

export default InicioMed;
