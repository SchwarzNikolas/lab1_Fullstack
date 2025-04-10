import express from "express";
import { router } from "./route/dishApiRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Initialize the Express application
export const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use the dish API router for all routes starting from the root
app.use("/", router);

/**
 * Middleware to handle 404 errors when no matching route is found.
 *
 * This passes any 404 errors to the global error handler defined in errorHandler.notFound.
 */
app.use(errorHandler.notFound);

// Global error handler for other types of errors (e.g., 500 internal server errors)
app.use(errorHandler.defaultError);
