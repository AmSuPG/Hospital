import { useState } from "react";
import { Link } from "react-router-dom";
import "./Medico.css";

function Medico() {
  const [formData, setFormData] = useState({
    cedula: "",
    fechaExpedicion: "",
    nombre: "",
    correo: "",
    calle: "",
    carrera: "",
    password: "",
    telefonos: ["", ""],
    fecha_ingreso: "",
    salario: "",
    hora_inicio: "",
    hora_fin: "",
    departamento: "",
    registro_medico: "",
  });

  const handleChange = (e, index) => {
    const { id, value } = e.target;

    if (id === "telefono") {
      const newPhones = [...formData.telefonos];
      newPhones[index] = value;
      setFormData({ ...formData, telefonos: newPhones });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userDto: {
        cedula: formData.cedula,
        nombre: formData.nombre,
        correo: formData.correo,
        calle: formData.calle,
        carrera: formData.carrera,
        password: formData.password,
        fecha_expedicion: formData.fechaExpedicion,
        telefonos: formData.telefonos.filter(tel => tel !== ""),
      },
      empleadoDto: {
        fecha_ingreso: formData.fecha_ingreso,
        salario: parseFloat(formData.salario),
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
      },
      medicoDto: {
        departamento: formData.departamento,
        registro_medico: formData.registro_medico,
      },
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/empleados/regmedico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Médico registrado correctamente.");
      } else {
        const error = await response.json();
        alert(`Error al registrar médico: ${error.message || response.status}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error al registrar médico.");
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
            <img className="med2-img" src="/img/medico2.png" alt="medico" />
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <h1>Registra un nuevo médico</h1>

            <label htmlFor="cedula">ID</label>
            <input type="text" id="cedula" value={formData.cedula} onChange={handleChange} required />

            <label htmlFor="fechaExpedicion">Fecha de expedición de cédula</label>
            <input type="date" id="fechaExpedicion" value={formData.fechaExpedicion} onChange={handleChange} required />

            <label htmlFor="nombre">Name</label>
            <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />

            <label htmlFor="correo">Email</label>
            <input type="email" id="correo" value={formData.correo} onChange={handleChange} required />

            <label htmlFor="calle">Street</label>
            <input type="text" id="calle" value={formData.calle} onChange={handleChange} required />

            <label htmlFor="carrera">Cr</label>
            <input type="text" id="carrera" value={formData.carrera} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />

            <label htmlFor="telefono">Phones</label>
            <input type="tel" id="telefono" placeholder="3227790285" value={formData.telefonos[0]} onChange={(e) => handleChange(e, 0)} required />
            <input type="tel" id="telefono" placeholder="3227790285" value={formData.telefonos[1]} onChange={(e) => handleChange(e, 1)} />

            <label htmlFor="fecha_ingreso">Fecha de ingreso</label>
            <input type="date" id="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} required />

            <label htmlFor="salario">Salario</label>
            <input type="number" id="salario" placeholder="5000000" value={formData.salario} onChange={handleChange} required />

            <label htmlFor="hora_inicio">Hora de inicio</label>
            <input type="time" id="hora_inicio" value={formData.hora_inicio} onChange={handleChange} required />

            <label htmlFor="hora_fin">Hora de fin</label>
            <input type="time" id="hora_fin" value={formData.hora_fin} onChange={handleChange} required />

            <label htmlFor="departamento">Department</label>
            <input type="text" id="departamento" placeholder="cardiologia" value={formData.departamento} onChange={handleChange} required />

            <label htmlFor="registro_medico">Medical ID</label>
            <input type="text" id="registro_medico" placeholder="Ej: 586589fb" value={formData.registro_medico} onChange={handleChange} required />

            <button type="submit">Register me</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Medico;
