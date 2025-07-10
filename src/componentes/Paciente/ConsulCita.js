import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsulCita.css";

function ConsulCita() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    const cedula = localStorage.getItem("cedula");
    const token = localStorage.getItem("token");

    if (!cedula || !token) {
      setMensaje("⚠️ No se encontró la cédula o el token.");
      return;
    }

    try {
      const response = await fetch(`https://hospitalproyect-production.up.railway.app/pacientes/getCitas/${cedula}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener citas");
      }

      const data = await response.json();
      setCitas(data);
      setMensaje("");
    } catch (error) {
      console.error(error);
      setCitas([]);
      setMensaje("❌ No se encontraron citas para este paciente.");
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
          <Link to="/InicioPaci">
            <img className="back1" src="/img/back.png" alt="Volver" />
          </Link>
        </div>
      </header>

      <div className="agenda-container">
        <h2>Mis Citas Médicas</h2>

        <div className="search-bar">
          <button onClick={handleBuscar}>Consultar Citas</button>
        </div>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        <table className="agenda-table">
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Departamento</th>
              <th>Edificio</th>
              <th>Consultorio</th>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Médico</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan="8">No hay citas registradas</td>
              </tr>
            ) : (
              citas.map((cita, index) => (
                <tr key={index}>
                  <td>{cita.citas_id_cita}</td>
                  <td>{cita.citas_departamento}</td>
                  <td>{cita.citas_edificio}</td>
                  <td>{cita.citas_cod_consultorio}</td>
                  <td>{new Date(cita.citas_fecha).toLocaleDateString()}</td>
                  <td>{cita.citas_hora_inicio}</td>
                  <td>{cita.citas_hora_fin}</td>
                  <td>{cita.citas_nom_med}</td>
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
