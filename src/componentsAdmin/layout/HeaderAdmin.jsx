import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderAdmin.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { Home, Calendar, Users, FileText, BarChart3, Settings, Rose, Flower2, AirVentIcon, User, Menu } from 'lucide-react';
// import { BiWater } from 'react-icons/bi';

const HeaderAdmin = ({ toggleSidebar, isSidebarOpen }) => {

  const navigate = useNavigate();


    const nombre = localStorage.getItem('first_name');
    const apellido = localStorage.getItem('last_name');
    const role = localStorage.getItem('role');

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (toggleSidebar) toggleSidebar();
  };


  const logout = () => {
    Swal.fire({
      title: "¿Estas seguro de cerrar sesión?",
      text: "Deberás volver a ingresar los datos para acceder nuevamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesión cerrada",
          text: "Hasta pronto",
          icon: "success"
        }).then(() => {
          localStorage.clear(); // 👈 limpiamos sesión
          navigate('/');
        });
      }
    });
  };





  // return (
  //   // <header className="header">
  //   <header className={`header ${isSidebarOpen ? "expanded" : "collapsed"}`}>
  //     <nav className="nav">
  //       <div className="left-section">
  //         <button className="menu-btn" onClick={handleToggle}>
  //           <Menu size={24} />
  //         </button>
  //         <div className="logo">Tio Dark</div>
  //         <div className="relative">
  //           {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> */}
  //           <input
  //             type="text"
  //             placeholder=" Buscar "
  //             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
  //           />
  //         </div>

  //       </div>
  //           <Link className='toShop' to="/">Ir a tienda</Link>
  //       <ul className="nav-links">

  //         <li className="nav-item">
  //           <Link to=""><Home /></Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link><BarChart3 /></Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link><User /></Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link><Settings /></Link>
  //         </li>
  //       </ul>

  //     </nav>
  //   </header>
  // );

  return (
    <header className={`header ${isSidebarOpen ? "expanded" : "collapsed"}`}>
      <nav className="nav">
        <div className="left-section">
          <button className="menu-btn" onClick={handleToggle}>
            <Menu size={24} />
          </button>
          <div className="logo">Tio Dark</div>
          <div className="relative">
            <input
              type="text"
              placeholder=" Buscar "
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        <Link className='toShop' to="/">Ir a tienda </Link>

        <div className="nav-right">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to=""><Home /></Link>
            </li>
            <li className="nav-item">
              <Link><BarChart3 /></Link>
            </li>
            <li className="nav-item">
              <Link><User /></Link>
            </li>
            <li className="nav-item">
              <Link><Settings /></Link>
            </li>
          </ul>

          {/* Perfil del usuario */}
          <div className="user-profile" onClick={logout}>
            <div className="user-avatar">
              <User size={32} />
            </div>
            <div className="user-info">
              <span className="user-name">{nombre}</span>
              <span className="user-role">{role}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;