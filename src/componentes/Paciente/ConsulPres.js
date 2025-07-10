import React, { useState } from "react";
import "./ConsulPres.css";
import { Link } from "react-router-dom";

function ConsulPres() {
  const [prescripciones, setPrescripciones] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleBuscar = async () => {
    const cedula = localStorage.getItem("cedula");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://hospitalproyect-production.up.railway.app/dep-cardiologia/getPrescripciones/${cedula}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      if(data.length === 0){
        setPrescripciones([]);
        setMensaje("❌ No se encontraron prescripciones para esa cédula");
      }else{
        setPrescripciones(data);
        setMensaje("");
      }
    } catch (error) {
      console.error("Error al buscar prescripciones:", error);
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
                    <td>
                      {item.medicamentos && item.medicamentos.length > 0
                        ? item.medicamentos[0].id_medicamento
                        : "No asociado"}
                    </td>
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