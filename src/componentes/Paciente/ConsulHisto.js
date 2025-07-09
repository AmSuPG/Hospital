import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ConsulHisto.css";

function ConsulHisto() {
  const [idCita, setIdCita] = useState("");
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/historial/${idCita}`);
      setHistorial(response.data);
      setMensaje("");
    } catch (error) {
      setHistorial([]);
      setMensaje("❌ No se encontró historial para esa cita");
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
          <input
            type="text"
            placeholder="Ingrese el ID de la cita"
            value={idCita}
            onChange={(e) => setIdCita(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        {historial.length > 0 && (
          <table className="historial-table">
            <thead>
              <tr>
                <th>ID de Cita</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={index}>
                  <td>{item.id_cita}</td>
                  <td>{item.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ConsulHisto;
