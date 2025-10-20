import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const itemValidator = [
  body("foodName")
    .notEmpty()
    .withMessage("foodName is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("foodName must be between 3 and 30 characters"),

  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isIn([
      "Snacks",
      "Main Course",
      "Desserts",
      "Pizza",
      "Burgers",
      "Sandwiches",
      "South Indian",
      "North Indian",
      "Chinese",
      "Fast Food",
      "Others",
    ])
    .withMessage("Invalid category"),

  body("foodType")
    .notEmpty()
    .withMessage("foodType is required")
    .isIn(["Veg", "Non-Veg", "Vegan"])
    .withMessage("Invalid foodType"),

  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),

  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    } else {
        next()
    }
  }  
];
