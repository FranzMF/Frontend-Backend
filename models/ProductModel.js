import db from "../database/db.js";

import { DataTypes } from "sequelize";
import CategoriesModel from "./CategoriesModel.js";
import ProductImage from "./ProductImageModel.js";

const productsModel = db.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL(10, 2) },
  stock: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
});

productsModel.belongsTo(CategoriesModel, { foreignKey: "category_id", as: "category_data" });

productsModel.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(productsModel, { foreignKey: 'product_id', as: 'product' });


export default productsModel;