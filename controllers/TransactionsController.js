import CategoriesModel from "../models/CategoriesModel.js";
import userModel from "../models/UserModel.js";


export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener Categoria:", error);
    res.status(500).json({ message: "Error al obtener Categoria" });
  }
};
export const getCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const Categoria = await CategoriesModel.findByPk(id);
    if (!Categoria) return res.status(404).json({ message: "Categoria no encontrada" });
    res.json(Categoria);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener Categoria", error });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const newCategoria = await CategoriesModel.create(req.body);
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ message: "Error al crear Categoria", error });
  }
};


export const updatedCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const Categoria = await CategoriesModel.findByPk(id);
    if (!Categoria) return res.status(404).json({ message: "Categoria no encontrada" });
    await Categoria.update(req.body);
    res.json({message:"Categoria actualizado correctamente", pais: Categoria});
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar Categoria", error });
  }
};

export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const Categoria = await CategoriesModel.findByPk(id);
    if (!Categoria) return res.status(404).json({ message: "Categoria no encontrada" });
    await Categoria.destroy();
    res.json({ message: "Categoria eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar Categoria", error });
  }
};
