"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compra_controller_1 = require("../controllers/compra.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("usuarioId", "El ID del usuario es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("productos", "Los productos son obligatorios").isArray({ min: 1 }),
    (0, express_validator_1.check)("productos.*.producto", "El ID del producto es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("productos.*.cantidad", "La cantidad del producto es obligatoria").isInt({ min: 1 }),
    validate_fields_1.validateFields,
], compra_controller_1.crearCompra);
router.get("/all", compra_controller_1.getCompras);
router.get("/:id", compra_controller_1.getCompra);
router.get("/usuario/:usuarioId", compra_controller_1.getComprasPorUsuario);
router.get("/estadisticas/:id", compra_controller_1.getProductoEstadisticas);
exports.default = router;
//# sourceMappingURL=compra.route.js.map