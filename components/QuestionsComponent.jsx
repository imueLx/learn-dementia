"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import questions from "../data/questions";

const QuestionsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showImage, setShowImage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const confirmSubmit = () => {
    const totalScore = calculateTotalScore();
    router.push(`/results?score=${totalScore}`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl min-h-[600px] max-h-[700px] flex flex-col">
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
            aria-label={`Progress: ${progressPercentage}%`}
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow overflow-y-auto">
          <h1
            className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
            aria-live="polite"
          >
            Topic: {currentQuestion.guide.title}
          </h1>
          <p
            className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100"
            aria-label={`Question ${currentQuestion.id}`}
          >
            <span>{currentQuestion.id}. </span>
            {currentQuestion.question}
          </p>
          <h3 className="text-md font-bold text-gray-900 dark:text-gray-100">
            Instructions:
          </h3>
          <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100">
            {currentQuestion.guide.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <h3 className="text-md font-bold mt-4 text-gray-900 dark:text-gray-100">
            Scoring Guide:
          </h3>
          <ul className="list-disc pl-6 text-gray-900 dark:text-gray-100">
            {currentQuestion.guide.scoring.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          {currentQuestion.picture && (
            <div className="mt-4">
              <button
                onClick={toggleImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {showImage ? "Hide Image" : "Show Image"}
              </button>
              {showImage && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={currentQuestion.picture}
                    alt="Scoring Guide"
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Score and Buttons Section */}
        <div className="flex-shrink-0">
          <div className="mt-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
              htmlFor="score-buttons"
            >
              Score:
            </label>
            <div id="score-buttons" className="space-x-2">
              {Array.from(
                {
                  length:
                    currentQuestion.maxScore +
                    (currentQuestion.maxScore === 5 ? 0 : 1),
                },
                (_, i) => (currentQuestion.maxScore === 5 ? i + 1 : i)
              ).map((score) => (
                <button
                  key={score}
                  onClick={() => handleAnswerChange(score)}
                  className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    answers[currentQuestion.id] === score
                      ? "bg-blue-500 text-white focus:ring-blue-500"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100 focus:ring-gray-400"
                  }`}
                  aria-pressed={answers[currentQuestion.id] === score}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Go to previous question"
            >
              <AiOutlineArrowLeft />
              Back
            </button>
            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 ${
                currentIndex === questions[0].questions.length - 1
                  ? "bg-green-500 text-white focus:ring-green-500"
                  : "bg-blue-500 text-white focus:ring-blue-500"
              }`}
              aria-label={
                currentIndex === questions[0].questions.length - 1
                  ? "Finish questions"
                  : "Go to next question"
              }
            >
              {currentIndex === questions[0].questions.length - 1
                ? "Finish"
                : "Next"}
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto"
            role="dialog"
            aria-labelledby="modal-title"
            aria-hidden={!isModalOpen}
          >
            <h2
              id="modal-title"
              className="text-2xl text-gray-600 dark:text-gray-100 font-semibold mb-4"
            >
              Are you sure you want to Finish the Test?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={confirmSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Yes, Finish
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-red-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsComponent;
