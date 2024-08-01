import mongoose from "mongoose";
const quesSchema = mongoose.Schema(
    {
        quizTypeUrl: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                },
                options: [
                    {
                        type: String,
                        required: true,
                    },
                ],
                correct: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);
export const Questions = mongoose.model("Questions", quesSchema);
