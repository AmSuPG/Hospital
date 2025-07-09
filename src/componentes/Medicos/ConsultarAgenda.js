import React from "react";
import { Link } from "react-router-dom";
import "./ConsultarAgenda.css"; // o tu archivo CSS de estilos

function ConsulAgenda() {
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
        <h2>Consulta tu agenda de atención</h2>
        <label htmlFor="cita">Id.Doctor</label>
        <input type="number" id="cita" placeholder="Ingrese número de registro de doctor" required />

       <button type="submit">Consultar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default ConsulAgenda;