import { Router, Request, Response } from "express";
import { checkRole } from "../middlewares/checkRoles";
import { validateJWT } from "../middlewares/validate-jwt";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/users",
  [validateJWT, checkRole(["superadmin", "admin", "Admin"])],
  getAllUsers
);

router.put(
  "/users/:id/role",
  [validateJWT, checkRole(["superadmin"])],
  updateUserRole
);

router.delete(
  "/users/:id",
  [validateJWT, checkRole(["superadmin"])],
  deleteUser
);

export default router;
