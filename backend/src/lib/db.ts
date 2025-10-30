import mongoose, { mongo } from "mongoose";
import { config } from "../config/config";

mongoose.connect(config.DB_URL);

export const dbClient = () => {
    try {
        mongoose.connect(config.DB_URL);
        console.log("database connected");
    } catch(err) {
        console.error("database connection error", err);
    }
};