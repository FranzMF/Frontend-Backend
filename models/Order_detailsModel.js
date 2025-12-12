import db from "../database/db.js";

import { DataTypes } from "sequelize";
import OrderModel from "./OrdersModel.js";
import productsModel from "./ProductModel.js";

const Order_detailsModel = db.define('order_details', {
  order_detail_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  order_id: { type: DataTypes.INTEGER },
  product_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.DECIMAL(10,2) },
  unit_price: { type: DataTypes.DECIMAL(10,2) },
  subtotal: { type: DataTypes.DECIMAL(10,2) },
});

Order_detailsModel.belongsTo(OrderModel, { foreignKey: "order_id",  as: "order_data" });
Order_detailsModel.belongsTo(productsModel, { foreignKey: "product_id",  as: "product_data" });


export default Order_detailsModel;