import db from "../database/db.js";

import { DataTypes } from "sequelize";

const userModel = db.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  phone: { type: DataTypes.INTEGER },
  role: { type: DataTypes.STRING },
});


export default userModel;