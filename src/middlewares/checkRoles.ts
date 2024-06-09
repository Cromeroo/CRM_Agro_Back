import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./validate-jwt";

export const checkRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { usuario } = req;

    if (!usuario) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasRole = roles.some((role) => usuario.roles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
