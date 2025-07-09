import React, { useState } from "react";
import axios from "axios";
import "./ConsulFarma.css";
import { Link } from "react-router-dom";

function ConsulFarmacias() {
  const [nombreFarmacia, setNombreFarmacia] = useState("");
  const [farmacias, setFarmacias] = useState([]);

  const handleBuscar = async () => {
    try {
      // Cambia esta URL por tu endpoint real del backend
      const response = await axios.get(`http://localhost:3000/api/farmacias?nombre=${nombreFarmacia}`);
      setFarmacias(response.data);
    } catch (error) {
      console.error("Error al buscar farmacias:", error);
      setFarmacias([]);
    }
  };

  return (
    <>
      {/* Header separado */}
      <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
          <Link to="/">
            <img src="/img/home.png" alt="Volver al inicio" />
          </Link>
          <div className="back">
            <Link to="/InicioAdmin">
              <img className="back1" src="/img/back.png" alt="Volver a admin" />
            </Link>
          </div>
        </div>
      </header>

      {/* Contenedor principal */}
      <div className="farmacia-container">
        <h2>Consultar Farmacias</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre de la farmacia"
            value={nombreFarmacia}
            onChange={(e) => setNombreFarmacia(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        <table className="farmacia-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Calle</th>
              <th>Carrera</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {farmacias.length === 0 ? (
              <tr>
                <td colSpan="4">No hay resultados</td>
              </tr>
            ) : (
              farmacias.map((f, index) => (
                <tr key={index}>
                  <td>{f.nombre}</td>
                  <td>{f.calle}</td>
                  <td>{f.carrera}</td>
                  <td>{f.telefono}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsulFarmacias;
