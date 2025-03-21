"use client";

import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FiUser,
  FiBook,
  FiHeart,
  FiHome,
  FiAlertTriangle,
  FiX,
  FiRefreshCw,
  FiCircle,
  FiAlertCircle,
} from "react-icons/fi";

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

  const getRiskIcon = (score) => {
    if (score >= 27 && score <= 30) {
      return <FiCircle className="w-5 h-5 text-green-500" title="Low Risk" />;
    } else if (score >= 24 && score <= 26) {
      return (
        <FiCircle
          className="w-5 h-5 text-yellow-500"
          title="Low to Moderate Risk"
        />
      );
    } else if (score >= 18 && score <= 23) {
      return (
        <FiAlertCircle
          className="w-5 h-5 text-orange-500"
          title="Moderate to High Risk"
        />
      );
    } else {
      return (
        <FiAlertCircle className="w-5 h-5 text-red-600" title="High Risk" />
      );
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Cognitive Assessment Results
            </h1>
            <div className="inline-block bg-indigo-100 dark:bg-indigo-900/30 px-6 py-2 rounded-full text-indigo-600 dark:text-indigo-400 text-lg font-medium">
              Total Score: {totalScore}
            </div>
          </div>

          {/* Profile Section */}
          {profile && (
            <div className="mb-12 bg-gray-50 dark:bg-gray-900/30 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                <FiUser className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                Participant Profile
              </h2>
              {profile.nickname && (
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                  {profile.nickname}
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <FiBook className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>
                    <strong>Education:</strong> {profile.education}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <FiHeart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>
                    <strong>Gender:</strong> {profile.gender}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <FiHome className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>
                    <strong>Living Situation:</strong> {profile.livingSituation}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <FiUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>
                    <strong>Marital Status:</strong> {profile.maritalStatus}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Result Details */}
          <div className="space-y-12">
            <div className="bg-indigo-50/30 dark:bg-indigo-900/20 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Assessment Summary
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-2">
                    Cognitive Function
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {resultDetails.cognitiveFunction}
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-2">
                    Dementia Risk Assessment
                  </h3>
                  <div className="flex items-center gap-3">
                    {getRiskIcon(totalScore)}
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {resultDetails.dementiaRisk}
                    </p>
                  </div>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 mb-2">
                    Medical Recommendation
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {resultDetails.recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Score Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Score Range
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Cognitive Function
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Dementia Risk
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {[27, 24, 18, 0].map((score, idx) => {
                    const details = getResultDetails(score);
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/30"
                      >
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                          {score === 0 ? "0-17" : `${score}-${score + 3}`}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {details.cognitiveFunction}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {details.dementiaRisk}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {details.recommendation}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Graph Section */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Score Visualization
              </h3>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/sample_pictures/TotalScore.png"
                  alt="Score Visualization"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 text-center">
            <button
              onClick={handleRetakeTest}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl font-medium transition-all flex items-center gap-2 justify-center mx-auto hover:shadow-lg"
            >
              <FiRefreshCw className="w-5 h-5" />
              Retake Assessment
            </button>
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
                    Confirm Retake
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
                This will permanently delete your current assessment results.
                Are you sure you want to restart the assessment?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearLocalStorage}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiRefreshCw className="w-5 h-5" />
                  Confirm Retake
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
