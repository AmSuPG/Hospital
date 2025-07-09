import { Link } from "react-router-dom";
import "./Farmaceutico.css";

function Farmaceutico() {
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
    <main className="body">
           <div className="register-container">
                <div className="medico">
                    <img className="farma-img"
                         src="/img/farma.webp"></img>
                </div>
                <form className="register-form">
                    <h1>Registra un nuevo farmaceutico</h1>
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

                    <label htmlFor="telefonos">Phones</label>
                    <input type="tel" id="telefono" placeholder="3227790285" required />
                    <input type="tel" id="telefono" placeholder="3227790285" />

                    <label htmlFor="licencia"> Licence </label>
                    <input type="number" id="licencia" placeholder="Ingrese su numero de licencia" required />

                    <label htmlFor="farmacia"> Farmacia </label>
                    <input type="number" id="farmacia" placeholder="Ingrese su farmacia (1)" required />

                    <button type="submit">Register me</button>
                </form>

            </div>
    </main>
    </>
  );
}

export default Farmaceutico;
