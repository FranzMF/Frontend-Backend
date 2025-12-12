// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {

    // Cargar el carrito desde localStorage al inicializar
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    // Guardar en localStorage cada vez que cambie el carrito(persistencia del carrito aunque se cierre el navegador) 
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    //! ANTIGUA version de  agregar productos al carrito
    // const addToCart = (product, size, color, quantity) => {

    //     const BASE_URL = "http://localhost:8000/public/"; 
    //     //* para obtener solo la primera imagen del producto del array de imagenes
    //     const firstImage = product.images && product.images.length > 0
    //         ? `${BASE_URL}${product.images[0].image_path}`
    //         : 'images/default.jpg'; // imagen por defecto si no hay

    //     const cartItem = {
    //         id: `${product.product_id}-${size}-${color}`, // ID único
    //         productId: product.product_id,
    //         name: product.name,
    //         price: product.price,
    //         image: firs,
    //         size: size,
    //         color: color,
    //         quantity: quantity
    //     };

    //     setCartItems(prevItems => {
    //         // Verificar si el item ya existe
    //         const existingItemIndex = prevItems.findIndex(
    //             item => item.id === cartItem.id
    //         );

    //         if (existingItemIndex > -1) {
    //             // Si existe, actualizar la cantidad
    //             const updatedItems = [...prevItems];
    //             updatedItems[existingItemIndex].quantity += quantity;
    //             return updatedItems;
    //         } else {
    //             // Si no existe, agregar nuevo item
    //             return [...prevItems, cartItem];
    //         }
    //     });
    //     console.log(cartItem);
    // };

    // * nueva version para agregar al carrito
    const addToCart = (product, size, color, quantity) => {
        const BASE_URL = "http://localhost:8000/public/";

        // Obtener la primera imagen
        const firstImage = product.images && product.images.length > 0
            ? `${BASE_URL}${product.images[0].image_path}`
            : 'images/default.jpg';

        const cartItem = {
            id: `${product.product_id}`,
            productId: product.product_id,
            name: product.name,
            price: parseFloat(product.price),
            image: firstImage,
            size: size,
            color: color,
            quantity: quantity,
        };

        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === cartItem.id);

            if (existingItemIndex !== -1) {
                // Si ya existe, reemplazar la cantidad (NO sumar indefinidamente)
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity,
                };
                return updatedItems;
            } else {
                // Si no existe, agregar nuevo
                return [...prevItems, cartItem];
            }
        });
    };

    // Función para eliminar items del carrito
    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Función para actualizar cantidad de un item
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Calcular total del carrito
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Obtener cantidad total de items
    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Limpiar carrito
    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal: getCartTotal(),
        cartItemCount: getCartItemCount()
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};