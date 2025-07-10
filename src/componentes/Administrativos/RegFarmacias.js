import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RegFarmacias.css";
import { validarAcceso } from "../../validarAcceso";

function RegFarmacias() {
  const [formData, setFormData] = useState({
    nombre: "",
    calle: "",
    carrera: "",
    telefono: ""
  });

  useEffect(() => {
      (async () => {
        await validarAcceso(["admin", "super-user"]);
      })();
    }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const keyMap = {
      nombrefarma: "nombre",
      farmacalle: "calle",
      farmacarrera: "carrera",
      telfarma: "telefono"
    };
    setFormData({ ...formData, [keyMap[id]]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: formData.nombre,
      calle: formData.calle,
      carrera: formData.carrera,
      telefono: formData.telefono
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/farmacias/regFarmacia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message || "No se pudo registrar la farmacia"}`);
        return;
      }

      const result = await response.json();
      console.log("Farmacia registrada:", result);
      alert("Farmacia registrada correctamente");

      // Limpiar formulario
      setFormData({
        nombre: "",
        calle: "",
        carrera: "",
        telefono: ""
      });
    } catch (err) {
      console.error("Error de red:", err);
      alert("Error de red al registrar la farmacia");
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
          <form className="farma-form" onSubmit={handleSubmit}>
            <h2>Registra una farmacia</h2>

            <label htmlFor="nombrefarma">Nombre</label>
            <input
              type="text"
              id="nombrefarma"
              placeholder="Ingrese nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
            />

            <label htmlFor="farmacalle">Calle</label>
            <input
              type="text"
              id="farmacalle"
              placeholder="Ingrese calle donde se ubica"
              required
              value={formData.calle}
              onChange={handleChange}
            />

            <label htmlFor="farmacarrera">Carrera</label>
            <input
              type="text"
              id="farmacarrera"
              placeholder="Ingrese la carrera donde se ubica"
              required
              value={formData.carrera}
              onChange={handleChange}
            />

            <label htmlFor="telfarma">Teléfono</label>
            <input
              type="text"
              id="telfarma"
              placeholder="Ingrese el teléfono"
              required
              value={formData.telefono}
              onChange={handleChange}
            />

            <button type="submit">Guardar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default RegFarmacias;
