import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsultMedicos.css"; // Usa tu propio archivo de estilos

function ConsultMedico() {
  const [cedula, setCedula] = useState("");
  const [medicos, setMedicos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Asegúrate de que el token esté guardado así
      const response = await fetch( `https://hospitalproyect-production.up.railway.app/empleados/getMedicos/${cedula}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      const resultados = Array.isArray(data) ? data : [data]; // Asegura que siempre sea array
      setMedicos(resultados);
    } catch (error) {
      console.error("Error al consultar médicos:", error);
      setMedicos([]);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
          <Link to="/">
            <img className="home" src="/img/home.png" alt="Volver al inicio" />
          </Link>
          <div className="back">
            <Link to="/InicioFarma">
              <img className="back1" src="/img/back.png" alt="Volver a inicio" />
            </Link>
          </div>
        </div>
      </header>

      <main className="body-light">
        <div className="form-container">
          <form className="prescrip-form" onSubmit={handleSubmit}>
            <h2>Consultar Médico por Cédula</h2>
            <label htmlFor="cedula">Cédula del Médico</label>
            <input
              type="text"
              id="cedula"
              placeholder="Ingrese la cédula del médico"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>

          {/* Tabla justo debajo del botón */}
          <div className="tabla-container">
            <table className="medicamento-table">
              <thead>
                <tr>
                  <th>ID Empleado</th>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Departamento</th>
                </tr>
              </thead>
              <tbody>
                {medicos.length === 0 ? (
                  <tr>
                    <td colSpan="4">No hay resultados</td>
                  </tr>
                ) : (
                  medicos.map((m, index) => (
                    <tr key={index}>
                      <td>{m.id_empleado}</td>
                      <td>{m.nombre}</td>
                      <td>{m.cedula}</td>
                      <td>{m.departamento}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default ConsultMedico;
