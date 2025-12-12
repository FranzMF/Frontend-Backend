import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updatedUser } from '../controllers/UserController.js';
import { createproduct, deleteproduct, deleteProductImage, getAllProducts, getproduct, updatedproduct } from '../controllers/ProductsController.js';
import { upload } from '../middleware/upload.js';
import { getAllCategories } from '../controllers/CategoriesController.js';
import { createOrderDetails, getAllOrderDetails, getOrderDetails } from '../controllers/Order_detailsController.js';
import { createOrder, getAllOrder, getOrder, updatedOrder } from '../controllers/OrderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

export const Router_Products = express.Router()
Router_Products.delete('/images/:id', deleteProductImage);
Router_Products.get('/', getAllProducts )
Router_Products.get('/:id', getproduct)

// Ruta para crear producto con múltiples imágenes (máximo 10)
Router_Products.post('/', upload.array('images', 10), createproduct);

// Ruta para actualizar producto (también acepta nuevas imágenes)
Router_Products.put('/:id', upload.array('images', 10), updatedproduct);
// Router_Products.delete('/product-images/:id', deleteProductImage);
// Router_Products.post('/', createproduct)
// Router_Products.put('/:id', updatedproduct)
Router_Products.delete('/:id', deleteproduct)




export const Router_User = express.Router()
Router_User.get('/', getAllUsers )
Router_User.get('/:id', getUser)
Router_User.post('/', createUser)
Router_User.put('/:id', updatedUser)
Router_User.delete('/:id', deleteUser)

export const Router_OrderDetails = express.Router()
Router_OrderDetails.get('/', getAllOrderDetails )
Router_OrderDetails.get('/:id', getOrderDetails)
Router_OrderDetails.post('/', createOrderDetails)



export const Router_Order = express.Router()
Router_Order.get('/',verifyToken, getAllOrder )
Router_Order.get('/:id', getOrder)
Router_Order.post('/', createOrder)
Router_Order.put('/:id', updatedOrder)



export const Router_Categories = express.Router()
Router_Categories.get('/', getAllCategories )
// Router_Categories.get('/:id', getFraud)
// Router_Categories.post('/', createFraud)
// Router_Categories.put('/:id', updatedFraud)
// Router_Categories.delete('/:id', deleteFraud)

