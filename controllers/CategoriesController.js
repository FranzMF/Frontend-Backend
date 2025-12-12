
import CategoriesModel from "../models/CategoriesModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.findAll();
    res.json(categories);
    
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorias", error });
  }
};
