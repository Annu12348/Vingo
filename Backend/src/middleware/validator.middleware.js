import mongoose from "mongoose";
import { body, validationResult } from "express-validator"

export const registerValidator =  [
  body("fullname")
    .notEmpty()
    .withMessage("fullname is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("fullname must be between 3 and 30 characters"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Email is not valid"),

  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact must be between 10 and 15 characters"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("password must be between 3 and 30 characters"),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    next()
  },
];
