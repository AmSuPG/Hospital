import React from "react";
import { Link } from "react-router-dom";
import "./ActualHistor.css"; // o tu archivo CSS de estilos

function ActualHistor() {
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
            <Link to="/InicioMedi">
             <img className="back1"
                src="/img/back.png"
                alt="Volver a inicio Medico"
             />
            </Link>
         </div>
         </div>   
    </header>
    <main className="body">
    <div className="form-container">
      <form className="prescrip-form">
        <h2>Historial Médico</h2>
        <label htmlFor="cita">Id. Cita</label>
        <input type="number" id="cita" placeholder="Ingrese número de cita" required />

        <label htmlFor="descrip">Instrucciones</label>
        <input type="text" id="descrip" placeholder="Ingrese la descripción" required />

       <button type="submit">Actualizar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default ActualHistor;