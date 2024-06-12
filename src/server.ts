import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.route";
import productoRoutes from "./routes/producto.route";
import authRoutes from "./routes/auth.route";
import interactionRoutes from "./routes/interaction.route";
import roleRoutes from "./routes/role.route";
import protectedRoutes from "./routes/protected.route";
import adminRoutes from "./routes/admin.route";
import bodyParser from "body-parser";
import compraRoutes from "./routes/compra.route";
import path from "path";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuario: "/api/v1/usuario",
    producto: "/api/v1/producto",
    login: "/api/v1/login",
    interaction: "/api/v1/interaction",
    role: "/api/v1/roles",
    protected: "/api/v1/protected",
    admin: "/api/v1/admin",
    compra: "/api/v1/producto/compras",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    //Base de datos
    dbConnection();

    //Métodos Iniciales
    this.middlewares();

    // Rutas
    this.routes();
  }

  miPrimerApi() {
    this.app.get("/", (req: Request, res: Response) => {
      console.log("GET / endpoint hit");
      res.status(200).json({ msg: "Api funcionando" });
    });
  }

  middlewares() {
    this.app.use(cors());

    // Lectura del Body
    this.app.use(express.json());
    this.app.use(bodyParser.json());

    // Servir archivos estáticos
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../uploads"))
    );

    this.miPrimerApi();
  }

  routes(): void {
    this.app.use(this.apiPaths.usuario, usuarioRoutes);
    this.app.use(this.apiPaths.producto, productoRoutes);
    this.app.use(this.apiPaths.login, authRoutes);
    this.app.use(this.apiPaths.interaction, interactionRoutes);
    this.app.use(this.apiPaths.role, roleRoutes);
    this.app.use(this.apiPaths.protected, protectedRoutes);
    this.app.use(this.apiPaths.admin, adminRoutes);
    this.app.use(this.apiPaths.compra, compraRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo por el puerto", this.port);
    });
  }
}

export default Server;
