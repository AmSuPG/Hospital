import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ConsulMedi.css";

function ConsulMedi() {
  const [busqueda, setBusqueda] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/medicamentos?query=${busqueda}`);
      setMedicamentos(response.data);
    } catch (error) {
      console.error("Error al buscar medicamentos:", error);
      setMedicamentos([]);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
          <Link to="/">
            <img src="/img/home.png" alt="Inicio" />
          </Link>
          <div className="back">
            <Link to="/InicioAdmin">
              <img className="back1" src="/img/back.png" alt="Volver a admin" />
            </Link>
          </div>
        </div>
      </header>

      <div className="medicamento-container">
        <h2>Consultar Medicamentos</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por ID o nombre del medicamento"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        <table className="medicamento-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Concentración</th>
              <th>Presentación</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.length === 0 ? (
              <tr>
                <td colSpan="4">No hay resultados</td>
              </tr>
            ) : (
              medicamentos.map((m, index) => (
                <tr key={index}>
                  <td>{m.nombre}</td>
                  <td>{m.concentracion}</td>
                  <td>{m.presentacion}</td>
                  <td>{m.precio}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsulMedi;
