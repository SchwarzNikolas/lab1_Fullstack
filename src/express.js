import express from "express";
import { router } from "./route/dishApiRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();
app.use(express.json());



app.use("/", router);
app.use(errorHandler.notFound);
app.use(errorHandler.defaultError);
