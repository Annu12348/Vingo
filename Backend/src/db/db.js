import mongoose from "mongoose";
import { config } from "../config/config.js";
import debug from 'debug';
const debuglog = debug("development:mongoose")

console.log("MONGODB_URL:", config.MONGODB_URL);

function connectDataBase() {
    mongoose.connect(config.MONGODB_URL)
    .then (() => {
        console.log("connect the successfully mongodb")
    })
    .catch(error => {
        console.error(error)
    })
}

export default connectDataBase;