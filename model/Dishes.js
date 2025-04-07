import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  preparationSteps: [String],
  cookingTime: Number,
  origin: String,
  difficulty: String,
});

const Dishes = mongoose.model("dishes", dishSchema);

export default Dishes;

