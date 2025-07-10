import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsulHisto.css";

function ConsulHisto() {
  const [historial, setHistorial] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    const cedula = localStorage.getItem("cedula");
    const token = localStorage.getItem("token");

    if (!cedula || !token) {
      setMensaje("⚠️ No se encontró la cédula o el token.");
      return;
    }

    try {
      const response = await fetch(`https://hospitalproyect-production.up.railway.app/pacientes/histClinic/${cedula}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener historial");
      }

      const data = await response.json();
      setHistorial(data);
      setMensaje("");
    } catch (error) {
      console.error("Error al consultar historial:", error);
      setHistorial(null);
      setMensaje("❌ No se encontró historial clínico para esta cédula.");
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

      <div className="historial-container">
        <h2>Consultar Historial Clínico</h2>

        <div className="search-bar">
          <button onClick={handleBuscar}>Consultar Mi Historial</button>
        </div>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        {historial && (
          <div className="historial-info">
            <h3>Información del Historial</h3>
            <table className="historial-table">
              <thead>
                <tr>
                  <th>ID Historial</th>
                  <th>Fecha Inicio</th>
                  <th>Cédula Paciente</th>
                  <th>Fecha Nacimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{historial.id_historial}</td>
                  <td>{historial.fecha_inicio}</td>
                  <td>{historial.paciente.cedula}</td>
                  <td>{historial.paciente.fecha_nac}</td>
                </tr>
              </tbody>
            </table>

            {historial.registro?.length > 0 && (
              <>
                <h3>Registros del Historial</h3>
                <table className="historial-table">
                  <thead>
                    <tr>
                      <th>ID Registro</th>
                      <th>Fecha</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.registro.map((r, i) => (
                      <tr key={i}>
                        <td>{r.id_registro}</td>
                        <td>{r.fecha}</td>
                        <td>{r.descripcion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ConsulHisto;
