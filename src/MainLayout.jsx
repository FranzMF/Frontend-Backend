import { Outlet } from "react-router-dom";
import HeaderAdmin from "./componentsAdmin/layout/HeaderAdmin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      {/* Aquí se muestran las páginas cliente */}
      <Outlet />

      <Footer />
    </>
  );
}
