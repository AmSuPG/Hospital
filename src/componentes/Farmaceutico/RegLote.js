import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegLote.css";

function RegLote() {
  const [formData, setFormData] = useState({
    id_farmacia: "",
    id_medicamento: "",
    lote: "",
    stock: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const cedula = localStorage.getItem("cedula");

    if (!token || !cedula) {
      setMensaje("❌ Faltan credenciales (token o cédula)");
      return;
    }

    const body = {
      ...formData,
      id_farmacia: parseInt(formData.id_farmacia),
      stock: parseInt(formData.stock),
      lote: formData.lote.toString(),
      cedula: cedula,
    };

    try {
      const res = await fetch("https://hospitalproyect-production.up.railway.app/farmacias/regLoteStock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Lote registrado correctamente");
        setFormData({ id_farmacia: "", id_medicamento: "", lote: "", stock: "" });
      } else {
        setMensaje(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("❌ Error inesperado al registrar el lote");
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
              <img className="back1" src="/img/back.png" alt="Volver a inicio Farmacéutico" />
            </Link>
          </div>
        </div>
      </header>

      <main className="body">
        <div className="form-container">
          <form className="lote-form" onSubmit={handleSubmit}>
            <h2>Registrar lote y Stock</h2>

            <label htmlFor="id_farmacia">Id Farmacia</label>
            <input
              type="text"
              id="id_farmacia"
              placeholder="Ingrese número de registro"
              value={formData.id_farmacia}
              onChange={handleChange}
              required
            />

            <label htmlFor="id_medicamento">Id Medicamento</label>
            <input
              type="text"
              id="id_medicamento"
              placeholder="Ingrese id del medicamento"
              value={formData.id_medicamento}
              onChange={handleChange}
              required
            />

            <label htmlFor="lote">Lote</label>
            <input
              type="text"
              id="lote"
              placeholder="Ingrese el lote"
              value={formData.lote}
              onChange={handleChange}
              required
            />

            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              placeholder="Ingrese la cantidad de stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <button type="submit">Guardar</button>
            {mensaje && <p className="mensaje">{mensaje}</p>}
          </form>
        </div>
      </main>
    </>
  );
}

export default RegLote;
