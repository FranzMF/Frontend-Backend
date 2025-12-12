
import Order_detailsModel from "../models/Order_detailsModel.js";
import OrderModel from "../models/OrdersModel.js";
import productsModel from "../models/ProductModel.js";

// export const getAllOrderDetails = async (req, res) => {
//   try {
//     const OrderDetails = await Order_detailsModel.findAll();
//     res.json(OrderDetails);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener usuario", error });
//   }
// };

// export const getOrderDetails = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const OrderDetails = await Order_detailsModel.findByPk(id);
//     if (!OrderDetails) return res.status(404).json({ message: "usuario no encontrado" });
//     res.json(OrderDetails);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener usuario", error });
//   }
// };


// El controlador GetAll ahora usa 'include'
export const getAllOrderDetails = async (req, res) => {
  try {
    const OrderDetails = await Order_detailsModel.findAll({
      // Usamos 'include' para traer los datos relacionados
      include: [
        { 
          model: OrderModel, 
          as: 'order_data', // Debe coincidir con el alias definido en el modelo
          // Puedes especificar qué atributos quieres de la tabla OrderModel si es necesario
          // attributes: ['order_id', 'order_date'] 
        },
        { 
          model: productsModel, 
          as: 'product_data', // Debe coincidir con el alias definido en el modelo
          // attributes: ['product_id', 'name', 'description']
        }
      ]
    });
    res.json(OrderDetails);
  } catch (error) {
    console.error("Error al obtener los detalles de la orden:", error);
    res.status(500).json({ 
      message: "Error al obtener detalles de las órdenes", 
      error: error.message 
    });
  }
};

// El controlador GetOne ahora usa 'include'
export const getOrderDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const OrderDetails = await Order_detailsModel.findByPk(id, {
      // Usamos 'include' para traer los datos relacionados
      include: [
        { 
          model: OrderModel, 
          as: 'order_data' 
        },
        { 
          model: productsModel, 
          as: 'product_data' 
        }
      ]
    });

    if (!OrderDetails) {
      // Usar un mensaje más apropiado que "usuario no encontrado"
      return res.status(404).json({ message: "Detalle de orden no encontrado" });
    }

    res.json(OrderDetails);
  } catch (error) {
    console.error(`Error al obtener el detalle de la orden con ID ${id}:`, error);
    res.status(500).json({ 
      message: "Error al obtener el detalle de la orden", 
      error: error.message 
    });
  }
};

export const createOrderDetails = async (req, res) => {
  try {
    const OrderDetails = await Order_detailsModel.create(req.body);
    res.status(201).json(OrderDetails);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

