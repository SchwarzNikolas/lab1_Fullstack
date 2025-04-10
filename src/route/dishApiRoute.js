import express from "express";
import DishController from "../controller/DishController.js";

export const router = express.Router();

router.get("/api/dishes", DishController.getAllDishes);

router.get("/api/dishes/:name", DishController.getDishByName);

router.post("/api/dishes", DishController.createDish);

router.put("/api/dishes/:id", DishController.updateDish);

router.delete("/api/dishes/:id", DishController.deleteDish);
