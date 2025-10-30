import mongoose, { Types } from "mongoose";
import { config } from "../src/config/config";

mongoose.connect(config.DB_URL);

interface ISubscriptions{
    id: string;
    student_id: string;
    exam_id: string;
    questions: IQuestions[];
}

interface IQuestions{
    question_id: string;
    responses: IResponses;
}

interface IResponses{
    answer_id: string;
}

const responsesSchema = new mongoose.Schema<IResponses>({
    answer_id: { type: String, required: true},
})

const questionsSchema = new mongoose.Schema<IQuestions>({
    question_id: { type: String, required: true},
    responses: responsesSchema,
})

const subscriptionsSchema = new mongoose.Schema<ISubscriptions>({
    id: { type: String, required: true},
    student_id: { type: String, required: true},
    exam_id: { type: String, required: true},
    questions: [questionsSchema],
});

const subscriptionsModel = mongoose.model<ISubscriptions>("Subscriptions", subscriptionsSchema);