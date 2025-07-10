import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ConsultarAgendaMed.css";
import { validarAcceso } from "../../validarAcceso";

function AgendaMedicos() {
  const [idDoctor, setIdDoctor] = useState("");
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    (async () => {
      await validarAcceso(["admin", "super-user", "medico"]);
    })();
  }, []);

  const handleBuscar = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://hospitalproyect-production.up.railway.app/dep-cardiologia/getAgendas/${idDoctor}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al buscar agendas");
      }

      const data = await response.json();
      const agendasArray = Array.isArray(data) ? data : data.agendas || [];
      setAgendas(agendasArray);
    } catch (error) {
      console.error("Error al buscar agendas:", error);
      setAgendas([]);
    }
  };

  return (
    <>
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
              <th>ID Agenda</th>
              <th>ID Médico</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            {agendas.length === 0 ? (
              <tr>
                <td colSpan="6">No hay resultados</td>
              </tr>
            ) : (
              agendas.map((agenda, index) => (
                <tr key={index}>
                  <td>{agenda.agendas_id_agenda}</td>
                  <td>{agenda.agendas_id_empleado}</td>
                  <td>{agenda.agendas_estado}</td>
                  <td>{new Date(agenda.agendas_fecha).toLocaleDateString()}</td>
                  <td>{agenda.agendas_hora_inicio}</td>
                  <td>{agenda.agendas_hora_fin}</td>
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
