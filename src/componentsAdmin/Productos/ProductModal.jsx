import { useState, useEffect } from "react";
import axios from "axios";
import './ProducosModal.css'
import { transactionAPI } from "../../services/api";

export default function ProductModal({ close, reload, product }) {
  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    stock: "",
    status: "active"
  });

  const [imageFiles, setImageFiles] = useState([]); // Múltiples archivos
  const [existingImages, setExistingImages] = useState([]); // Imágenes ya guardadas (para edición)
  const [imagePreviews, setImagePreviews] = useState([]); // Vistas previas
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await transactionAPI.getCategories();
      setCategories(response.data || response); // Depende de cómo venga la respuesta
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  }

  useEffect(() => {
    fetchCategories()
    if (isEdit) {
      setForm({
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.category_id,
        stock: product.stock,
        status: product.status || "active"
      });

      // Cargar imágenes existentes
      if (product.images && product.images.length > 0) {
        setExistingImages(product.images);
      }
    }
  }, [product, isEdit]);

  // Manejar selección de múltiples imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      alert("Máximo 10 imágenes permitidas");
      return;
    }

    setImageFiles(files);

    // Crear vistas previas
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Eliminar una imagen de la vista previa (antes de subir)
  const removePreview = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // Eliminar una imagen ya guardada en BD
  const deleteExistingImage = async (imageId) => {
    if (!window.confirm("¿Eliminar esta imagen?")) return;

    try {
      await axios.delete(`http://localhost:8000/products/images/${imageId}`);
      setExistingImages(existingImages.filter(img => img.image_id !== imageId));
      alert("Imagen eliminada");
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      alert("Error al eliminar la imagen");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ================================
      // CREAR FORMDATA CON TODOS LOS DATOS
      // ================================
      const formData = new FormData();

      // Agregar datos del producto
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category_id", form.category_id);
      formData.append("stock", form.stock);
      formData.append("status", form.status);

      // Agregar todas las imágenes
      imageFiles.forEach((file) => {
        formData.append("images", file); // 'images' es el nombre que espera Multer
      });

      // ================================
      // CREAR O ACTUALIZAR PRODUCTO
      // ================================
      if (isEdit) {
        // Al actualizar, solo agregamos nuevas imágenes
        await axios.put(
          `http://localhost:8000/products/${product.product_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
        alert("Producto actualizado correctamente");
      } else {
        // Al crear, enviamos todo junto
        await axios.post(
          "http://localhost:8000/products",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
        alert("Producto creado correctamente");
      }

      reload();
      close();

    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert(`Error: ${error.response?.data?.error || "No se pudo guardar"}`);
    }
  };

  // return (
  //   <div className="modal-overlay" onClick={close}>
  //     <div className="modal-content" onClick={(e) => e.stopPropagation()}>

  //       <h2>{isEdit ? "Editar Producto" : "Agregar Producto"}</h2>

  //       <form className="modal-form" onSubmit={handleSubmit}>

  //         <label>Nombre *</label>
  //         <input
  //           required
  //           value={form.name}
  //           onChange={(e) => setForm({ ...form, name: e.target.value })}
  //         />

  //         <label>Precio *</label>
  //         <input
  //           required
  //           type="number"
  //           step="0.01"
  //           value={form.price}
  //           onChange={(e) => setForm({ ...form, price: e.target.value })}
  //         />

  //         <label>Categoría ID *</label>
  //         <input
  //           required
  //           type="number"
  //           value={form.category_id}
  //           onChange={(e) => setForm({ ...form, category_id: e.target.value })}
  //         />

  //         <label>Stock</label>
  //         <input
  //           type="number"
  //           value={form.stock}
  //           onChange={(e) => setForm({ ...form, stock: e.target.value })}
  //         />

  //         <label>Descripción</label>
  //         <textarea
  //           rows="3"
  //           value={form.description}
  //           onChange={(e) => setForm({ ...form, description: e.target.value })}
  //         />

  //         <label>Estado</label>
  //         <select
  //           value={form.status}
  //           onChange={(e) => setForm({ ...form, status: e.target.value })}
  //         >
  //           <option value="active">Activo</option>
  //           <option value="inactive">Inactivo</option>
  //         </select>

  //         <label>
  //           Imágenes del Producto (máximo 10)
  //           {!isEdit && <span style={{ color: "red" }}> *</span>}
  //         </label>
  //         <input
  //           type="file"
  //           accept="image/*"
  //           multiple
  //           onChange={handleImageChange}
  //           required={!isEdit}
  //         />
  //         <small style={{ color: "#666", fontSize: "12px" }}>
  //           Puedes seleccionar múltiples imágenes a la vez
  //         </small>

  //         {/* VISTA PREVIA DE NUEVAS IMÁGENES */}
  //         {imagePreviews.length > 0 && (
  //           <div style={{ marginTop: "15px" }}>
  //             <strong>Nuevas imágenes a subir:</strong>
  //             <div style={{ 
  //               display: "flex", 
  //               gap: "10px", 
  //               flexWrap: "wrap", 
  //               marginTop: "10px" 
  //             }}>
  //               {imagePreviews.map((preview, index) => (
  //                 <div key={index} style={{ position: "relative" }}>
  //                   <img
  //                     src={preview}
  //                     style={{ 
  //                       width: "100px", 
  //                       height: "100px", 
  //                       objectFit: "cover",
  //                       borderRadius: "6px",
  //                       border: index === 0 ? "3px solid #4CAF50" : "1px solid #ddd"
  //                     }}
  //                     alt={`preview-${index}`}
  //                   />
  //                   {index === 0 && (
  //                     <span style={{
  //                       position: "absolute",
  //                       top: "5px",
  //                       left: "5px",
  //                       background: "#4CAF50",
  //                       color: "white",
  //                       padding: "2px 6px",
  //                       borderRadius: "3px",
  //                       fontSize: "10px"
  //                     }}>
  //                       Principal
  //                     </span>
  //                   )}
  //                   <button
  //                     type="button"
  //                     onClick={() => removePreview(index)}
  //                     style={{
  //                       position: "absolute",
  //                       top: "5px",
  //                       right: "5px",
  //                       background: "red",
  //                       color: "white",
  //                       border: "none",
  //                       borderRadius: "50%",
  //                       width: "24px",
  //                       height: "24px",
  //                       cursor: "pointer",
  //                       fontWeight: "bold"
  //                     }}
  //                   >
  //                     ×
  //                   </button>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         )}

  //         {/* IMÁGENES EXISTENTES (MODO EDICIÓN) */}
  //         {isEdit && existingImages.length > 0 && (
  //           <div style={{ marginTop: "15px" }}>
  //             <strong>Imágenes actuales:</strong>
  //             <div style={{ 
  //               display: "flex", 
  //               gap: "10px", 
  //               flexWrap: "wrap", 
  //               marginTop: "10px" 
  //             }}>
  //               {existingImages.map((img) => (
  //                 <div key={img.image_id} style={{ position: "relative" }}>
  //                   <img
  //                     src={`http://localhost:8000/public/${img.image_path}`}
  //                     style={{ 
  //                       width: "100px", 
  //                       height: "100px", 
  //                       objectFit: "cover",
  //                       borderRadius: "6px",
  //                       border: img.is_primary ? "3px solid #4CAF50" : "1px solid #ddd"
  //                     }}
  //                     alt="product"
  //                   />
  //                   {img.is_primary && (
  //                     <span style={{
  //                       position: "absolute",
  //                       top: "5px",
  //                       left: "5px",
  //                       background: "#4CAF50",
  //                       color: "white",
  //                       padding: "2px 6px",
  //                       borderRadius: "3px",
  //                       fontSize: "10px"
  //                     }}>
  //                       Principal
  //                     </span>
  //                   )}
  //                   <button
  //                     type="button"
  //                     onClick={() => deleteExistingImage(img.image_id)}
  //                     style={{
  //                       position: "absolute",
  //                       top: "5px",
  //                       right: "5px",
  //                       background: "red",
  //                       color: "white",
  //                       border: "none",
  //                       borderRadius: "50%",
  //                       width: "24px",
  //                       height: "24px",
  //                       cursor: "pointer",
  //                       fontWeight: "bold"
  //                     }}
  //                   >
  //                     ×
  //                   </button>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         )}

  //         <div className="modal-actions" style={{ marginTop: "20px" }}>
  //           <button type="button" onClick={close} className="btn-secondary">
  //             Cancelar
  //           </button>
  //           <button type="submit" className="btn-primary">
  //             {isEdit ? "Guardar Cambios" : "Crear Producto"}
  //           </button>
  //         </div>

  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div className="product-modal-overlay" onClick={close}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Header del Modal */}
        <div className="product-modal-header">
          <h2 className="product-modal-title">
            {isEdit ? "Editar Producto" : "Agregar Producto"}
          </h2>
          <button
            type="button"
            className="product-modal-close"
            onClick={close}
          >
            ×
          </button>
        </div>

        <form className="product-modal-form" onSubmit={handleSubmit}>
          <div className="product-form-columns">
            {/* Columna Izquierda */}
            <div className="product-form-left">
              <div className="product-form-group">
                <label className="product-form-label">Nombre *</label>
                <input
                  required
                  className="product-form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ingresa el nombre del producto"
                />
              </div>

              <div className="product-form-group">
                <label className="product-form-label">Precio *</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  className="product-form-input"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div className="product-form-group">
                <label className="product-form-label">Categoría *</label>
                <select
                  required
                  className="product-form-select"
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                >
                  <option value="">Selecciona una categoría</option>
                  {
                    categories.map((category) => (
                      <option key={category.category_id} value={category.category_id}>
                        {category.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              {/* <div className="product-form-group">
                <label className="product-form-label">Categoría ID *</label>
                <input
                  required
                  type="number"
                  className="product-form-input"
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  placeholder="ID de categoría"
                />
              </div> */}

              <div className="product-form-group">
                <label className="product-form-label">Stock</label>
                <input
                  type="number"
                  className="product-form-input"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="Cantidad en stock"
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="product-form-right">
              <div className="product-form-group">
                <label className="product-form-label">Descripción</label>
                <textarea
                  rows="3"
                  className="product-form-textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe el producto..."
                />
              </div>

              <div className="product-form-group">
                <label className="product-form-label">Estado</label>
                <select
                  className="product-form-select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>

              <div className="product-form-group">
                <label className="product-form-label">
                  Imágenes del Producto (máximo 10)
                  {!isEdit && <span className="product-required-asterisk"> *</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="product-form-file"
                  onChange={handleImageChange}
                  required={!isEdit}
                />
                <small className="product-form-help">
                  Puedes seleccionar múltiples imágenes a la vez
                </small>
              </div>
            </div>
          </div>

          {/* VISTA PREVIA DE NUEVAS IMÁGENES */}
          {imagePreviews.length > 0 && (
            <div className="product-images-section">
              <h4 className="product-images-title">Nuevas imágenes a subir:</h4>
              <div className="product-images-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="product-image-item">
                    <img
                      src={preview}
                      className={`product-image-preview ${index === 0 ? 'product-image-primary' : ''}`}
                      alt={`preview-${index}`}
                    />
                    {index === 0 && (
                      <span className="product-primary-badge">Principal</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      className="product-image-remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IMÁGENES EXISTENTES (MODO EDICIÓN) */}
          {isEdit && existingImages.length > 0 && (
            <div className="product-images-section">
              <h4 className="product-images-title">Imágenes actuales:</h4>
              <div className="product-images-grid">
                {existingImages.map((img) => (
                  <div key={img.image_id} className="product-image-item">
                    <img
                      src={`http://localhost:8000/public/${img.image_path}`}
                      className={`product-image-preview ${img.is_primary ? 'product-image-primary' : ''}`}
                      alt="product"
                    />
                    {img.is_primary && (
                      <span className="product-primary-badge">Principal</span>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteExistingImage(img.image_id)}
                      className="product-image-remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acciones del Modal */}
          <div className="product-modal-actions">
            <button
              type="button"
              onClick={close}
              className="product-btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="product-btn-primary"
            >
              {isEdit ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}