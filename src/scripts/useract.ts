import UsuarioModel from "../../src/models/usuario.model";

async function migrateUserRoles() {
  const usuarios = await UsuarioModel.find();
  for (const usuario of usuarios) {
    if (typeof usuario.roles === "string") {
      usuario.roles = [usuario.roles];
      await usuario.save();
    }
  }
}

migrateUserRoles()
  .then(() => {
    console.log("Migración completada.");
  })
  .catch((err) => {
    console.error("Error durante la migración:", err);
  });
