import db from "../database/db.js";

import { DataTypes } from "sequelize";


const CategoriesModel = db.define('categories', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});


export default CategoriesModel;