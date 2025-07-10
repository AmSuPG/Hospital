import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Recuperacion.css";

function Recuperacion() {
  const [formData, setFormData] = useState({
    cedula: "",
    fecha_expedicion: "",
    telefono: "",
    nueva: "",
    nueva1: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nueva !== formData.nueva1) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      fecha_expedicion: formData.fecha_expedicion,
      cedula: formData.cedula,
      telefono: formData.telefono,
      newPassword: formData.nueva
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/auth/cambioOlvidoPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "No se pudo cambiar la contraseña"}`);
        return;
      }
      const result = await response.json();
      console.log(result)
      console.log("Respuesta:", result);
      alert("Contraseña actualizada correctamente");
    } catch (error) {
      console.error("Error al hacer la petición:", error);
      alert("Error de conexión con el servidor");
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
        </div>
      </header>

      <main className="body">
        <div className="form-container">
          <form className="recup-form" onSubmit={handleSubmit}>
            <h2>Recuperación de contraseña</h2>

            <label htmlFor="cedula">Cédula</label>
            <input type="text" id="cedula" placeholder="Ingrese su cédula" required value={formData.cedula} onChange={handleChange} />

            <label htmlFor="fecha_expedicion">Fecha de expedición</label>
            <input type="date" id="fecha_expedicion" placeholder="Ingrese la fecha de expedición de su cédula" required value={formData.fecha_expedicion} onChange={handleChange} />

            <label htmlFor="telefono">Telefono</label>
            <input type="number" id="telefono" placeholder="Ingrese telefono" required value={formData.telefono} onChange={handleChange} />

            <label htmlFor="nueva">Nueva Contraseña</label>
            <input type="text" id="nueva" placeholder="Ingrese nueva contraseña" required value={formData.nueva} onChange={handleChange} />

            <label htmlFor="nueva1">Confirme nueva contraseña</label>
            <input type="text" id="nueva1" placeholder="Confirme nueva contraseña" required value={formData.nueva1} onChange={handleChange} />

            <button type="submit">Actualizar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Recuperacion;
