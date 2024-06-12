import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  _id?: string;
  usuario?: any;
}

export const validateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    console.log("No hay token en la petición");
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req._id = decoded._id;
    req.usuario = decoded.usuario;
    console.log("Token decodificado correctamente:", decoded);
    next();
  } catch (error) {
    console.log("Token inválido:", error);
    return res.status(401).json({
      ok: false,
      msg: "Token Inválido",
    });
  }
};
