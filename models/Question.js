import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  scoring: {
    type: [String],
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  guide: {
    type: guideSchema,
    required: true,
  },
  pictures: [
    {
      type: String,
    },
  ],
});

const QuestionSetSchema = new mongoose.Schema({
  questions: [questionSchema],
  totalScore: {
    maximum: {
      type: Number,
      required: true,
    },
    minimum: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.models.QuestionSet ||
  mongoose.model("QuestionSet", QuestionSetSchema);
