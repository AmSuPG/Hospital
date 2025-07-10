import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CrearAgenda.css";
import { validarAcceso } from "../../validarAcceso";

function CrearAgenda() {
  const [formData, setFormData] = useState({
    id_empleado: "",
    hora_inicio: "",
    hora_fin: "",
    fecha: ""
  });
  useEffect(() => {
        (async () => {
          await validarAcceso(["admin", "super-user"]);
        })();
      }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id_empleado: formData.id_empleado,
      hora_inicio: formData.hora_inicio,
      hora_fin: formData.hora_fin,
      fecha: formData.fecha
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/dep-cardiologia/crearAgenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message || "Error al registrar agenda"}`);
        return;
      }

      const data = await response.json();
      console.log("Agenda registrada:", data);
      alert("Agenda registrada correctamente");
    } catch (err) {
      console.error("Error de red:", err);
      alert("Ocurrió un error al enviar la solicitud");
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
              <img className="back1" src="/img/back.png" alt="Volver a inicio Administrativo" />
            </Link>
          </div>
        </div>
      </header>

      <main className="body">
        <div className="form-container">
          <form className="agenda-form" onSubmit={handleSubmit}>
            <h2>Registro de agendas</h2>

            <label htmlFor="id_empleado">Id. Empleado</label>
            <input
              type="text"
              id="id_empleado"
              placeholder="Ingrese número de registro de empleado"
              required
              value={formData.id_empleado}
              onChange={handleChange}
            />

            <label htmlFor="hora_inicio">Hora de inicio</label>
            <input
              type="time"
              id="hora_inicio"
              required
              value={formData.hora_inicio}
              onChange={handleChange}
            />

            <label htmlFor="hora_fin">Hora de fin</label>
            <input
              type="time"
              id="hora_fin"
              required
              value={formData.hora_fin}
              onChange={handleChange}
            />

            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              id="fecha"
              required
              value={formData.fecha}
              onChange={handleChange}
            />

            <button type="submit">Guardar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CrearAgenda;
