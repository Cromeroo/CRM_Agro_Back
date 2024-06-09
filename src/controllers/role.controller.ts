import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";

export const assignRole = async (req: Request, res: Response) => {
  const { email, roles } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }

    usuario.roles = roles;
    await usuario.save();

    res.status(200).json({ message: "Roles updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
