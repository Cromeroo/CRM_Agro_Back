import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";
import sendEmail from "../helpers/email";
import path from "path";
import fs from "fs";

export const register = async (req: Request, res: Response) => {
  const { nombre, email, password, tipoDocumento, numeroDocumento } = req.body;

  try {
    const existeEmail = await UsuarioModel.findOne({ email: email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya está registrado",
      });
    }

    const usuario = new UsuarioModel({
      nombre,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      tipoDocumento,
      numeroDocumento,
      roles: ["usuario"],
    });

    await usuario.save();

    const token = await generateJWT(usuario._id, usuario.email, usuario.roles);

    res.status(201).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      msg: "Error al registrar el usuario, hable con el administrador",
      error: error.message, // Incluir mensaje de error en la respuesta
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar el email
    const usuario = await UsuarioModel.findOne({ email: email });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    // Verificar el password
    const validarPassword = bcrypt.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son válidas",
      });
    }

    // Generar Token
    const token = await generateJWT(usuario._id, usuario.email, usuario.roles, {
      nombre: usuario.nombre,
    });

    res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const olvidoContrasena = async (req: Request, resp: Response) => {
  const { email, numeroDocumento } = req.body;

  try {
    const existeUsuario = await UsuarioModel.findOne({
      email,
      numeroDocumento,
    });

    if (!existeUsuario) {
      resp.status(400).json({
        ok: false,
        msg: "Los datos no coinciden",
      });
      return;
    }

    const id = existeUsuario?._id;

    if (id) {
      // Generar Token
      const token = await generateJWT(
        id,
        email,
        ["usuario"], // Suponiendo que solo asignas rol de usuario en olvido de contraseña
        { expiresIn: "1h" }
      );

      // Guardar el Token
      existeUsuario.token = token;
      await existeUsuario.save();

      const nombre = existeUsuario.nombre;

      const resetLink = `http://localhost:4200/reset-password?token=${encodeURIComponent(
        String(token)
      )}`;

      sendEmail(
        email,
        "Cambio de contraseña",
        `<html>
  <head>
    <title>Cambio de contraseña</title>
  </head>
  <body>
    <p>Hola ${nombre},</p>
    <p>
      Has solicitado un cambio de contraseña. Haz clic en el siguiente enlace
      para cambiar tu contraseña:
    </p>
    <a href=${resetLink}
      >Cambiar contraseña</a
    >
    <p>Si no solicitaste este cambio, ignora este correo.</p>
  </body>
</html>`
      );

      resp.status(200).json({
        ok: true,
        msg: "Proceso éxitoso",
        usuario: existeUsuario,
      });
    }
  } catch (error) {
    console.error(error);
    resp.status(400).json({
      ok: false,
      msg: "No se logró validar sus datos",
      error: (error as Error).message,
    });
  }
};

export const cambioContrasena = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const { password } = req.body;
  const tokenPass = req.header("x-token") as string;

  try {
    if (!password || !tokenPass) {
      return res.status(400).json({
        ok: false,
        msg: "Valores invalidos",
      });
    }

    const usuario = await UsuarioModel.findOne({ token: tokenPass });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El token ya fue utilizado",
      });
    }

    const newPassword = bcrypt.hashSync(password, 10);

    const actualizarPassword = await UsuarioModel.findByIdAndUpdate(
      id,
      {
        password: newPassword,
        token: "",
      },
      { new: true }
    );

    if (!actualizarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error al actualizar la contraseña",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Contraseña actualizada",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      ok: false,
      msg: "Error al actualizar la contraseña, hable con el administrador",
    });
  }
};
