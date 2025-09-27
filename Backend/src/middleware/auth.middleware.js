import jwt from "jsonwebtoken";
import { config } from "../config/config";
import userModel from "../models/user.models";

export const authenticationMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized access" 
            })
        }

        const user = await userModel.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(404).json({
                message: "User not found, please login again."
            });
        }

        // Haan, ye sahi hai. decoded.userId ko req.userId me assign karna sahi hai taki aage ke middleware ya route handlers me user ki pehchaan ho sake.
        req.user = user;

        next()
    } catch (error) {}
}