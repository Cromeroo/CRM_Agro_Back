import { Router } from "express";
import { assignRole } from "../controllers/role.controller";
import { validateJWT } from "../middlewares/validate-jwt";
import { checkRole } from "../middlewares/checkRoles";

const router = Router();

router.post(
  "/assign-role",
  [validateJWT, checkRole(["superadmin"])],
  assignRole
);

export default router;
