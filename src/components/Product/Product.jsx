import React, { useState } from 'react'
import img1 from '../../assets/images/product-01.jpg'
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css";
import { dataProduct } from './dataProductos';
import { dataCategories } from './dataCategories';
import ProductModal from '../ProductModal/ProductModal';
import Cart from '../../components/cart/Cart'; // Importar el componente Cart
import 'animate.css';
import { useCart } from '../cart/CartProvider';
import Header from '../Header/Header';
import { useEffect } from 'react';
import Swal from "sweetalert2";

import { transactionAPI } from '../../services/api';


const Product = ({ transactions }) => {


    // Obtener función addToCart del context
    const { addToCart } = useCart();

    // estados para el filtro y busqueda
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // Abrir modal de vista rapida del producto
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    // Estado para guardar el producto seleccionado
    const [selectedProduct, setSelectedProduct] = useState(null);

    const toggleSearch = () => setShowSearch(!showSearch);
    const toggleFilter = () => setShowFilter(!showFilter);

    const [searchTerm, setSearchTerm] = useState("");



    const [productData, setProductData] = useState([]);


    const getData = async () => {
        try {
            const response = await transactionAPI.getProducts();
            setProductData(response.data);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Filtrar productos en tiempo real
    const filteredProducts = productData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para abrir el modal con el producto seleccionado
    const openProductModal = (product) => {
        console.log(product)
        setSelectedProduct(product);
        setIsModalProductOpen(true);
    };

    // Función para cerrar el modal
    const closeProductModal = () => {
        setIsModalProductOpen(false);
        setSelectedProduct(null);
    };

    // Función para agregar productos al carrito
    const handleAddToCart = (product, size, color, quantity) => {
        addToCart(product, size, color, quantity);

        Swal.fire({
            title: `${product.name} agregado al carrito!`,
            icon: "success",
            draggable: true
        }).then(() => {
        });
        // alert(`${product.name} agregado al carrito!`);

        // Opcional: cerrar el modal después de agregar al carrito
        closeProductModal();
    };

    return (
        <section className="bg0" >
            <div className="container">
                <div className="p-b-10">
                    <h3 className="ltext-103 cl5">
                        Todos los productos
                    </h3>
                </div>

                <div className="flex-w flex-sb-m p-b-52">

                    <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                        {dataCategories.map((cat) => (
                            <button
                                key={cat.filter}
                                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                                data-filter={cat.filter}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex-w flex-c-m m-tb-0">
                        <div
                            className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4"
                            onClick={toggleFilter}
                        >
                            <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                            <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
                            Filter
                        </div>

                        <div
                            className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4"
                            onClick={toggleSearch}
                        >
                            <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                            <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
                            Search
                        </div>

                        {/* Botón para abrir carrito - Ya no es necesario aquí */}
                        {/* <div
                            className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-l-8 m-tb-4"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <i className="zmdi zmdi-shopping-cart cl2 m-r-6 fs-15 trans-04"></i>
                            Cart ({cartItems.length})
                        </div> */}
                    </div>

                    {/* Panel Search */}
                    <div className="panel-search w-full p-t-10 p-b-15">
                        {showSearch && (
                            <div className="bor8 dis-flex p-l-15">
                                <button
                                    className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                                    <i className="zmdi zmdi-search"></i>
                                </button>
                                <input
                                    className="mtext-107 cl2 size-114 plh2 p-r-15"
                                    type="text"
                                    name="search-product"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Filter Panel */}
                    {showFilter && (
                        <div className="panel-filter w-full p-t-10">
                            <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                                {/* ... resto del código del filtro ... */}
                                <div className="filter-col1 p-r-15 p-b-27">
                                    <div className="mtext-102 cl2 p-b-15">
                                        Sort By
                                    </div>
                                    <ul>
                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Default
                                            </a>
                                        </li>
                                        <li className="p-b-6">
                                            <a href="#" className="filter-link stext-106 trans-04">
                                                Popularity
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <h1 className="animate__fadeInDown">Listado de productos</h1>

                <div className='row isotope-grid'    >
                    {filteredProducts.length > 0 ? (

                        filteredProducts.map((item, index) => (
                            <div
                                key={index}
                                className="col-sm-6 col-md-4 col-lg-3 p-b-35 p-t-20  isotope-item women "
                            >
                                <div className="block2 " >
                                    <div className="block2-pic hov-img0"

                                    >
                                        <img
                                            src={`http://localhost:8000/public/${item.images[0]?.image_path}`}

                                            // src={`http://localhost:8000/public/${item.image_path}`} 
                                            alt={item.name}
                                        // src={item.background} alt="IMG-PRODUCT" 
                                        />

                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openProductModal(item);
                                            }}
                                            href="#"
                                            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                                        >
                                            Quick View
                                        </a>
                                    </div>

                                    <div className="block2-txt flex-w flex-t p-t-14 ">
                                        <div className="block2-txt-child1 flex-col-l ">
                                            <a
                                                href="product-detail.html"
                                                className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                                            >
                                                {item.name}
                                            </a>

                                            <span className="stext-105 cl3">{item.price} Bs</span>
                                        </div>

                                        <div className="block2-txt-child2 flex-r p-t-3">
                                            <a
                                                href="#"
                                                className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                                            >
                                                {/* <img
                                                    className="icon-heart1 dis-block trans-04"
                                                    src="../../assets/images/icons/icon-heart-01.png"
                                                    alt="ICON"
                                                /> */}
                                                {/* <img
                                                    className="icon-heart2 dis-block trans-04 ab-t-l"
                                                    src="../../assets/images/icons/icon-heart-02.png"
                                                    alt="ICON"
                                                /> */}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="mtext-107 cl2 p-t-20">No se encontraron productos</p>
                    )}
                </div>
            </div>
            {/* Modal del producto */}
            <ProductModal
                isOpen={isModalProductOpen}
                onClose={closeProductModal}
                product={selectedProduct}
                onAddToCart={handleAddToCart} // Pasar la función al modal
            />
        </section>
    );
}

export default Product