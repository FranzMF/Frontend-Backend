import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const URI = 'http://localhost:8000/auth/';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(URI, { email, password });
      if (res.data.status === "success") {

        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const role = res.data.role;
        const user_id = res.data.user_id;
        const token = res.data.token;

        localStorage.setItem('first_name', first_name);
        localStorage.setItem('last_name', last_name);
        localStorage.setItem('role', role);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('token', token);

        console.log(token)
        
        if (role == "admin") {
          Swal.fire({
            title: `BIENVENIDO "${first_name}"`,
            text: `Has iniciado sesión como: ${role}`,
            icon: "success"
          }).then(() => {
            navigate('/admin');
          });
        } else {
          Swal.fire({
            title: `BIENVENIDO "${first_name}"`,
            text: `Disfruta tu estancia en nuestra tienda !!!!`,
            icon: "success"
          }).then(() => {
            navigate('/home');
          });
        }

      } else {
        Swal.fire({
          title: "Advertencia",
          text: "Contraseña y/o usuario incorrectos",
          icon: "warning"
        });
      }

    } catch (err) {
      console.error(err);
      alert("A error occurredaaaaaaaaaaaa");
    }

  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Sección izquierda (formulario) */}
        <div className="login-form-section">
          <h2 className="login-title">Bienvenido</h2>
          <p className="login-subtitle">Tu <strong> tienda virtual</strong> favorita, donde encontraras de todo </p>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            <div className="login-options">
              <label>
                <input type="checkbox" /> Recordarme
              </label>
              <a href="/" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className="login-button">
              Ingresar
            </button>
          </form>

          <p className="register-text">
            Ingresar a <a href="/Home">Tienda ECCOMERCE</a> como invitado
          </p>
          <p className="register-text">
            Eres nuevo/a? registrate <a href="/registrar">aqui</a>
          </p>
        </div>

        {/* Sección derecha (branding o imagen) */}
        <div className="login-right">

        </div>

        {/* <div className="login-illustration"> */}
        {/* <h3>Plataforma Radio Taxis</h3>
          <p>Conecta pasajeros y conductores de forma rápida y segura.</p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;