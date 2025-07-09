import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ConsulCita.css";

function ConsulCita() {
  const [idPaciente, setIdPaciente] = useState("");
  const [citas, setCitas] = useState([]);

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/citas/${idPaciente}`);
      setCitas(response.data);
    } catch (error) {
      console.error("Error al buscar citas:", error);
      setCitas([]);
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
              <img className="back1" src="/img/back.png" alt="Volver a Paciente" />
            </Link>
          </div>
        </div>
      </header>

      <div className="citas-container">
        <h2>Citas programadas</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Ingrese Cédula del paciente"
            value={idPaciente}
            onChange={(e) => setIdPaciente(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        <table className="citas-table">
          <thead>
            <tr>
              <th>ID Paciente</th>
              <th>Edificio</th>
              <th>Departamento</th>
              <th>Consultorio</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan="4">No hay resultados</td>
              </tr>
            ) : (
              citas.map((cita, index) => (
                <tr key={index}>
                  <td>{cita.id_paciente}</td>
                  <td>{cita.edificio}</td>
                  <td>{cita.departamento}</td>
                  <td>{cita.consultorio}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsulCita;
