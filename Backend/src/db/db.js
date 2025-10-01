import mongoose from "mongoose";
import { config } from "../config/config.js";
import debug from 'debug';
const debuglog = debug("development:mongoose")

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