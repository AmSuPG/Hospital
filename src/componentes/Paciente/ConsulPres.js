import React, { useState } from "react";
import axios from "axios";
import "./ConsulPres.css";
import { Link } from "react-router-dom";

function ConsulPres() {
  const [cedula, setCedula] = useState("");
  const [prescripciones, setPrescripciones] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/prescripciones/${cedula}`);
      setPrescripciones(response.data);
      setMensaje("");
    } catch (error) {
      setPrescripciones([]);
      setMensaje("❌ No se encontraron prescripciones para esa cédula");
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
            <Link to="/InicioPaci">
              <img className="back1" src="/img/back.png" alt="Volver" />
            </Link>
          </div>
        </div>
      </header>

      <div className="prescrip-container">
        <h2>Consultar Prescripciones</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Ingrese la cédula del paciente"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        {prescripciones.length > 0 && (
          <table className="prescrip-table">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Dosis</th>
                <th>Instrucciones</th>
              </tr>
            </thead>
            <tbody>
              {prescripciones.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre_medicamento}</td>
                  <td>{item.dosis}</td>
                  <td>{item.instrucciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ConsulPres;
