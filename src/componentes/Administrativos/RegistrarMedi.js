import React from "react";
import { Link } from "react-router-dom";
import "./RegistrarMedi.css"; // o tu archivo CSS de estilos

function RegistrarMedi() {
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
      <form className="medi-form">
        <h2>Registra un medicamento</h2>
        <label htmlFor="nombreMed">Nombre</label>
        <input type="text" id="nombreMed" placeholder="Ingrese nombre" required />

        <label htmlFor="presen">Presentacion</label>
        <input type="text" id="presen" placeholder="Ingrese la forma de presentación" required />

        <label htmlFor="concent">Concentración</label>
        <input type="text" id="concent" placeholder="Ingrese la cantidad de concentración" required />

        <label htmlFor="precio">Precio</label>
        <input type="number" id="precio" placeholder="Ingrese el precio" required />

       <button type="submit">Guardar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default RegistrarMedi;