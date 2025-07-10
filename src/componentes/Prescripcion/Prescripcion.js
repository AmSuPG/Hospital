import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Prescripcion.css";

function Prescripc() {
  const [formData, setFormData] = useState({
    cita: "",
    instrucciones: "",
    medicamento: "",
    dosis: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id_cita: formData.cita,
      instrucciones: formData.instrucciones,
      id_medicamento: formData.medicamento,
      dosis: formData.dosis,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/dep-cardiologia/crearPrescripcion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al registrar la prescripción");
      }

      const data = await response.json();
      console.log("Prescripción creada:", data);
      alert("✅ Prescripción registrada correctamente");

      // Reset form
      setFormData({ cita: "", instrucciones: "", medicamento: "", dosis: "" });
    } catch (err) {
      console.error(err);
      alert(`❌ Error: ${err.message}`);
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
            <h2>Prescripción</h2>

            <label htmlFor="cita">Id. Cita</label>
            <input
              type="text"
              id="cita"
              placeholder="Ingrese número de cita"
              required
              value={formData.cita}
              onChange={handleChange}
            />

            <label htmlFor="instrucciones">Instrucciones</label>
            <input
              type="text"
              id="instrucciones"
              placeholder="Ingrese la instrucción"
              required
              value={formData.instrucciones}
              onChange={handleChange}
            />

            <label htmlFor="medicamento">Id. Medicamento</label>
            <input
              type="text"
              id="medicamento"
              placeholder="Ingrese el medicamento recetado"
              required
              value={formData.medicamento}
              onChange={handleChange}
            />

            <label htmlFor="dosis">Dosis</label>
            <input
              type="text"
              id="dosis"
              placeholder="Ingrese dosis recomendada"
              required
              value={formData.dosis}
              onChange={handleChange}
            />

            <button type="submit">Guardar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Prescripc;
