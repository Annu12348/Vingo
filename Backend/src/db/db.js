import mongoose from "mongoose";
import { config } from "../config/config.js";
import debug from 'debug';
const debuglog = debug("development:mongoose")

function connectDataBase() {
    mongoose.connect(config.MONGODB_URL)
    .then (() => {
        debuglog("connect the successfully mongodb")
    })
    .catch(error => {
        debuglog(error)
    })
}

export default connectDataBase;