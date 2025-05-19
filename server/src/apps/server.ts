import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import Router from "express-promise-router";
import fs from "fs";
import helmet from "helmet";
import * as http from "http";
import { Server as SocketIOServer } from "socket.io";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

import { configApps } from "../config";
import { DomainError } from "../contexts/shared/domain/value-object/DomainError";
import { connectionDb } from "../contexts/shared/infrastructure/persistence/sequelize/SequelizeClientPostgresql";
import { registerRoutes as registerAuth } from "./auth/routes";
import { registerRoutes as registerRoutesPosts } from "./posts/routes";
import { setupSocket } from "./socketServer";
import { registerRoutes as registerUsers } from "./users/routes/";

export class Server {
  private readonly port: string;
  private readonly express: express.Express;
  private httpServer?: http.Server;
  public addSocketIo?: boolean | undefined;
  constructor(port: string, addSocketIo = false) {
    this.addSocketIo = addSocketIo;
    this.port = port;
    this.express = express();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: "deny" }));
    this.express.use(compress());
    this.express.use(cookieParser());
    const router = Router();
    router.use(
      cors({
        origin: configApps.urlClients,
        credentials: true,
      })
    );
    this.express.use(router);

    registerUsers(router);
    registerAuth(router);
    registerRoutesPosts(router);

    //Documentation:
    const file = fs.readFileSync("./documentation.yaml", "utf8");
    const swaggerDocument = YAML.parse(file);
    this.express.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
          persistAuthorization: true, // This allows authentication to be maintained
          requestInterceptor: (req: any) => {
            // to ensure that cookies are sent with requests
            req.credentials = "include"; // Include cookies in requests
            return req;
          },
        },
      })
    );

    // Error handling middleware for production
    router.use(
      (error: DomainError, req: Request, res: Response, next: NextFunction) => {
        //const errorFound = errorsList.find((e) => e.error === error.message);
        if (process.env.NODE_ENV === "dev") {
          console.error(error);
        }
        res
          .status(error.statusCode ?? 500)
          .json(error.clientMessage ?? "Internal server error");
        next();
      }
    );
  }

  async listen() {
    //await this.loadConfig();
    await connectionDb();
    this.setUpServer();
  }

  private setUpServer() {
    this.httpServer = http.createServer(this.express);
    if (this.addSocketIo) {
      this.setUpSocketIo(this.httpServer);
    }
    this.startServer(this.httpServer);
  }

  private startServer(server: http.Server) {
    server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
      if (this.addSocketIo) {
        console.log("Socket.IO is enabled");
      }
    });
  }

  private setUpSocketIo(server: http.Server) {
    const io = new SocketIOServer(server, {
      cors: {
        origin: configApps.urlClients,
        credentials: true,
      },
    });
    setupSocket(io); // Setup socket events
  }

  async stop() {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          resolve(true);
        });
      }
      resolve(true);
    });
  }

  getHttpServer() {
    return this.httpServer;
  }

  getApp() {
    return this.express;
  }
}
