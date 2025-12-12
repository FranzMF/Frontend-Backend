import db from "../database/db.js";

import { DataTypes } from "sequelize";
import userModel from "./UserModel.js";

const Payment_methodsModel = db.define('users', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  card_number: { type: DataTypes.STRING },
  expiration_date: { type: DataTypes.STRING },
});

Payment_methodsModel.belongsTo(userModel, { foreignKey: "user_id",  as: "user_data" });

export default Payment_methodsModel;