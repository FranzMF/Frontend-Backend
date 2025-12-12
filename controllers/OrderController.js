
import OrderModel from "../models/OrdersModel.js";
import userModel from "../models/UserModel.js";


export const getAllOrder = async (req, res) => {
  try {
    const Order = await OrderModel.findAll({
      include: [
        {
          model: userModel,
          as: 'user_data', // Debe coincidir con el alias definido en el modelo
          // Puedes especificar qué atributos quieres de la tabla OrderModel si es necesario
          // attributes: ['order_id', 'order_date'] 
        }
      ]
    });
    res.json(Order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const Order = await OrderModel.findByPk(id);
    if (!Order) return res.status(404).json({ message: "usuario no encontrado" });
    res.json(Order);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

export const createOrder = async (req, res) => {
  try {
    const Order = await OrderModel.create(req.body);
    res.status(201).json(Order);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};


export const updatedOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const Order = await OrderModel.findByPk(id);
    if (!Order) return res.status(404).json({ message: "Categoria no encontrada" });
    await Order.update(req.body);
    res.json({message:"Categoria actualizado correctamente", pais: Order});
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar Categoria", error });
  }
};
