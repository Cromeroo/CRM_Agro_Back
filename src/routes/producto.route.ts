import { Router } from "express";
import {
  crearProducto,
  eliminarProducto,
  getProductos,
  getUnProducto,
  updateProducto,
} from "../controllers/producto.controller";
import { check } from "express-validator";
import upload from "../middlewares/multer";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post(
  "/",
  upload.single("imagen"),

  [
    check("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
    check("referencia", "La referencia del producto es obligatorio")
      .not()
      .isEmpty(),
    check("cantidad", "La cantidad del producto es obligatoria")
      .not()
      .isEmpty()
      .isNumeric(),
    check("precio", "El precio del producto es obligatorio")
      .not()
      .isEmpty()
      .isNumeric(),
    validateFields,
  ],
  crearProducto
);
router.get("/", getProductos);
router.get("/:id", getUnProducto);
router.put("/:id", upload.single("imagen"), updateProducto);
router.delete("/:id", eliminarProducto);

export default router;
