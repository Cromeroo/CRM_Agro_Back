import { Router, Request, Response } from "express";
import { checkRole } from "../middlewares/checkRoles";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get(
  "/protected-route",
  [validateJWT, checkRole(["admin", "superadmin"])],
  (req: Request, res: Response) => {
    console.log("Ruta protegida alcanzada");
    res
      .status(200)
      .json({ message: "You have access to this protected route!" });
  }
);

export default router;
