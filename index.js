import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Dishes from "./model/Dishes.js";

dotenv.config()
const app = express();

console.log(process.env.CONNECTION_URL)

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

app.use(express.json());

app.get("/api/dishes", async (req, res, next) => {
        try {
                const dishes = await Dishes.find();
                res.json(dishes);
        } catch (err) {
                next(err);
        }
})

app.use((req, res, next) => {
        const error = new Error("not found");
        error.status = 404;
        next(error);
})

app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.json({
                status: status,
                message: err.message
        })
})


async function shutdown(){
        console.log("poweroff\n");
        server.close();
        await mongoose.disconnect();
}

process.on("SIGINT" || "SIGTERM", shutdown);
