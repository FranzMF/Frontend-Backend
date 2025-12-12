import React, { useState } from "react";
import './Cart.css';
import { Link } from "react-router-dom";

const Cart = ({ isOpen, onClose, cartItems, onRemoveItem, cartTotal }) => {
    if (!isOpen) return null;

    const [hoveredItem, setHoveredItem] = useState(null);

    // Función para manejar la eliminación de items
    const handleRemoveItem = (itemId) => {
        onRemoveItem(itemId);
    };


    return (    
        <div className="cart-overlay">
            {/* Fondo oscuro */}
            <div className="cart-backdrop" onClick={onClose}></div>

            {/* Sidebar del carrito */}
            <div className="cart-sidebar">
                {/* Encabezado */}
                <div className="cart-header">
                    <span className="cart-title">YOUR CART</span>
                    <button className="cart-close-btn" onClick={onClose}>
                        <i className="zmdi zmdi-close"></i>
                    </button>
                </div>

                {/* Lista de productos */}
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div
                                key={item.id}
                                className="cart-item"
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="cart-item-img-wrapper">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-img"
                                    />
                                    {hoveredItem === item.id && (
                                        <button 
                                            className="cart-item-remove"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <i className="zmdi zmdi-close"></i>
                                        </button>
                                    )}
                                </div>

                                <div className="cart-item-details">
                                    <a href="#" className="cart-item-name">
                                        {item.name}
                                    </a>
                                    <div className="cart-item-options">
                                        {item.size && <span>Size: {item.size}</span>}
                                        {item.color && <span>Color: {item.color}</span>}
                                    </div>
                                    <span className="cart-item-price">
                                        {item.quantity} x {item.price} Bs
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Total y botones */}
                <div className="cart-footer">
                    <div className="cart-total">
                        Total: {cartTotal.toFixed(2)} Bs
                    </div>
                    {cartItems.length > 0 && (
                        <div className="cart-buttons">
                            <Link to='/home/shoping_cart' className="cart-btn view-cart">
                                VIEW CART
                            </Link>
                            <Link to='/home/shoping_cart' className="cart-btn checkout">
                                CHECK OUT
                            </Link>
                            
                            {/* <a href="#" className="cart-btn view-cart">VIEW CART</a>
                            <a href="#" className="cart-btn checkout">CHECK OUT</a> */}
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;