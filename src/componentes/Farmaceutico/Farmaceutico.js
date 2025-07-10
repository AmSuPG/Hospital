import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Farmaceutico.css";
import { validarAcceso } from "../../validarAcceso";

function Farmaceutico() {
  const [formData, setFormData] = useState({
    cedula: "",
    fecha_expedicion: "",
    nombre: "",
    correo: "",
    calle: "",
    carrera: "",
    password: "",
    telefonos: ["", ""],
    licencia: "",
    farmacia: ""
  });
  
  useEffect(() => {
      (async () => {
        await validarAcceso(["admin", "super-user"]);
      })();
    }, []);

  const handleChange = (e, index = null) => {
    const { id, value } = e.target;

    if (id === "telefono" && index !== null) {
      const nuevosTelefonos = [...formData.telefonos];
      nuevosTelefonos[index] = value;
      setFormData({ ...formData, telefonos: nuevosTelefonos });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userData: {
        cedula: formData.cedula,
        fecha_expedicion: formData.fecha_expedicion,
        nombre: formData.nombre,
        correo: formData.correo,
        calle: formData.calle,
        carrera: formData.carrera,
        password: formData.password,
        telefonos: formData.telefonos.filter(t => t.trim() !== "")
      },
      licencia: formData.licencia,
      id_farmacia: parseInt(formData.farmacia)
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://hospitalproyect-production.up.railway.app/farmacias/regFarmaceutico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        alert(`Error: ${err.message || "Registro fallido"}`);
        return;
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);
      alert("Farmacéutico registrado correctamente");
    } catch (err) {
      console.error("Error en el fetch:", err);
      alert("Error de red o servidor");
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
              <img className="back1" src="/img/back.png" alt="Volver a inicio administrativo" />
            </Link>
          </div>
        </div>
      </header>
      <main className="body">
        <div className="register-container">
          <div className="medico">
            <img className="farma-img" src="/img/farma.webp" alt="Farmacéutico" />
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Registra un nuevo farmacéutico</h1>

            <label htmlFor="cedula">ID</label>
            <input type="text" id="cedula" placeholder="Ingrese su cédula" required value={formData.cedula} onChange={handleChange} />

            <label htmlFor="fecha_expedicion">Fecha de expedición</label>
            <input type="date" id="fecha_expedicion" required value={formData.fecha_expedicion} onChange={handleChange} />

            <label htmlFor="nombre">Name</label>
            <input type="text" id="nombre" placeholder="Ingrese su nombre" required value={formData.nombre} onChange={handleChange} />

            <label htmlFor="correo">Email</label>
            <input type="email" id="correo" placeholder="Ingrese su correo" required value={formData.correo} onChange={handleChange} />

            <label htmlFor="calle">Street</label>
            <input type="text" id="calle" placeholder="Ej: 41-28" required value={formData.calle} onChange={handleChange} />

            <label htmlFor="carrera">Cr</label>
            <input type="text" id="carrera" placeholder="Ej: 99B" required value={formData.carrera} onChange={handleChange} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Ingrese su contraseña" required value={formData.password} onChange={handleChange} />

            <label htmlFor="telefonos">Phones</label>
            <input type="tel" id="telefono" placeholder="3227790285" required value={formData.telefonos[0]} onChange={(e) => handleChange(e, 0)} />
            <input type="tel" id="telefono" placeholder="3227790285" value={formData.telefonos[1]} onChange={(e) => handleChange(e, 1)} />

            <label htmlFor="licencia">Licence</label>
            <input type="number" id="licencia" placeholder="Ingrese su número de licencia" required value={formData.licencia} onChange={handleChange} />

            <label htmlFor="farmacia">Farmacia</label>
            <input type="number" id="farmacia" placeholder="Ingrese su farmacia (1)" required value={formData.farmacia} onChange={handleChange} />

            <button type="submit">Register me</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Farmaceutico;
