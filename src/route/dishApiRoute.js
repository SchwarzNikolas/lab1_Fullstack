import express from "express";
import DishController from "../controller/DishController.js";

// Initialize the Express router to define routes for dish-related API operations
export const router = express.Router();

/**
 * Route to retrieve all dishes.
 * Calls the getAllDishes method in the DishController.
 */
router.get("/api/dishes", DishController.getAllDishes);

/**
 * Route to retrieve a specific dish by its name.
 * Calls the getDishByName method in the DishController.
 *
 * @param {string} name - The name of the dish to retrieve.
 */
router.get("/api/dishes/:name", DishController.getDishByName);

/**
 * Route to create a new dish.
 * Calls the createDish method in the DishController.
 *
 * @body {object} dish - The details of the dish to be created.
 */
router.post("/api/dishes", DishController.createDish);

/**
 * Route to update an existing dish by its ID.
 * Calls the updateDish method in the DishController.
 *
 * @param {string} id - The ID of the dish to update.
 * @body {object} dish - The new details for the dish.
 */
router.put("/api/dishes/:id", DishController.updateDish);

/**
 * Route to delete a dish by its ID.
 * Calls the deleteDish method in the DishController.
 *
 * @param {string} id - The ID of the dish to delete.
 */
router.delete("/api/dishes/:id", DishController.deleteDish);
