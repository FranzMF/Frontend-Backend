import React, { useState, useEffect } from 'react';
import './ProductModal.css';
import Swal from 'sweetalert2';

const ProductModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Resetear estados cuando cambia el producto o se abre el modal
  useEffect(() => {
    if (product && isOpen) {
      setSelectedSize('');
      setSelectedColor('');
      setQuantity(1);
      setCurrentIndex(0);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  // Preparar las imágenes
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [{ image_path: product.background || 'uploads/default.jpg' }];

  // cantidad de producto 
  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue >= 1) setQuantity(newValue);
  };

  // Función para agregar al carrito con validaciones
  const handleAddToCart = () => {
    // Validar que se hayan seleccionado talla y color si están disponibles
    const needsSize = product.sizes && product.sizes.length > 0;
    const needsColor = product.colors && pro+duct.colors.length > 0;

    if (needsSize && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    if (needsColor && !selectedColor) {
      alert('Por favor selecciona un color');
      return;
    }

    // Llamar a la función onAddToCart pasada desde el componente padre
    onAddToCart(product, selectedSize, selectedColor, quantity);
  };

  //Carrusel de imagenes de vista previa del producto 
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div
        className="product-modal-content animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="product-modal-close" onClick={onClose}>
          <span>&times;</span>
        </button>

        <div className="product-modal-container">
          {/* --- Galería con carrusel --- */}
          <div className="product-modal-left">
            <div className="product-gallery">
              <div className="gallery-main">
                {productImages.length > 1 && (
                  <button className="gallery-arrow left" onClick={prevImage}>
                    &#10094;
                  </button>
                )}
                <img
                  src={`http://localhost:8000/public/${productImages[currentIndex].image_path}`}
                  // src={productImages[currentIndex]}
                  alt={`${product.name} view`}
                />
                {productImages.length > 1 && (
                  <button className="gallery-arrow right" onClick={nextImage}>
                    &#10095;
                  </button>
                )}
              </div>

              {productImages.length > 1 && (
                <div className="gallery-thumbnails">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      // src={`http://localhost:8000/public/${img.images_path}`}
                      // key={index}
                      className={`thumbnail-item ${currentIndex === index ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        key={index}
                        src={`http://localhost:8000/public/${img.image_path}`}
                        // src={img}
                        alt={`${product.name} view ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- Detalles del producto --- */}
          <div className="product-modal-right">
            <h2 className="product-modal-title">{product.name}</h2>
            <div className="product-modal-price">${product.price}</div>
            <p className="product-modal-description">
              {product.description ||
                'Multi-egist term video area phantom vivenna Nørn video luctus ligula. Mauris consequent annaro feugiost.'}
            </p>

            <div className="product-options">
              {/* Mostrar selector de talla solo si el producto tiene tallas */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="product-option">
                  <div className="option-label">Size *</div>
                  <select
                    className="option-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Choose an option</option>
                    {product.sizes.map((size, index) => (
                      <option key={index} value={size}>Size {size}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Mostrar selector de color solo si el producto tiene colores */}
              {product.colors && product.colors.length > 0 && (
                <div className="product-option">
                  <div className="option-label">Color *</div>
                  <select
                    className="option-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option value="">Choose an option</option>
                    {product.colors.map((color, index) => (
                      <option key={index} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="product-quantity">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            {/* Mostrar categoría si está disponible */}
            {product.category && (
              <div className="product-category">
                <strong>Category: </strong>{product.category}
              </div>
            )}

            <div className="product-social">
              <button className="social-btn wishlist-btn">
                <span className="icon-heart">♡</span> Add to Wishlist
              </button>
              <div className="social-share">
                <button className="share-btn">f</button>
                <button className="share-btn">t</button>
                <button className="share-btn">g+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;