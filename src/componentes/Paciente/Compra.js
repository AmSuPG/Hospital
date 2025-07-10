import React, { useState } from "react";
import "./Compra.css";
import { Link } from "react-router-dom";

function Compra() {
  const [idMedicamento, setIdMedicamento] = useState("");
  const [nombreFarmacia, setNombreFarmacia] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const handleComprar = async () => {
    const token = localStorage.getItem("token");
    const cedula = localStorage.getItem("cedula");

    if (!token || !cedula) {
      alert("⚠️ Usuario no autenticado.");
      return;
    }

    const compraData = {
      cedula: cedula,
      id_medicamento: idMedicamento,
      nombre_farmacia: nombreFarmacia,
      cantidad: Number(cantidad)
    };

    try {
      const response = await fetch("https://hospitalproyect-production.up.railway.app/farmacias/compraMedicamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(compraData)
      });

      if (!response.ok) throw new Error("Error en la compra");

      setMensaje("✅ Compra registrada exitosamente");
      setIdMedicamento("");
      setNombreFarmacia("");
      setCantidad(1);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar la compra");
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

      <div className="compra-container">
        <h2>Registrar Compra de Medicamento</h2>

        <div className="form-compra">
          <label>ID del Medicamento:</label>
          <input
            type="text"
            value={idMedicamento}
            onChange={(e) => setIdMedicamento(e.target.value)}
            placeholder="Ingrese el ID del medicamento"
          />

          <label>Nombre de la Farmacia:</label>
          <input
            type="text"
            value={nombreFarmacia}
            onChange={(e) => setNombreFarmacia(e.target.value)}
            placeholder="Ingrese el nombre de la farmacia"
          />

          <label>Cantidad:</label>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />

          <button onClick={handleComprar}>Comprar</button>
        </div>

        {mensaje && <div className="mensaje">{mensaje}</div>}
      </div>
    </>
  );
}

export default Compra;
