import { Link } from "react-router-dom";
import "./Medico.css";

function Medico() {
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
            <div className="back">
            <Link to="/InicioAdmin">
             <img className="back1"
                src="/img/back.png"
                alt="Volver a inicio administrativo"
             />
            </Link>
        </div>
        </div>
    </header>
    <main className="body2">
           <div className="register-container">
                <div className="medico">
                    <img className="med2-img"
                         src="/img/medico2.png"></img>
                </div>
                <form className="register-form">
                    <h1>Registra un nuevo médico</h1>
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
                    <input type="tel" id="telefono" placeholder="3227790285" />

                    <label htmlFor="fecha_ingreso">Fecha de ingreso</label>
                    <input type="date" id="fecha_ingreso" required />

                    <label htmlFor="salario">Salario</label>
                    <input type="number" id="salario" placeholder="5000000" required />

                    <label htmlFor="hora_inicio">Hora de inicio</label>
                    <input type="time" id="hora_inicio" required />

                    <label htmlFor="hora_fin">Hora de fin</label>
                    <input type="time" id="hora_fin" required />

                    <label htmlFor="Departamento">Department</label>
                    <input type="text" id="dept" placeholder="cardiologia" required />
                    
                    <label htmlFor="registro_med">Medical ID</label>
                    <input type="text" id="registroMed" placeholder="Ej: 586589fb" required />

                    <button type="submit">Register me</button>
                </form>

            </div>
    </main>
    </>
  );
}

export default Medico;
