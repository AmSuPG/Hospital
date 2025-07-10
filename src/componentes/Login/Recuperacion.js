import React from "react";
import { Link } from "react-router-dom";
import "./Recuperacion.css"; // o tu archivo CSS de estilos

function Recuperacion() {
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
    <main className="body">
    <div className="form-container">
      <form className="recup-form">
        <h2>Recuperación de contraseña</h2>
        <label htmlFor="cedula">Cédula</label>
        <input type="number" id="cedula" placeholder="Ingrese su cédula" required />

        <label htmlFor="expedicion">Fecha de expedición</label>
        <input type="date" id="expedicion" placeholder="Ingrese la fecha de expedición de su cédula" required />

        <label htmlFor="tel">Telefono</label>
        <input type="number" id="tel" placeholder="Ingrese telefono" required />

        <label htmlFor="nueva">Nueva Contraseña</label>
        <input type="text" id="nueva" placeholder="Ingrese nueva contraseña" required />

        <label htmlFor="nueva1">Confirme nueva contraseña</label>
        <input type="text" id="nueva1" placeholder="Confirme nueva contraseña" required />

       <button type="submit">Actualizar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default Recuperacion;