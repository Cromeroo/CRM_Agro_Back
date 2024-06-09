import { Router } from "express";
import {
  cambioContrasena,
  login,
  olvidoContrasena,
  register,
} from "../controllers/auth.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.post(
  "/",
  [
    check("email", "El correo es obligatorio!").not().isEmpty().isEmail(),
    check("password", "La contraseña es obligatoria!").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña es obligatoria y debe ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("numeroDocumento", "El número de documento es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  register
);

router.post(
  "/olvidocontrasena",
  [
    check("email", "El correo es obligatorio!").not().isEmpty().isEmail(),
    check("numeroDocumento", "El número de documento es obligatorio!")
      .not()
      .isEmpty(),
    validateFields,
  ],
  olvidoContrasena
);

router.put(
  "/cambiocontrasena",
  validateJWT,
  [check("password", "El password es obligatorio").not().isEmpty()],
  cambioContrasena
);

export default router;
