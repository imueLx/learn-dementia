"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiAlertTriangle,
  FiInfo,
  FiX,
  FiImage,
  FiLoader,
} from "react-icons/fi";
import questions from "../data/questions";

const QuestionsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showImage, setShowImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQuestion = questions[0].questions[currentIndex];
  const router = useRouter();

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("answers"));
    const savedIndex = JSON.parse(localStorage.getItem("currentIndex"));
    if (savedAnswers) setAnswers(savedAnswers);
    if (savedIndex) setCurrentIndex(savedIndex);
  }, []);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  }, [answers, currentIndex]);

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  const handleAnswerChange = (score) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: score,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions[0].questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowImage(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowImage(false);
    }
  };

  const toggleImage = () => {
    setShowImage((prev) => !prev);
  };

  const progressPercentage = Math.round(
    ((currentIndex + 1) / questions[0].questions.length) * 100
  );

  const closeModal = () => setIsModalOpen(false);

  // Updated confirmSubmit function
  const confirmSubmit = async () => {
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    const totalScore = calculateTotalScore();
    const profile = JSON.parse(localStorage.getItem("profile"));

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          answers: Object.entries(answers).map(([questionId, score]) => ({
            questionId: Number(questionId),
            score,
            timestamp: new Date().toISOString(),
          })),
          totalScore,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      localStorage.removeItem("answers");
      localStorage.removeItem("currentIndex");
      router.push(`/results?score=${totalScore}`);
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-3xl min-h-[600px] max-h-[700px] flex flex-col">
        {/* Progress Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
            <span>Progress {progressPercentage}%</span>
            <span>
              Question {currentIndex + 1} of {questions[0].questions.length}
            </span>
          </div>
          <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow overflow-y-auto pr-4">
          <div className="flex items-start gap-3 mb-8">
            <FiInfo className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <span className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                Topic
              </span>
              {currentQuestion.guide.title}
            </h1>
          </div>

          <div className="space-y-8">
            {/* Question */}
            <div className="bg-indigo-50/30 dark:bg-indigo-900/20 p-6 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                <span className="text-indigo-600 dark:text-indigo-400">
                  Q{currentQuestion.id}.
                </span>{" "}
                {currentQuestion.question}
              </h2>

              {/* Instructions */}
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-2">
                    Instructions
                  </h3>
                  <ul className="list-disc space-y-2 pl-4 text-gray-700 dark:text-gray-300">
                    {currentQuestion.guide.instructions.map(
                      (instruction, index) => (
                        <li key={index} className="leading-relaxed">
                          {instruction}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Scoring Guide */}
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-2">
                    Scoring Criteria
                  </h3>
                  <ul className="list-disc space-y-2 pl-4 text-gray-700 dark:text-gray-300">
                    {currentQuestion.guide.scoring.map((rule, index) => (
                      <li key={index} className="leading-relaxed">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Toggle */}
            {currentQuestion.picture && (
              <div className="mt-6">
                <button
                  onClick={toggleImage}
                  className="flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                >
                  <FiImage className="w-5 h-5" />
                  {showImage ? "Hide Reference Image" : "Show Reference Image"}
                </button>
                {showImage && (
                  <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={currentQuestion.picture}
                      alt="Scoring Guide"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Score and Navigation */}
        <div className="flex-shrink-0 pt-8 border-t border-gray-100 dark:border-gray-700">
          {/* Scoring Buttons */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Select Score:
            </label>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                { length: currentQuestion.maxScore + 1 },
                (_, i) => i
              ).map((score) => (
                <button
                  key={score}
                  onClick={() => handleAnswerChange(score)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-medium transition-all
                    ${
                      answers[currentQuestion.id] === score
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                    }`}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors
                ${
                  currentIndex === 0
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
            >
              <FiArrowLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors
                ${
                  currentIndex === questions[0].questions.length - 1
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
              {currentIndex === questions[0].questions.length - 1 ? (
                <>
                  Finish Assessment
                  <FiCheck className="w-5 h-5" />
                </>
              ) : (
                <>
                  Next Question
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <FiAlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Confirm Submission
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
              You've answered {Object.keys(answers).length} out of{" "}
              {questions[0].questions.length} questions. Are you sure you want
              to submit your assessment?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={confirmSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-5 h-5" />
                    Confirm Submit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsComponent;
