import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsulMediMedi.css";

function ConsulMediMedi() {
  const [busqueda, setBusqueda] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);

  const handleBuscar = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `https://hospitalproyect-production.up.railway.app/farmacias/medicamento/${busqueda}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const medicamentosArray = Array.isArray(data) ? data : data.medicamentos || [];

      setMedicamentos(medicamentosArray);
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
            <Link to="/InicioMedi">
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
              <th>ID</th>
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
                  <th>{m.id_medicamento}</th>
                  <td>{m.nombre_med}</td>
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

export default ConsulMediMedi;
