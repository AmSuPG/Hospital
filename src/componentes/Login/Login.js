import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      const response = await fetch("https://hospitalproyect-production.up.railway.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ correo, password })
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Error al iniciar sesión");
        return;
      }

      const data = await response.json();
      console.log("Login exitoso:", data.token);
      // Decodifica el token para extraer el permiso
        const payload = jwtDecode(data.token);
        const permisos = payload.permisos; // Este debe coincidir con el campo que pusiste en el backend al firmar el token
        const activo = payload.estado;
        localStorage.setItem('cedula', payload.cedula)
        if(!activo){
            alert(`El usuario actualmente se encuentra inactivo, favor comunicarse con un administrativo`)
            return;
        }
      alert('Inicio de sesión exitoso');

      // Ejemplo: guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redireccionar si quieres, por ejemplo a "/dashboard"
        switch (permisos) {
            case 'admin':
            window.location.href = '../InicioAdmin';
            break;
            case 'medico':
            window.location.href = '../InicioMedi';
            break;
            case 'user':
            window.location.href = '../InicioPaci';
            break;
            case 'super-user':
            window.location.href = '../InicioAdmin';
            break;
            case 'farmaceutico':
            window.location.href = '../InicioFarma';
            break;
            default:
            alert('Permiso no reconocido');
            window.location.href = '../'
        }
    } catch (err) {
      setError("Ocurrió un error de red");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="checkbox-container">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Submit</button>

        <div className="links">
          <p className="link">
            Cambia tu contraseña: <Link to="Recuperacion">Cambio/Olvido de contraseña</Link>
          </p>

        </div>
      </form>
    </div>
  );
}

export default LoginForm;