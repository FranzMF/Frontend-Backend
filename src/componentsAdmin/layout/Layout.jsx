import React, { useEffect, useState } from 'react';
import HeaderAdmin from './HeaderAdmin';
import Sidebar from './Sidebar';
import './Layout.css';
import "./HeaderAdmin.css";
import "./Sidebar.css";
import { Outlet } from 'react-router-dom';
// import Footer from './Footer/Footer';

const Layout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isSidebarOpen]);

  return (
    <div className="layout">
      <HeaderAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="layout-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${isSidebarOpen ? "with-sidebar" : "full-width"}`}>
          {/* {Outlet} */}
          <Outlet/>
        </main>
      </div>
      
      {/* <Footer isSidebarOpen={isSidebarOpen} /> */}
      {/* Fondo oscuro solo visible cuando el sidebar está abierto */}
      
      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
      
    </div>
  );
};
export default Layout;