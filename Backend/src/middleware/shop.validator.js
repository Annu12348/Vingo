import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

export const shopValidator = [
  body("shopName")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("name must be between 3 and 30 characters"),

    
  body("city")
    .notEmpty()
    .withMessage("city is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("city must be between 2 and 50 characters"),

  body("state")
    .notEmpty()
    .withMessage("state is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("state must be between 2 and 50 characters"),

  body("address")
    .notEmpty()
    .withMessage("address is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("address must be between 5 and 100 characters"),
    
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 5, max: 500 })
    .withMessage("description must be between 5 and 500 characters"),
  
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isString()
    .withMessage("category must be a string")
    .isIn([
      "North Indian",
      "South Indian",
      "Chinese",
      "Fast Food",
      "Street Food",
      "Pizza",
      "Burger",
      "Biryani",
      "Cafe",
      "Bakery",
      "Desserts",
      "Beverages",
      "Pure Veg",
      "Non Veg",
      "Multi Cuisine"
    ])
    .withMessage("category must be one of the valid categories"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
