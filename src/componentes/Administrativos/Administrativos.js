import { Link } from "react-router-dom";
import "./Administrativos.css";

function Admin() {
  return (
    <>
    <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <div className="home">
            <Link to="/">
             <img className="home"
                src="/img/home.png"
                alt="Volver al inicio"
             />
            </Link>  
        </div>
        <div className="back">
            <Link to="/">
             <img className="back1"
                src="/img/back.png"
                alt="Volver a inicio administrativo"
             />
            </Link>
        </div>
    </header>
    <main className="body">
           <div className="register-container">
                <div className="admin">
                    <img className="admin-img"
                         src="/img/admin.webp"></img>
                </div>
                <form className="register-form">
                    <h1>Registra un nuevo administrador</h1>
                    <label htmlFor="cedula">ID</label>
                    <input type="text" id="cedula" placeholder="Ingrese su cédula" required />

                    <label htmlFor="nombre">Name</label>
                    <input type="text" id="nombre" placeholder="Ingrese su nombre" required />

                    <label htmlFor="correo">Email</label>
                    <input type="email" id="correo" placeholder="Ingrese su correo" required />

                    <label htmlFor="calle">Street</label>
                    <input type="text" id="calle" placeholder="Ej: 41-28" required />

                    <label htmlFor="carrera">Cr</label>
                    <input type="text" id="carrera" placeholder="Ej: 99B" required />

                    <label htmlFor="password"> Password </label>
                    <input type="password" id="password" placeholder="Ingrese su contraseña" required />

                    <label htmlFor="telefono">Phones</label>
                    <input type="tel" id="telefono" placeholder="3227790285" required />
                    <input type="tel" id="telefono" placeholder="3227790285"  />

                    <label htmlFor="fecha_ingreso">Fecha de ingreso</label>
                    <input type="date" id="fecha_ingreso" required />

                    <label htmlFor="salario">Salario</label>
                    <input type="number" id="salario" placeholder="5000000" required />

                    <label htmlFor="hora_inicio">Hora de inicio</label>
                    <input type="time" id="hora_inicio" required />

                    <label htmlFor="hora_fin">Hora de fin</label>
                    <input type="time" id="hora_fin" required />

                    <label htmlFor="cargo_admin">Cargo del administrador</label>
                    <input type="text" id="cargo_admin" placeholder="Ej: Coordinador" required />

                    <button type="submit">Register me</button>
                </form>

            </div>
    </main>
    </>
  );
}


export default Admin;
