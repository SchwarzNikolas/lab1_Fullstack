import mongoose from "mongoose";

// Define the schema for the 'Dish' model in MongoDB
const dishSchema = new mongoose.Schema({
        name: {type: String,
                unique: true},
        ingredients: [String],
        preparationSteps: [String],
        cookingTime: Number,
        origin: String,
        difficulty: String,
});

// Create a Mongoose model using the dish schema
const Dishes = mongoose.model("dishes", dishSchema);

// Export the Dishes model to be used in other parts of the application
export default Dishes;
