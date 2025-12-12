import db from "../database/db.js";

import { DataTypes } from "sequelize";
import userModel from "./UserModel.js";

const cartModel = db.define('cart', {
  cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  user_id: { type: DataTypes.INTEGER},
  product_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.DECIMAL(10,2)},
});

// cartModel.belongsTo(userModel, { foreignKey: "account_origin", targetKey: "account_number",  as: "id_account_origin" });
// cartModel.belongsTo(userModel, { foreignKey: "account_destination",targetKey: "account_number", as: "id_account_destination" });


export default cartModel;