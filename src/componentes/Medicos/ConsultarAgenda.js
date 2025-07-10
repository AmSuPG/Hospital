import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsultarAgenda.css";

function ConsulAgenda() {
  const [cedulaInput, setCedulaInput] = useState("");
  const [agendas, setAgendas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    const cedulaStorage = localStorage.getItem("cedula");
    const token = localStorage.getItem("token");

    if (!cedulaStorage || !token) {
      setMensaje("❌ No se encontró información de sesión.");
      return;
    }

    if (cedulaInput !== cedulaStorage) {
      setMensaje("⚠️ La cédula ingresada no coincide con la sesión activa.");
      return;
    }

    try {
      const response = await fetch(`https://hospitalproyect-production.up.railway.app/dep-cardiologia/getAgendas/${cedulaInput}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener la agenda.");
      }

      const data = await response.json();
      setAgendas(Array.isArray(data) ? data : []);
      setMensaje("");
    } catch (error) {
      console.error("Error al obtener la agenda:", error);
      setAgendas([]);
      setMensaje("❌ Ocurrió un error al obtener la agenda.");
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
            <Link to="/InicioMedi">
              <img className="back1" src="/img/back.png" alt="Volver a inicio médico" />
            </Link>
          </div>
        </div>
      </header>

      <div className="agenda-container">
        <h2>Consulta tu Agenda de Atención</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Confirma tu cédula"
            value={cedulaInput}
            onChange={(e) => setCedulaInput(e.target.value)}
          />
          <button onClick={handleBuscar}>Consultar</button>
        </div>

        {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}

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

export default ConsulAgenda;
