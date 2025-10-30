import mongoose, { Types } from "mongoose";
import { config } from "../src/config/config";

mongoose.connect(config.DB_URL);

interface IUsers{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    image?: string;
    created_at: Date;
    updated_at: Date;
    role: "student" | "teacher" | "admin";
    data: any;
}

const usersSchema = new mongoose.Schema<IUsers>({
    id: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
        required: true,
    },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
})

const usersModel = mongoose.model<IUsers>("Users", usersSchema);