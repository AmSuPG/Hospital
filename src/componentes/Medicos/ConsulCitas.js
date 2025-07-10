import React, { useState } from "react";
import "./ConsulCitas.css";
import { Link } from "react-router-dom";

function ConsulCitas() {
  const [idPaciente, setIdPaciente] = useState("");
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("❌ Token no encontrado.");
      return;
    }

    try {
      const response = await fetch(`https://hospitalproyect-production.up.railway.app/dep-cardiologia/getCitasMed/${idPaciente}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error en la consulta");

      const data = await response.json();
      setCitas(Array.isArray(data) ? data : []);
      setMensaje("");
    } catch (error) {
      console.error(error);
      setCitas([]);
      setMensaje("❌ Error al consultar citas.");
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

      <div className="agenda-container">
        <h2>Consultar Citas Médicas</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Ingrese su ID de medico"
            value={idPaciente}
            onChange={(e) => setIdPaciente(e.target.value)}
          />
          <button onClick={handleBuscar}>Consultar</button>
        </div>

        {mensaje && <p style={{ textAlign: "center", color: "red" }}>{mensaje}</p>}

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
                <td colSpan="8">No hay citas</td>
              </tr>
            ) : (
              citas.map((cita, index) => (
                <tr key={index}>
                  <td>{cita.id_cita}</td>
                  <td>{cita.departamento}</td>
                  <td>{cita.edificio}</td>
                  <td>{cita.cod_consultorio}</td>
                  <td>{new Date(cita.fecha).toLocaleDateString()}</td>
                  <td>{cita.hora_inicio}</td>
                  <td>{cita.hora_fin}</td>
                  <td>{cita.nom_med}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsulCitas;
