
import userModel from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};


export const updatedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await userModel.findByPk(id);
    if (!usuario) return res.status(404).json({ message: "usuario no encontrado" });
    await usuario.update(req.body);
    res.json({message:"Pais actualizado correctamente", usuario});
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await userModel.findByPk(id);
    if (!usuario) return res.status(404).json({ message: "usuario no encontrado" });
    await usuario.destroy();
    res.json({ message: "usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
