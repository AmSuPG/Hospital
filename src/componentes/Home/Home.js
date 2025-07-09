import React from "react";
import "./Home.css"; 
import LoginForm from '../Login/Login'; // <--- ¡Esta es la corrección crucial para Home.js!
import jwt_decode from "jwt-decode";

function Home() {
  return (
    <>
<div className="home">
      <header className="header">
        <div className="logo">HEALTH TRUE</div>
        <nav className="nav">
          <a href="#about">About Us</a>
          <a href="#about">Services</a>
        </nav>
      </header>
    <div className="presentacion">
        <main className="body1">
          <div className="present">
            <h1 className="intro1">WHERE HEALING BEGINS WITH TRUST</h1>
            <p className="description">
              Welcome to Health True, where your health is our priority. We
              provide comprehensive healthcare services with a focus on patient
              trust and well-being.
            </p>
          </div>
            <div className="medico-img-container">
              <img src="/img/medico.png" alt="Doctor saludando" className="medico-img-container" />
            </div>
          
          <div className="login-container">
            <LoginForm/>
          </div>
      </main>
      </div>
      </div>
    </>
  );
}
export default Home;

