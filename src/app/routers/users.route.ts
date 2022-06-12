import express, { Router } from "express";

const usersRouter: Router = express.Router();
import * as controllers from "../controllers/users.controller";

usersRouter.get("/", controllers.get);
usersRouter.get("/:id", controllers.get);
usersRouter.post("/", controllers.post);
usersRouter.put("/:id", controllers.put);
usersRouter.delete("/:id", controllers.delete_);

export default usersRouter;
