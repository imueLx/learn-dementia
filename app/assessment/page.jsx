"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  FaInfoCircle,
  FaQuestionCircle,
  FaClipboardList,
  FaUserCheck,
  FaStethoscope,
} from "react-icons/fa";

const Assessment = () => {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/profile"); // Navigate to the profile page
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-5xl text-center">
        <h1 className="text-4xl text-gray-700 dark:text-gray-100 font-bold mb-6">
          Dementia Assessment Guide for Nurses
        </h1>
        <a
          href="https://www.healthdirect.gov.au/mini-mental-state-examination-mmse"
          className="italic text-blue-500 dark:text-blue-400 underline-offset-4 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mini-Mental State Examination (MMSE){" "}
        </a>
        <br />
        <br />
        <div className="mb-8 text-left">
          <h2 className="text-2xl text-gray-700 dark:text-gray-100 font-semibold mb-4">
            How to Use This Tool
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-4">
            <li className="flex items-start space-x-2">
              <FaQuestionCircle className="text-blue-500 mt-1 text-2xl" />
              <span>
                Ask the patient the questions provided on the following screens.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <FaClipboardList className="text-blue-500 mt-1 text-2xl" />
              <span>
                Record their answers accurately in the fields provided.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <FaUserCheck className="text-blue-500 mt-1 text-2xl" />
              <span>
                Ensure a comfortable environment to help the patient answer
                clearly.
              </span>
            </li>
          </ul>
        </div>
        <div className="mb-8 text-center">
          <div className="border border-blue-500 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
            <FaInfoCircle className="text-blue-500 text-4xl mb-2 mx-auto" />
            <p className="text-gray-600 dark:text-gray-300 italic">
              <span className="text-red-500 font-bold">NOTE:</span> This
              questionnaire is a simplified adaptation of the Mini-Mental State
              Examination (MMSE), a standardized assessment tool for cognitive
              functioning, modified for use in a nursing practice setting and
              for thesis research purposes. The adaptation focuses on dementia
              risk assessment, aiming to improve accessibility and ease of use
              for both nurses and study participants.
            </p>
          </div>
        </div>
        <button
          onClick={handleProceed}
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
};

export default Assessment;
