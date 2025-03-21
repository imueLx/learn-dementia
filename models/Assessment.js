import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const assessmentSchema = new mongoose.Schema({
  profile: { type: Object, required: true },
  answers: [answerSchema],
  totalScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists before creating it
const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);

export default Assessment;
