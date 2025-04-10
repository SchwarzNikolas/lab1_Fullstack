import { errorHandler } from "../middleware/errorHandler.js";
import Dishes from "../model/Dishes.js";
import mongoose from "mongoose";

/**
 * Controller for handling requests related to dishes.
 * Provides methods for CRUD operations (Create, Read, Update, Delete).
 */
class DishController {

        /**
         * Retrieves all dishes from the database.
         *
         * @param {object} req - The Express request object.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getAllDishes(req, res, next){
                try {
                        // Fetch all dishes from the database
                        const dishes = await Dishes.find();
                        res.json(dishes); // Send the dishes as a JSON response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Retrieves a dish by its name from the database.
         *
         * @param {object} req - The Express request object, containing the dish name in params.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getDishByName(req, res, next){
                try {
                        // Search for dishes by name
                        const dishes = await Dishes.find({name: req.params.name});
                        if (dishes.length === 0){
                                errorHandler.notFound(req, res, next); // Handle 404 if no dish found
                                return;
                        }
                        res.json(dishes); // Send the found dishes as a JSON response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Creates a new dish in the database.
         *
         * @param {object} req - The Express request object, containing the new dish data in the body.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async createDish(req, res, next){
                try {
                        // Create a new dish from the request body
                        const dish = new Dishes(req.body);
                        // Check if a dish with the same name already exists
                        const sameTitle = await Dishes.find({name: req.body?.name});
                        if (sameTitle.length > 0){
                                errorHandler.duplicate(req, res, next); // Handle conflict if the dish already exists
                                return;
                        }
                        await dish.save(); // Save the new dish to the database
                        res.status(201).send(); // Send a 201 Created response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Updates an existing dish by its ID.
         *
         * @param {object} req - The Express request object, containing the dish ID in params and update data in the body.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async updateDish(req, res, next){
                try {
                        // Check if the provided ID is valid
                        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                                errorHandler.notFound(req, res, next); // Handle 404 if the ID is not valid
                                return;
                        }
                        // Check if the dish exists
                        const sameTitle = await Dishes.findById(req.params.id);
                        if (!sameTitle) {
                                errorHandler.notFound(req, res, next); // Handle 404 if the dish doesn't exist
                                return;
                        }
                        // Update the dish in the database
                        await Dishes.findByIdAndUpdate(req.params.id, req.body);
                        res.status(201).send(); // Send a 201 Created response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Deletes a dish by its ID from the database.
         *
         * @param {object} req - The Express request object, containing the dish ID in params.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async deleteDish(req, res, next){
                try {
                        // Check if the provided ID is valid
                        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                                errorHandler.notFound(req, res, next); // Handle 404 if the ID is not valid
                                return;
                        }
                        // Check if the dish exists
                        const sameTitle = await Dishes.findById(req.params.id);
                        if (!sameTitle) {
                                errorHandler.notFound(req, res, next); // Handle 404 if the dish doesn't exist
                                return;
                        }
                        // Delete the dish from the database
                        await Dishes.findByIdAndDelete(req.params.id);
                        res.status(204).send(); // Send a 204 No Content response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }
}

// Export an instance of the DishController to be used in other parts of the application
export default new DishController();

