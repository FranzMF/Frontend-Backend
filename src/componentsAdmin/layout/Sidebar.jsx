import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, FileText, BarChart3, Settings, AirVentIcon, Flower2, HomeIcon, SquareChartGantt, ChartBarStacked, ChartBarBig, User, LogOut } from 'lucide-react';
import './Sidebar.css';
// import { BiWater } from 'react-icons/bi';

import img1 from '../../assets/images/logo.png'
const Sidebar = ({ isOpen, toggleSidebar }) => {
  
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: Home, label: 'Inicio' },
    { path: '/admin/productos', icon: SquareChartGantt, label: 'Productos' },
    { path: '/admin/pedidos', icon: SquareChartGantt, label: 'pedidos' },
    { path: '/admin/categorias', icon: ChartBarStacked, label: 'Categorias' },
    { path: '/admin/reportes',icon: ChartBarBig, label: 'Reportes' },
    { path: '/admin/perfil', icon: User,label: 'Perfil' },
  ];
  
  // Función que cierra el sidebar solo en móvil
  const handleClick = () => {
    if (window.innerWidth <= 768 && toggleSidebar) {
      toggleSidebar();
    }
  };


  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-header">
        <div className="sidebar-logo"><img src={img1} alt="" style={{
          width: '130px', // Ancho deseado
          height: '100px' // Alto deseado
        }} /></div>
        <h2 className="sidebar-title">Tio DARK</h2>
      </div>

      <div className="sidebar-content">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={handleClick} // <-- aquí se cierra al hacer clic

            >
              
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;