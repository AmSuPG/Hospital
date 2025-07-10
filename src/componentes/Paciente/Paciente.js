import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Paciente.css";
import { validarAcceso } from "../../validarAcceso";

function Paciente() {
  const [formData, setFormData] = useState({
    cedula: "",
    fecha_expedicion: "",
    correo: "",
    nombre: "",
    calle: "",
    carrera: "",
    password: "",
    fecha_nac: "",
    telefonos: ["", ""]
  });

  // Verificación de token y permisos
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
      userDto: {
        cedula: formData.cedula,
        fecha_expedicion: formData.fecha_expedicion,
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

    try {
      const response = await fetch("https://hospitalproyect-production.up.railway.app/pacientes/regPaciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
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
            <img className="pac-img" src="/img/paciente.webp" alt="Paciente" />
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

            <label htmlFor="fecha_expedicion">Fecha de expedición</label>
            <input
              type="date"
              id="fecha_expedicion"
              required
              value={formData.fecha_expedicion}
              onChange={handleChange}
            />

            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese su nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
            />

            <label htmlFor="fecha_nac">Fecha de nacimiento</label>
            <input
              type="date"
              id="fecha_nac"
              required
              value={formData.fecha_nac}
              onChange={handleChange}
            />

            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              placeholder="Ingrese su correo"
              required
              value={formData.correo}
              onChange={handleChange}
            />

            <label htmlFor="calle">Calle</label>
            <input
              type="text"
              id="calle"
              placeholder="Ej: 41-28"
              required
              value={formData.calle}
              onChange={handleChange}
            />

            <label htmlFor="carrera">Carrera</label>
            <input
              type="text"
              id="carrera"
              placeholder="Ej: 99B"
              required
              value={formData.carrera}
              onChange={handleChange}
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <label htmlFor="telefono">Teléfonos</label>
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
              placeholder="Otro número (opcional)"
              value={formData.telefonos[1]}
              onChange={(e) => handleChange(e, 1)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Paciente;
