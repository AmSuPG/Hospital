import React from "react";
import { Link } from "react-router-dom";
import "./InicioFarma.css"; // o tu archivo CSS de estilos

function InicioFarma() {
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
      <h2>¡WELCOME AGAIN!</h2>
      <p className="parra">What would you like to do today?</p>
      <div className="button-group">
            <img className="farma-img" src="/img/farma.png" alt="Farma Icon" />
            <Link to="/consulMedicamento" className="menu-button">Consult medications</Link>
            <Link to="/RegLote" className="menu-button">Register batch and stock</Link>
        </div>
      </div>
    </>
  );
}

export default InicioFarma;