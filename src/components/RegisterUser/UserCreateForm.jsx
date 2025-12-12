import React, { useState } from 'react';
import './UserCreateForm.css';
import { userAPI } from '../../services/userAPI.JS';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UserCreateForm = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    role: 'cliente' // Automático
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await userAPI.createUser(formData);

      Swal.fire({
        title: `Cuenta Registrada Correctamente! ahora inicia sesion`,
        icon: "success",
        draggable: true
      }).then(() => {
        navigate('/')
      });
      // setMessage('✅ Usuario creado exitosamente');

      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        role: 'cliente'
      });
    } catch (error) {
      setMessage('❌ Error al crear el usuario');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="user-create-container">
      <div className="user-create-card">
        {/* Header */}
        <div className="user-create-header">
          <h1 className="user-create-title">Registrarse </h1>
          <p className="user-create-subtitle">Unete a nuestra tienda virtual para realizar tus pedidos</p>
        </div>

        {/* Formulario en 2 columnas */}
        <form onSubmit={handleSubmit} className="user-create-form">
          <div className="user-form-columns">
            {/* Columna Izquierda */}
            <div className="user-form-left">
              <div className="user-form-group">
                <label htmlFor="first_name" className="user-form-label">Nombre *</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="user-form-input"
                  placeholder="Ingresa el nombre"
                />
              </div>

              <div className="user-form-group">
                <label htmlFor="email" className="user-form-label">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="user-form-input"
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <div className="user-form-group">
                <label htmlFor="address" className="user-form-label">Dirección *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="user-form-textarea"
                  placeholder="Ingresa la dirección completa"
                  rows="3"
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="user-form-right">
              <div className="user-form-group">
                <label htmlFor="last_name" className="user-form-label">Apellido *</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="user-form-input"
                  placeholder="Ingresa el apellido"
                />
              </div>

              <div className="user-form-group">
                <label htmlFor="password" className="user-form-label">Contraseña *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="user-form-input"
                  placeholder="Crea una contraseña segura"
                  minLength="6"
                />
              </div>

              <div className="user-form-group">
                <label htmlFor="phone" className="user-form-label">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={8}
                  className="user-form-input"
                  placeholder="67500224"
                />
              </div>

            </div>
          </div>

          {/* Mensaje y Botón */}
          <div className="user-form-footer">
            {message && (
              <div className={`user-form-message ${message.includes('✅') ? 'user-message-success' : 'user-message-error'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className="user-submit-btn"
              disabled={loading}
            >
              {loading ? 'Creando Usuario...' : 'Crear Usuario'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UserCreateForm;