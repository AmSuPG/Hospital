import React, { useState } from "react";
import axios from "axios";
import "./ConsultarAgendaMed.css";
import { Link } from "react-router-dom";

function AgendaMedicos() {
  const [idDoctor, setIdDoctor] = useState("");
  const [agendas, setAgendas] = useState([]);

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/agendas/${idDoctor}`);
      setAgendas(response.data);
    } catch (error) {
      console.error("Error al buscar agendas:", error);
      setAgendas([]);
    }
  };

  return (
    <>
      {/* ENCABEZADO FUERA DEL CONTENEDOR CENTRAL */}
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

      {/* CONTENEDOR CENTRAL SEPARADO */}
      <div className="agenda-container">
        <h2>Agenda de Médicos</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por ID del médico"
            value={idDoctor}
            onChange={(e) => setIdDoctor(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        <table className="agenda-table">
          <thead>
            <tr>
              <th>ID Médico</th>
              <th>Nombre Médico</th>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            {agendas.length === 0 ? (
              <tr>
                <td colSpan="5">No hay resultados</td>
              </tr>
            ) : (
              agendas.map((agenda, index) => (
                <tr key={index}>
                  <td>{agenda.id_medico}</td>
                  <td>{agenda.nombre_medico}</td>
                  <td>{agenda.fecha}</td>
                  <td>{agenda.hora_inicio}</td>
                  <td>{agenda.hora_fin}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AgendaMedicos;
