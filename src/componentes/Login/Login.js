import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      correo,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert("Credenciales inválidas");
        return;
      }

      const result = await response.json();
      const token = result.token;

      // Guardamos el token
      localStorage.setItem("token", token);

      // Decodificamos el token para obtener el rol
      const decoded = window.jwt_decode(token); // gracias al <script> en index.html
      const rol = decoded.rol || decoded.role || decoded.tipo || "desconocido";

      // Redirigir según el rol
      if (rol === "admin") {
        history.push("/inicioAdmin");
      } else if (rol === "medico") {
        history.push("/medico");
      } else if (rol === "paciente") {
        history.push("/paciente");
      } else {
        alert("Rol desconocido");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="correo">Email</label>
        <input
          type="email"
          id="correo"
          placeholder="Enter email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;

const decoded = window.jwt_decode(token);

const rol = decoded.permisos; // ← aquí está el rol del usuario
const cedula = decoded.cedula;
const correo = decoded.correo;
const estado = decoded.estado;

// Puedes guardar esto también si lo necesitas
localStorage.setItem("userRol", rol);
localStorage.setItem("cedula", cedula);
localStorage.setItem("correo", correo);

if (rol === "admin") {
  history.push("/inicioAdmin");
} else if (rol === "medico") {
  history.push("/medico");
} else if (rol === "paciente") {
  history.push("/paciente");
} else {
  alert("Rol no reconocido: " + rol);
}

