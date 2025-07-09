import React, { useState } from "react";
import axios from "axios";
import "./Compra.css";
import { Link } from "react-router-dom";

function Compra() {
  const [busqueda, setBusqueda] = useState("");
  const [medicamento, setMedicamento] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [farmaciaSeleccionada, setFarmaciaSeleccionada] = useState("");

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/medicamentos/${busqueda}`);
      setMedicamento(response.data);
      setFarmaciaSeleccionada(response.data.farmacia || ""); // Puedes ajustar este campo según tu backend
      setMensaje("");
    } catch (error) {
      setMedicamento(null);
      setMensaje("❌ Medicamento no encontrado");
    }
  };

  const handleComprar = async () => {
    try {
      const compraData = {
        medicamento_id: medicamento.id,
        cantidad: cantidad,
        farmacia: farmaciaSeleccionada,
      };

      await axios.post("http://localhost:3000/api/compras", compraData);
      setMensaje("✅ Compra registrada exitosamente");
    } catch (error) {
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
        <h2>Compra de Medicamentos</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Nombre o ID del medicamento"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        {medicamento && (
          <div className="med-info">
            <p><strong>Nombre:</strong> {medicamento.nombre}</p>
            <p><strong>Concentración:</strong> {medicamento.concentracion}</p>
            <p><strong>Presentación:</strong> {medicamento.presentacion}</p>
            <p><strong>Precio:</strong> ${medicamento.precio}</p>
            <p><strong>Farmacia:</strong> {medicamento.farmacia}</p>

            <div className="form-compra">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              <button onClick={handleComprar}>Comprar</button>
            </div>
          </div>
        )}

        {mensaje && <div className="mensaje">{mensaje}</div>}
      </div>
    </>
  );
}

export default Compra;
