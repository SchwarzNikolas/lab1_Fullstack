import { errorHandler } from "../middleware/errorHandler.js";
import Dishes from "../model/Dishes.js";
import mongoose from "mongoose";

class DishController {

        async getAllDishes(req, res, next){
                try {
                        const dishes = await Dishes.find();
                        res.json(dishes);
                } catch (err) {
                        next(err);
                }

        }

        async getDishByName(req, res, next){
                try {
                        const dishes = await Dishes.find({name: req.params.name});
                        if (dishes.length === 0){
                                errorHandler.notFound(req, res, next);
                                return;
                        }
                        res.json(dishes);
                } catch (err) {
                        next(err);
                }
        }

        async createDish(req, res, next){
                try {
                        const dish = new Dishes(req.body);
                        const sameTitle = await Dishes.find({name: req.body?.name});
                        if (sameTitle.length > 0){
                                errorHandler.duplicate(req, res, next);
                                return;
                        }
                        await dish.save();
                        res.status(201).send();
                } catch (err) {
                        next(err);
                }

        }

        async updateDish(req, res, next){
                try {
                        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                                errorHandler.notFound(req, res, next);
                                return;
                        }
                        const sameTitle = await Dishes.findById(req.params.id);
                        if (!sameTitle) {
                                errorHandler.notFound(req, res, next);
                                return;
                        }
                        await Dishes.findByIdAndUpdate(req.params.id, req.body);
                        res.status(201).send();
                } catch (err) {
                        next(err);
                }
        }

        async deleteDish(req, res, next){
                try {
                        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
                                errorHandler.notFound(req, res, next);
                                return;
                        }
                        const sameTitle = await Dishes.findById(req.params.id);
                        if (!sameTitle) {
                                errorHandler.notFound(req, res, next);
                                return;
                        }
                        await Dishes.findByIdAndDelete(req.params.id)
                        res.status(204).send();
                } catch (err) {
                        next(err);
                }

        }
}

export default new DishController();
