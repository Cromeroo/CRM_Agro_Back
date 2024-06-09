import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UsuarioModel from "../models/usuario.model";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

const dbConnection = process.env.DB_CONNECTION;

if (!dbConnection) {
  throw new Error("DB_CONNECTION is not defined in .env file");
}

mongoose
  .connect(dbConnection)
  .then(() => {
    console.log("Conectado a la base de datos");

    const superadmin = new UsuarioModel({
      nombre: "Super Admin",
      email: "superadmin@gmail.com",
      password: bcrypt.hashSync("superadminpassword", 10),
      tipoDocumento: "CC",
      numeroDocumento: "10011964333",
      roles: "superadmin",
    });

    return superadmin.save();
  })
  .then(() => {
    console.log("Superadministrador creado");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.disconnect();
  });
