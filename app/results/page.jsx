"use client";

import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalScore = parseInt(searchParams.get("score"), 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const getResultDetails = (score) => {
    if (score >= 27 && score <= 30) {
      return {
        cognitiveFunction: "Normal",
        dementiaRisk: "Low",
        recommendation: "Routine cognitive health monitoring.",
      };
    } else if (score >= 24 && score <= 26) {
      return {
        cognitiveFunction: "Mild Cognitive Impairment (Possible)",
        dementiaRisk: "Low to Moderate",
        recommendation:
          "Consider follow-up assessment with a primary care physician or geriatric specialist to monitor cognitive function.",
      };
    } else if (score >= 18 && score <= 23) {
      return {
        cognitiveFunction: "Moderate Cognitive Impairment",
        dementiaRisk: "Moderate to High",
        recommendation:
          "Referral to a neurologist or geriatrician is strongly recommended for comprehensive neuropsychological evaluation to determine the etiology of cognitive decline.",
      };
    } else {
      return {
        cognitiveFunction: "Severe Cognitive Impairment",
        dementiaRisk: "High",
        recommendation:
          "Urgent referral to a healthcare professional is necessary for immediate assessment and management.",
      };
    }
  };

  const handleRetakeTest = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleClearLocalStorage = () => {
    // Clear all relevant local storage data
    localStorage.removeItem("answers");
    localStorage.removeItem("currentIndex");
    localStorage.removeItem("profile");

    // Redirect to the first question page
    router.push("/assessment");
  };

  const resultDetails = getResultDetails(totalScore);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Results
          </h1>

          {/* Profile Section */}
          {profile && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Patient's Profile
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Nickname:</strong> {profile.nickname}
                </li>
                <li>
                  <strong>Education:</strong> {profile.education}
                </li>
                <li>
                  <strong>Gender:</strong> {profile.gender}
                </li>
                <li>
                  <strong>Living Situation:</strong> {profile.livingSituation}
                </li>
                <li>
                  <strong>Marital Status:</strong> {profile.maritalStatus}
                </li>
              </ul>
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Total Score: {totalScore}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Based on your score, here is the assessment of your cognitive
              function and corresponding recommendation:
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Cognitive Function:
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {resultDetails.cognitiveFunction}
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Dementia Risk Assessment:
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {resultDetails.dementiaRisk}
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Recommendation:
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {resultDetails.recommendation}
            </p>
          </div>

          <div className="mb-10 overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Score Interpretation Table:
            </h3>
            <table className="table-auto w-full border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left">
                    Score Range
                  </th>
                  <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left">
                    Cognitive Function
                  </th>
                  <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left">
                    Dementia Risk
                  </th>
                  <th className="border px-4 py-2 bg-gray-200 dark:bg-gray-700 text-left">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">27-30</td>
                  <td className="border px-4 py-2">Normal</td>
                  <td className="border px-4 py-2">Low</td>
                  <td className="border px-4 py-2">
                    Routine cognitive health monitoring.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">24-26</td>
                  <td className="border px-4 py-2">
                    Mild Cognitive Impairment (Possible)
                  </td>
                  <td className="border px-4 py-2">Low to Moderate</td>
                  <td className="border px-4 py-2">
                    Consider follow-up assessment with a primary care physician
                    or geriatric specialist to monitor cognitive function.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">18-23</td>
                  <td className="border px-4 py-2">
                    Moderate Cognitive Impairment
                  </td>
                  <td className="border px-4 py-2">Moderate to High</td>
                  <td className="border px-4 py-2">
                    Referral to a neurologist or geriatrician is strongly
                    recommended for comprehensive neuropsychological evaluation
                    to determine the etiology of cognitive decline.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">0-17</td>
                  <td className="border px-4 py-2">
                    Severe Cognitive Impairment
                  </td>
                  <td className="border px-4 py-2">High</td>
                  <td className="border px-4 py-2">
                    Urgent referral to a healthcare professional is necessary
                    for immediate assessment and management.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Graph Section */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Graph of Your Score:
            </h3>
            <div className="flex justify-center">
              <Image
                src="/sample_pictures/TotalScore.png"
                alt="Graph of Your Score"
                className="mt-4 rounded-lg shadow-lg max-w-full h-auto"
                width={800}
                height={400}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleRetakeTest}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Retake Test
            </button>
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
                Are you sure you want to Retake the assessment?
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={handleClearLocalStorage}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Yes, Retake
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
    </Suspense>
  );
};

export default ResultsPage;
