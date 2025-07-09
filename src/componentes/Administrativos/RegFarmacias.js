import React from "react";
import { Link } from "react-router-dom";
import "./RegFarmacias.css"; // o tu archivo CSS de estilos

function RegFarmacias() {
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
      <form className="farma-form">
        <h2>Registra una farmacia</h2>
        <label htmlFor="nombrefarma">Nombre</label>
        <input type="text" id="nombrefarma" placeholder="Ingrese nombre" required />

        <label htmlFor="farmacalle">Calle</label>
        <input type="text" id="farmacalle" placeholder="Ingrese calle donde se ubica" required />

        <label htmlFor="farmacarrera">Carrera</label>
        <input type="text" id="farmacarrera" placeholder="Ingrese la carrera donde se ubica" required />

        <label htmlFor="telfarma">Telefono</label>
        <input type="number" id="telfarma" placeholder="Ingrese el telefono" required />

       <button type="submit">Guardar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default RegFarmacias;