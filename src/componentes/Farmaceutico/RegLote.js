import React from "react";
import { Link } from "react-router-dom";
import "./RegLote.css"; // o tu archivo CSS de estilos

function RegLote() {
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
            <Link to="/InicioFarma">
             <img className="back1"
                src="/img/back.png"
                alt="Volver a inicio Farmaceutico"
             />
            </Link>
         </div>
         </div>   
    </header>
    <main className="body">
    <div className="form-container">
      <form className="lote-form">
        <h2>Registrar lote y Stock</h2>
        <label htmlFor="Idfarma">Id Farmacia</label>
        <input type="number" id="Idfarma" placeholder="Ingrese número de registro" required />

        <label htmlFor="Idmedi">Id Medicamento</label>
        <input type="number" id="Idmedi" placeholder="Ingrese id del medicamento" required />

        <label htmlFor="lote">Lote</label>
        <input type="number" id="lote" placeholder="Ingrese el lote" required />

        <label htmlFor="stock">Stock</label>
        <input type="number" id="stock" placeholder="Ingrese la cantidad de stock" required />

       <button type="submit">Guardar</button>

      </form>
    </div>
    </main>
   </>
  );
}

export default RegLote;