"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("../middlewares/multer"));
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post("/", multer_1.default.single("imagen"), [
    (0, express_validator_1.check)("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("referencia", "La referencia del producto es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("cantidad", "La cantidad del producto es obligatoria")
        .not()
        .isEmpty()
        .isNumeric(),
    (0, express_validator_1.check)("precio", "El precio del producto es obligatorio")
        .not()
        .isEmpty()
        .isNumeric(),
    validate_fields_1.validateFields,
], producto_controller_1.crearProducto);
router.get("/", producto_controller_1.getProductos);
router.get("/:id", producto_controller_1.getUnProducto);
router.put("/:id", multer_1.default.single("imagen"), producto_controller_1.updateProducto);
router.delete("/:id", producto_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=producto.route.js.map