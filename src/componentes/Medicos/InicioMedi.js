import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InicioMedi.css";

function InicioMed() {
  const [idEmpleado, setIdEmpleado] = useState("");

  useEffect(() => {
    const fetchIdEmpleado = async () => {
      try {
        const cedula = localStorage.getItem("cedula");
        const token = localStorage.getItem("token");

        const response = await fetch(`https://hospitalproyect-production.up.railway.app/empleados/getId/${cedula}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok && data.id_empleado) {
          setIdEmpleado(data.id_empleado);
        } else {
          console.warn("No se encontró el ID del empleado");
        }
      } catch (error) {
        console.error("Error al obtener el ID del empleado:", error);
      }
    };

    fetchIdEmpleado();
  }, []);

  return (
    <>
      <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
          <Link to="/">
            <img className="home" src="/img/home.png" alt="Volver al inicio" />
          </Link>
        </div>
        <div className="employee-id">
          ID: {idEmpleado || "Cargando..."}
        </div>
      </header>

      <div className="menu-container">
        <h2>¡WELCOME AGAIN, DOCTOR!</h2>
        <p className="par">We are pleased to know that you are part of us</p>
        <div className="button-group">
          <img className="doc-img" src="/img/doc.png" alt="Doc Icon" />
          <Link to="/ConsultarAgenda" className="menu-button">Check agenda</Link>
          <Link to="/Prescripcion" className="menu-button">Generate prescription</Link>
          <Link to="/ActualHistor" className="menu-button">Update medical history</Link>
          <Link to="/ConsulCitas" className="menu-button">Consult medical appointments</Link>
          <Link to="/consulMediMedi" className="menu-button">Consult medications</Link>
        </div>
      </div>
    </>
  );
}

export default InicioMed;
