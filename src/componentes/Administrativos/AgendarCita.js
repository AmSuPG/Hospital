import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AgendarCita.css";

function AgendarCita() {
  const cedula_admin = localStorage.getItem('cedula');
  const [formData, setFormData] = useState({
    departamento: "",
    edificio: "",
    cod_consultorio: "",
    id_agenda: "",
    id_paciente: "",
    cedula_admin
  });

  const [infoCita, setInfoCita] = useState(null); // Guardará los datos de la cita

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      departamento: formData.departamento,
      edificio: formData.edificio,
      cod_consultorio: formData.cod_consultorio,
      id_agenda: parseInt(formData.id_agenda),
      id_paciente: formData.id_paciente,
      cedula_admin: cedula_admin
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/dep-cardiologia/crearCita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Error: ${err.message || "No se pudo crear la cita"}`);
        return;
      }

      const data = await response.json();
      console.log("Cita creada:", data);
      setInfoCita(data.cita); // ✅ accedes directamente al objeto cita 
      alert("Cita médica registrada correctamente");
    } catch (error) {
      console.error("Error al crear la cita:", error);
      alert("Error de red o servidor");
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
            <Link to="/InicioAdmin">
              <img className="back1" src="/img/back.png" alt="Volver a inicio administrativo" />
            </Link>
          </div>
        </div>
      </header>

      <main className="body">
        <div className="form-container">
          <form className="prescrip-form" onSubmit={handleSubmit}>
            <h2>Ingrese los datos para programar cita médica.</h2>

            <label htmlFor="id_agenda">Id. Agenda</label>
            <input
              type="text"
              id="id_agenda"
              placeholder="Ingrese número de agenda"
              required
              value={formData.id_agenda}
              onChange={handleChange}
            />

            <label htmlFor="id_paciente">Id. Paciente</label>
            <input
              type="text"
              id="id_paciente"
              placeholder="Ingrese número de registro del paciente"
              required
              value={formData.id_paciente}
              onChange={handleChange}
            />

            <label htmlFor="cod_consultorio">Consultorio</label>
            <input
              type="text"
              id="cod_consultorio"
              placeholder="Ingrese número de consultorio"
              required
              value={formData.cod_consultorio}
              onChange={handleChange}
            />

            <label htmlFor="departamento">Departamento</label>
            <input
              type="text"
              id="departamento"
              placeholder="Ingrese el departamento al que pertenece"
              required
              value={formData.departamento}
              onChange={handleChange}
            />

            <label htmlFor="edificio">Edificio</label>
            <input
              type="text"
              id="edificio"
              placeholder="Ingrese nombre del edificio"
              required
              value={formData.edificio}
              onChange={handleChange}
            />

            <button type="submit">Guardar</button>
          </form>

          {/* Cuadro resumen de la cita */}
          {infoCita && (
            <div className="resumen-cita">
              <h3>Resumen de la Cita Médica</h3>
              <p><strong>ID Cita:</strong> {infoCita.id_cita}</p>
              <p><strong>Paciente:</strong> {infoCita.id_paciente}</p>
              <p><strong>Médico:</strong> {infoCita.nom_med}</p>
              <p><strong>Fecha:</strong> {infoCita.fecha}</p>
              <p><strong>Hora:</strong> {infoCita.hora_inicio} - {infoCita.hora_fin}</p>
              <p><strong>Consultorio:</strong> {infoCita.cod_consultorio}</p>
              <p><strong>Departamento:</strong> {infoCita.departamento}</p>
              <p><strong>Edificio:</strong> {infoCita.edificio}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default AgendarCita;
