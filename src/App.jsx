import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/home'
import Footer from './components/Footer/Footer'
import { CartProvider } from './components/cart/CartProvider'
import { BrowserRouter, Route, Link, Routes, Router } from 'react-router-dom';
import Product from './components/Product/Product'
import Header from './components/Header/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import Shoping_cart from './components/Shoping_cart/Shoping_cart'
import Login from './Login/Login'
import ProductList from './componentsAdmin/Productos/Productos'
import Dashboard from './componentsAdmin/Dashboard/Dashboard'
import Layout from './componentsAdmin/layout/Layout'
import MainLayout from './MainLayout'
import UserCreateForm from './components/RegisterUser/UserCreateForm'
import OrderList from './componentsAdmin/PedidosAdmin/PedidosAdmin'
import Chat from './components/chatOllama/Chat'

// function App() {

//   // **Componente para el Layout Principal (con Header y Footer)**
//   const MainLayout = () => {
//     return (
//       <>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Product />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/shoping_cart" element={<Shoping_cart />} />
//           <Route path="/admin" element={<ProductList />} />


//           {/* Aquí podrías agregar una ruta de fallback 404 si lo deseas */}
//         </Routes>
//         <Footer />
//       </>
//     );
//   };

//   return (

//     <>
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             {/* 1. Ruta de Login (Sin Layout) */}
//             {/* Esta ruta solo renderiza el componente Login */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/slider" element={<EcommerceLayout />} />
//             <Route path="/dashboard" element={<Dashboard />} />

//             {/* 2. Ruta de Layout Principal (Con Header y Footer) */}
//             {/* Esta ruta renderiza el MainLayout para todas las demás rutas */}
//             <Route path="*" element={<MainLayout />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </>
//   )
// }


function App() {

  // return (
  //   <CartProvider>
  //     <BrowserRouter>
  //       <Routes>

  //         {/* ---------------- LOGIN (sin layout) ---------------- */}
  //         <Route path="/" element={<Login />} />
  //         <Route path="/registrar" element={<UserCreateForm/>} />
  //         {/* <Route path="/slider" element={<EcommerceLayout />} /> */}

  //         {/* ---------------- LAYOUT ADMIN ---------------- */}
  //         <Route path="/admin" element={<Layout />}>
  //           <Route index element={<Dashboard />} />
  //           <Route path="dashboard" element={<Dashboard />} />
  //           <Route path="productos" element={<ProductList/>} />
  //           <Route path="pedidos" element={<OrderList/> } />
  //         </Route>

  //         {/* ---------------- LAYOUT CLIENTE ---------------- */}
  //         <Route path="/home" element={<MainLayout />}>
  //           <Route index element={<Home />} />
  //           <Route path="products" element={<Product />} />
  //           <Route path="about" element={<About />} />
  //           <Route path="contact" element={<Contact />} />
  //           <Route path="shoping_cart" element={<Shoping_cart />} />

  //           <Route path="chat" element={<Chat />} />

  //         </Route>

  //       </Routes>
  //     </BrowserRouter>
  //   </CartProvider>
  // );


  return (
    <CartProvider>
      <BrowserRouter>
        {/* 🔵 BURBUJA GLOBAL (aparece en todas las páginas) */}
        <Chat />

        <Routes>

          {/* LOGIN Y REGISTRO */}
          <Route path="/" element={<Login />} />
          <Route path="/registrar" element={<UserCreateForm />} />

          {/* ADMIN */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="pedidos" element={<OrderList />} />
          </Route>

          {/* CLIENTE */}
          <Route path="/home" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shoping_cart" element={<Shoping_cart />} />

            {/* Ya no necesitas esta ruta visual */}
            {/* <Route path="chat" element={<Chat />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );

}
export default App
