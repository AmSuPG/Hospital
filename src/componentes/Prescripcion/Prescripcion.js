import React from "react";
import { Link } from "react-router-dom";
import "./Prescripcion.css"; // o tu archivo CSS de estilos

function Prescripc() {
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
        <h2>Prescripción</h2>
        <label htmlFor="cita">Id. Cita</label>
        <input type="number" id="cita" placeholder="Ingrese número de cita" required />

        <label htmlFor="instrucciones">Instrucciones</label>
        <input type="text" id="instru" placeholder="Ingrese la instrucción" required />

        <label htmlFor="medica">Id.medicamento</label>
        <input type="number" id="medicamen" placeholder="Ingrese el medicamento recetado" required />

        <label htmlFor="dosis">Dosis</label>
        <input type="text" id="dosis" placeholder="Ingrese dosis recomendada" required />

       <button type="submit">Guardar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default Prescripc;