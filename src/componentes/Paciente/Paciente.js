import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Paciente.css";

function Paciente() {
  const [formData, setFormData] = useState({
    cedula: "",
    correo: "",
    nombre: "",
    calle: "",
    carrera: "",
    password: "",
    fecha_nac: "",
    telefonos: ["", ""]
  });

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
      userDto: {
        cedula: formData.cedula,
        correo: formData.correo,
        nombre: formData.nombre,
        calle: formData.calle,
        carrera: formData.carrera,
        password: formData.password,
        telefonos: formData.telefonos.filter(t => t.trim() !== "")
      },
      pacienteDto: {
        fecha_nac: formData.fecha_nac
      }
    };
    console.log(localStorage.getItem('token'))
    try {
      const response = await fetch("https://hospitalproyect-production.up.railway.app/pacientes/regPaciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("Registro exitoso:", result);
      alert("Paciente registrado correctamente");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar paciente");
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
            <img className="pac-img" src="/img/paciente.webp" alt="" />
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Registra un nuevo paciente</h1>

            <label htmlFor="cedula">ID</label>
            <input
              type="text"
              id="cedula"
              placeholder="Ingrese su cédula"
              required
              value={formData.cedula}
              onChange={handleChange}
            />

            <label htmlFor="nombre">Name</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese su nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
            />

            <label htmlFor="fecha_nac">Birthdate</label>
            <input
              type="date"
              id="fecha_nac"
              placeholder="Ingrese su fecha de nacimiento"
              required
              value={formData.fecha_nac}
              onChange={handleChange}
            />

            <label htmlFor="correo">Email</label>
            <input
              type="email"
              id="correo"
              placeholder="Ingrese su correo"
              required
              value={formData.correo}
              onChange={handleChange}
            />

            <label htmlFor="calle">Street</label>
            <input
              type="text"
              id="calle"
              placeholder="Ej: 41-28"
              required
              value={formData.calle}
              onChange={handleChange}
            />

            <label htmlFor="carrera">Cr</label>
            <input
              type="text"
              id="carrera"
              placeholder="Ej: 99B"
              required
              value={formData.carrera}
              onChange={handleChange}
            />

            <label htmlFor="password"> Password </label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <label htmlFor="telefono">Phones</label>
            <input
              type="tel"
              id="telefono"
              placeholder="3227790285"
              required
              value={formData.telefonos[0]}
              onChange={(e) => handleChange(e, 0)}
            />
            <input
              type="tel"
              id="telefono"
              placeholder="3227790285"
              value={formData.telefonos[1]}
              onChange={(e) => handleChange(e, 1)}
            />

            <button type="submit">Register me</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Paciente;
