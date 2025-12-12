
import { useEffect, useState } from 'react';
import Cart from '../cart/Cart';
import 'animate.css';
import { useCart } from '../cart/CartProvider';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Logo_01 from '../../assets/images/logoTio.png';

const Header = () => {
    const navigate = useNavigate();

    const nombre = localStorage.getItem('first_name');
    const apellido = localStorage.getItem('last_name');
    const role = localStorage.getItem('role');


    // Obtener datos del carrito desde el context
    const { cartItems, removeFromCart, cartTotal, cartItemCount } = useCart();

    // Mednu del celular
    const [menuOpen, setMenuOpen] = useState(false);

    // para que el fondo del header se vuelva blanco
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            //el menú se esconde si el scroll pasa de 200px
            if (scrollPosition > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // para abrir el carrito
    const [isCartOpen, setIsCartOpen] = useState(false);



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



    return (
        <header>
            {/* <!-- Header desktop --> */}
            <div className={`container-menu-desktop ${isScrolled ? 'menu-scrolled' : ''}`}>
                {/* <!-- Topbar --> */}
                {/* <div className="top-bar">
                    <div className="content-topbar flex-sb-m h-full container">
                        <div className="left-top-bar">
                            Free shipping for standard order over $100
                        </div>

                        <div className="right-top-bar flex-w h-full">
                            <a href="#" className="flex-c-m trans-04 p-lr-25">
                                Help & FAQs
                            </a>

                            <a href="#" className="flex-c-m trans-04 p-lr-25">
                                My Account
                            </a>

                            <a href="#" className="flex-c-m trans-04 p-lr-25">
                                EN
                            </a>

                            <a href="#" className="flex-c-m trans-04 p-lr-25">
                                USD
                            </a>
                        </div>
                    </div>
                </div> */}

                <div className={`wrap-menu-desktop ${isScrolled ? 'scrolled' : ''}`}>
                    <nav className="limiter-menu-desktop container">

                        {/* <!-- Logo desktop --> */}
                        <a href="#" className="logo">
                            <img src={Logo_01} alt="IMG-LOGO" />
                        </a>

                        {/*  ---------------------------------- MENU PRINCIPAL --------------------------------------------------   */}
                        {/* <!-- Menu desktop --> */}
                        <div className="menu-desktop">
                            <ul className="main-menu">
                                <li className="active-menu">
                                    <Link to="/home">Inicio</Link>
                                    <ul className="sub-menu">
                                        <li><a href="index.html">Homepage 1</a></li>
                                        <li><a href="home-02.html">Homepage 2</a></li>
                                        <li><a href="home-03.html">Homepage 3</a></li>
                                    </ul>
                                </li>

                                <li>
                                    {/* <Link to="/products" > Shop</Link> */}
                                    {/* <link to="/products"/> */}
                                    <Link to="/home/products">Productos</Link>
                                    {/* <a >Shop</a> */}
                                </li>

                                {/* <li className="label1" data-label1="hot">
                                    <a href="shoping-cart.html">Features</a>
                                </li> */}


                                <li>
                                    <a href="/home">Blog</a>
                                </li>

                                <li>
                                    <Link to="/home/about">Sobre Nosotros</Link>
                                </li>

                                <li>
                                    <Link to="/home/contact">Contactos</Link>
                                </li>

                            </ul>
                        </div>

                        {/* <!-- Icon header --> */}
                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                                <i className="zmdi zmdi-search"></i>
                            </div>

                            <div
                                onClick={() => setIsCartOpen(true)}
                                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                                data-notify={cartItemCount}
                            >
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>

                            <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-50 " data-notify="0">
                                <i className="zmdi zmdi-favorite-outline"></i>
                            </a>
                        </div>

                        <div className="user-profile" onClick={logout}>
                            <div className="user-avatar">
                                <User size={32} />
                            </div>
                            <div className="user-info">
                                <span className="user-name">{nombre}</span>
                                <span className="user-role">{role}</span>
                            </div>
                        </div>

                    </nav>
                </div>
            </div>

            {/* MODAL DEL CARRITO DE COMPRAS */}
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={removeFromCart}
                cartTotal={cartTotal}
            />

            {/* <!-- Header Mobile --> */}
            <div className="wrap-header-mobile">
                {/* <!-- Logo moblie --> */}
                <div className="logo-mobile">
                    <a href="/"><img src={Logo_01} alt="IMG-LOGO" /></a>
                </div>

                {/* <!-- Icon header --> */}
                <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                        <i className="zmdi zmdi-search"></i>
                    </div>

                    <div
                        onClick={() => setIsCartOpen(true)}
                        className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                        data-notify={cartItemCount}
                    >
                        <i className="zmdi zmdi-shopping-cart"></i>
                    </div>

                    <a href="#" className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti" data-notify="0">
                        <i className="zmdi zmdi-favorite-outline"></i>
                    </a>
                </div>

                {/* <!-- Button show menu --> */}
                <div
                    className={`btn-show-menu-mobile hamburger hamburger--squeeze ${menuOpen ? "is-active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </div>

            </div>

            {/* Menú móvil */}
            <div
                className="menu-mobile"
                style={{ display: menuOpen ? "block" : "none" }}
            >
                {/* Topbar */}
                <ul className="topbar-mobile">
                    <li>
                        <div className="left-top-bar">
                            Free shipping for standard order over $100
                        </div>
                    </li>

                    <li>
                        <div className="right-top-bar flex-w h-full">
                            <a href="#" className="flex-c-m p-lr-10 trans-04">
                                Help & FAQs
                            </a>
                            <a href="#" className="flex-c-m p-lr-10 trans-04">
                                My Account
                            </a>
                            <a href="#" className="flex-c-m p-lr-10 trans-04">
                                EN
                            </a>
                            <a href="#" className="flex-c-m p-lr-10 trans-04">
                                USD
                            </a>
                        </div>
                    </li>
                </ul>

                {/* Menú principal */}
                <ul className="main-menu-m">
                    <li>
                        <a href="/">Home</a>
                        <ul className="sub-menu-m">
                            <li><a href="index.html">Homepage 1</a></li>
                            <li><a href="home-02.html">Homepage 2</a></li>
                            <li><a href="home-03.html">Homepage 3</a></li>
                        </ul>
                        <span className="arrow-main-menu-m">
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </span>
                    </li>

                    <li>
                        <Link to="/products">Shop</Link>
                    </li>

                    <li>
                        <a href="shoping-cart.html" className="label1 rs1" data-label1="hot">
                            Features
                        </a>
                    </li>

                    <li>
                        <a href="blog.html">Blog</a>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>


            <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
                <div className="container-search-header">
                    <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                        <img src="images/icons/icon-close2.png" alt="CLOSE" />
                    </button>

                    <form className="wrap-search-header flex-w p-l-15">
                        <button className="flex-c-m trans-04">
                            <i className="zmdi zmdi-search"></i>
                        </button>
                        <input className="plh3" type="text" name="search" placeholder="Search..." />
                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header
