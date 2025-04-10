import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./route/dishApiRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config()
const app = express();
app.use(express.json());

try {
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("Connected to MongoDB");
} catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit();
}

const server = app.listen(process.env.PORT, () => {
        console.log("running")
})

app.use("/", router);
app.use(errorHandler.notFound);
app.use(errorHandler.defaultError);


async function shutdown(){
        console.log("poweroff\n");
        server.close();
        await mongoose.disconnect();
}

process.on("SIGINT" || "SIGTERM", shutdown);
