import React, { useEffect, useState } from "react";
import "./ConsulFarma.css";
import { Link } from "react-router-dom";
import { validarAcceso } from "../../validarAcceso";

function ConsulFarmacias() {
  const [nombreFarmacia, setNombreFarmacia] = useState("");
  const [farmacias, setFarmacias] = useState([]);

  useEffect(() => {
    (async () => {
      await validarAcceso(["admin", "super-user", "user"]);
    })();
  }, []);

  const handleBuscar = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://hospitalproyect-production.up.railway.app/farmacias/consultarFarmacia/${nombreFarmacia}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al consultar farmacia");
      }

      const data = await response.json();
      const farmaciasArray = Array.isArray(data) ? data : data.farmacias || [];

      setFarmacias(farmaciasArray);
    } catch (error) {
      console.error("Error al buscar farmacias:", error);
      setFarmacias([]);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
          <Link to="/">
            <img src="/img/home.png" alt="Volver al inicio" />
          </Link>
          <div className="back">
            <Link to="/InicioAdmin">
              <img className="back1" src="/img/back.png" alt="Volver a admin" />
            </Link>
          </div>
        </div>
      </header>

      <div className="farmacia-container">
        <h2>Consultar Farmacias</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre de la farmacia"
            value={nombreFarmacia}
            onChange={(e) => setNombreFarmacia(e.target.value)}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        <table className="farmacia-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Calle</th>
              <th>Carrera</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {farmacias.length === 0 ? (
              <tr>
                <td colSpan="4">No hay resultados</td>
              </tr>
            ) : (
              farmacias.map((f, index) => (
                <tr key={index}>
                  <td>{f.nombre}</td>
                  <td>{f.calle}</td>
                  <td>{f.carrera}</td>
                  <td>{f.telefono}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsulFarmacias;
