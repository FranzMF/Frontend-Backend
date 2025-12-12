
import CategoriesModel from "../models/CategoriesModel.js";
import ProductImage from "../models/ProductImageModel.js";
import productsModel from "../models/ProductModel.js";
import fs from 'fs';
import path from 'path';

export const getAllProducts = async (req, res) => {

  try {
    const products = await productsModel.findAll({
      include: [
        {
          model: ProductImage, as: 'images'
        },
        {
          model: CategoriesModel,
          as: "category_data",
          attributes: ["category_id", "name", "description"]
        }
      ]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsModel.findOne({
      where: { product_id: id },
      include: [
        {
          model: CategoriesModel,
          as: "category_data",
          attributes: ["category_id", "name", "description"]
        }
      ]
    });

    if (!product) return res.status(404).json({ message: "products no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener products", error });
  }
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsModel.findByPk(id);
    if (!product) return res.status(404).json({ message: "products no encontrado" });
    await product.destroy();
    res.json({ message: "products eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar products", error });
  }
};

// ========================================
// CREAR PRODUCTO
// ========================================
export const createproduct = async (req, res) => {
  try {
    const { category_id, name, description, price, stock, status } = req.body;
    
    if (!name || !price || !category_id) {
      if (req.files) {
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      }
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Crear el producto
    const newProduct = await productsModel.create({
      category_id,
      name,
      description,
      price,
      stock: stock || 0,
      status: status || 'active'
    });

    // Guardar las imágenes
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map((file, index) => {
        return ProductImage.create({
          product_id: newProduct.product_id,
          image_path: `images/${file.filename}`, // ⬅ Solo guardar "images/product-xxx.png"
          is_primary: index === 0
        });
      });
      
      await Promise.all(imagePromises);
    }

    // Obtener el producto con imágenes
    const productWithImages = await productsModel.findByPk(newProduct.product_id, {
      include: [
        { model: ProductImage, as: 'images' },
        { model: CategoriesModel, as: 'category_data' }
      ]
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product: productWithImages
    });

  } catch (err) {
    console.error('Error al crear producto:', err);
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    res.status(500).json({ error: 'Error al crear el producto', details: err.message });
  }
};

// ========================================
// ACTUALIZAR PRODUCTO
// ========================================
export const updatedproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, description, price, stock, status } = req.body;

    const product = await productsModel.findByPk(id);
    
    if (!product) {
      if (req.files) {
        req.files.forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      }
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar datos del producto
    const updateData = {};
    if (category_id !== undefined) updateData.category_id = category_id;
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (status !== undefined) updateData.status = status;

    await product.update(updateData);

    // Si hay nuevas imágenes, agregarlas
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map(file => {
        return ProductImage.create({
          product_id: id,
          image_path: `images/${file.filename}`,
          is_primary: false
        });
      });
      
      await Promise.all(imagePromises);
    }

    // Obtener el producto actualizado
    const updatedProduct = await productsModel.findByPk(id, {
      include: [
        { model: ProductImage, as: 'images' },
        { model: CategoriesModel, as: 'category_data' }
      ]
    });

    res.json({
      message: 'Producto actualizado exitosamente',
      product: updatedProduct
    });

  } catch (err) {
    console.error('Error al actualizar producto:', err);
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    
    res.status(500).json({ 
      error: 'Error al actualizar el producto', 
      details: err.message 
    });
  }
};

// ========================================
// ELIMINAR IMAGEN DE PRODUCTO
// ========================================
export const deleteProductImage = async (req, res) => {
  console.log(' Ruta DELETE image alcanzada');
  console.log(' ID recibido:', req.params.id);
  
  try {
    const { id } = req.params;
    
    const image = await ProductImage.findByPk(id);
    
    if (!image) {
      console.log(' Imagen no encontrada en BD con ID:', id);
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    console.log('📷 Imagen encontrada:', image.image_path);

    // Usar process.cwd() para la ruta absoluta (igual que en upload.js)
    const imagePath = path.join(process.cwd(), 'src', 'Public', image.image_path);
    
    console.log(' Intentando eliminar:', imagePath);
    console.log(' Archivo existe?:', fs.existsSync(imagePath));
    
    // Eliminar archivo físico si existe
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(' Archivo físico eliminado correctamente');
    } else {
      console.log(' Archivo no encontrado, solo se eliminará el registro de BD');
    }

    // Eliminar registro de BD
    await image.destroy();
    console.log(' Registro eliminado de BD');

    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (err) {
    console.error(' Error al eliminar imagen:', err);
    res.status(500).json({ 
      error: 'Error al eliminar la imagen', 
      details: err.message 
    });
  }
};