import { ConfigManager } from "@/configs/ConfigManager";
import { Configuration } from "@/configs/Configuration";
import { UserController } from "@/controllers/UsersController";

import bodyParser from "body-parser";
import bodyParserXML from "body-parser-xml";
import cors from "cors";
import express from "express";

function main() {
  bodyParserXML(bodyParser);
  const app = express();

  const config = new ConfigManager();
  config.load();

  app.use(bodyParser.xml());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  const usersController = UserController();

  app.get("/users", usersController.getUsers);
  app.get("/users/:id", usersController.getUser);
  app.post("/users", usersController.setUser);
  app.delete("/users/:id", usersController.deleteUser);

  const HOST = config.get(Configuration.HOST);
  const PORT = config.get(Configuration.PORT);

  app.listen(PORT, HOST);

  console.info("Web Service - XML & DOM Presentation");
  console.info("Ready, %s:%d", HOST, PORT);
}

main();
