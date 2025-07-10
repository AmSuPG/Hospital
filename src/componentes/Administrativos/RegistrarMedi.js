import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RegistrarMedi.css";
import { validarAcceso } from "../../validarAcceso";

function RegistrarMedi() {
  const [formData, setFormData] = useState({
    nombre_med: "",
    presentacion: "",
    concentracion: "",
    precio: ""
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
      nombre_med: formData.nombre_med,
      presentacion: formData.presentacion,
      concentracion: formData.concentracion,
      precio: parseFloat(formData.precio)
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/farmacias/regMedicamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Error: ${err.message || "No se pudo registrar el medicamento"}`);
        return;
      }

      const result = await response.json();
      console.log("Medicamento registrado:", result);
      alert("Medicamento registrado correctamente");
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red al registrar el medicamento");
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
          <form className="medi-form" onSubmit={handleSubmit}>
            <h2>Registra un medicamento</h2>

            <label htmlFor="nombre_med">Nombre</label>
            <input
              type="text"
              id="nombre_med"
              placeholder="Ingrese nombre"
              required
              value={formData.nombre_med}
              onChange={handleChange}
            />

            <label htmlFor="presentacion">Presentación</label>
            <input
              type="text"
              id="presentacion"
              placeholder="Ingrese la forma de presentación"
              required
              value={formData.presentacion}
              onChange={handleChange}
            />

            <label htmlFor="concentracion">Concentración</label>
            <input
              type="text"
              id="concentracion"
              placeholder="Ingrese la cantidad de concentración"
              required
              value={formData.concentracion}
              onChange={handleChange}
            />

            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              placeholder="Ingrese el precio"
              required
              value={formData.precio}
              onChange={handleChange}
            />

            <button type="submit">Guardar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default RegistrarMedi;
