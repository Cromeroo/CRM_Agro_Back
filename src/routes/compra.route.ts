import { Router } from "express";
import {
  crearCompra,
  getCompras,
  getCompra,
  getComprasPorUsuario,
  getProductoEstadisticas,
} from "../controllers/compra.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post(
  "/",
  [
    check("usuarioId", "El ID del usuario es obligatorio").not().isEmpty(),
    check("productos", "Los productos son obligatorios").isArray({ min: 1 }),
    check("productos.*.producto", "El ID del producto es obligatorio")
      .not()
      .isEmpty(),
    check(
      "productos.*.cantidad",
      "La cantidad del producto es obligatoria"
    ).isInt({ min: 1 }),
    validateFields,
  ],
  crearCompra
);

router.get("/all", getCompras);
router.get("/:id", getCompra);
router.get("/usuario/:usuarioId", getComprasPorUsuario);
router.get("/estadisticas/:id", getProductoEstadisticas);

export default router;
