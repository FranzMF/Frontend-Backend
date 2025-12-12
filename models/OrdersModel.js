import db from "../database/db.js";

import { DataTypes } from "sequelize";
import userModel from "./UserModel.js";

const OrderModel = db.define('orders', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER },
  total: { type: DataTypes.DECIMAL(10,2)},
  status: { type: DataTypes.STRING },
});

OrderModel.belongsTo(userModel, { foreignKey: "user_id",  as: "user_data" });

export default OrderModel;