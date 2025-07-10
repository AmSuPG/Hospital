import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ActualHistor.css";

function ActualHistor() {
  const [formData, setFormData] = useState({
    cita: "",
    descrip: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id_cita: formData.cita,
      descripcion: formData.descrip
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/dep-cardiologia/updHistorial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Error: ${data.message || "No se pudo actualizar el historial"}`);
        return;
      }

      alert("✅ Historial actualizado correctamente");
      console.log("Respuesta:", data);
    } catch (error) {
      console.error("Error al actualizar historial:", error);
      alert("❌ Error de red o servidor");
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
            <Link to="/InicioMedi">
              <img className="back1" src="/img/back.png" alt="Volver a inicio Médico" />
            </Link>
          </div>
        </div>
      </header>

      <main className="body">
        <div className="form-container">
          <form className="prescrip-form" onSubmit={handleSubmit}>
            <h2>Actualizar Historial Médico</h2>

            <label htmlFor="cita">ID de Cita</label>
            <input
              type="text"
              id="cita"
              placeholder="Ingrese número de cita"
              required
              value={formData.cita}
              onChange={handleChange}
            />

            <label htmlFor="descrip">Descripción</label>
            <input
              type="text"
              id="descrip"
              placeholder="Ingrese la descripción"
              required
              value={formData.descrip}
              onChange={handleChange}
            />

            <button type="submit">Actualizar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default ActualHistor;
