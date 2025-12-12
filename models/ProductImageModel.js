import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const ProductImage = db.define('product_images', {
  image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  image_path: { type: DataTypes.STRING(255), allowNull: false },
}, {
  tableName: 'product_images',
  timestamps: true,
});

export default ProductImage;
