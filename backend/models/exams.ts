import mongoose, { Types } from "mongoose";
import { config } from "../src/config/config";

mongoose.connect(config.DB_URL);

interface IExams {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;//?? created_by: ObjectId(""), //id del docente che fa l'esame
    schedule_date: Date;
    max_time: number;
    questions: IQuestions[];
}

interface IQuestions {
    id: string,
    text: string, //ci va la domanda reale?
    type: string, //multiple choice??
    answers: IAnswers[],
}

interface IAnswers {
    id: string,
    answer: string, //ci va la risposta reale?
    isCorrect: boolean,
}

const answersSchema = new mongoose.Schema<IAnswers>({
    id: { type: String, required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
});

const questionsSchema = new mongoose.Schema<IQuestions>({
    id: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    answers: [answersSchema]
});

const examsSchema = new mongoose.Schema<IExams>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String, required: true },
    schedule_date: { type: Date, default: Date.now },
    max_time: { type: Number, default: 90 },
    questions: [questionsSchema],
})

const examsModel = mongoose.model<IExams>("Exams", examsSchema);