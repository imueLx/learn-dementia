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
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          This tool helps nurses perform a preliminary cognitive assessment for
          patients. It is based on a scientific study but is not intended to
          provide a definitive diagnosis. Use this as a reference, and always
          consult with a healthcare professional for a comprehensive evaluation.
        </p>
        <div className="mb-8 text-left">
          <h2 className="text-2xl text-gray-700 dark:text-gray-100 font-semibold mb-4">
            How to Use This Tool
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-4">
            <li className="flex items-start space-x-2">
              <FaQuestionCircle className="text-blue-500 mt-1" />
              <span>
                Ask the patient the questions provided on the following screens.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <FaClipboardList className="text-blue-500 mt-1" />
              <span>
                Record their answers accurately in the fields provided.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <FaUserCheck className="text-blue-500 mt-1" />
              <span>
                Ensure a comfortable environment to help the patient answer
                clearly.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <FaStethoscope className="text-blue-500 mt-1" />
              <span>
                Use the results as part of your overall assessment, and do not
                rely on this tool alone for clinical decisions.
              </span>
            </li>
          </ul>
        </div>
        <div className="mb-8 text-center">
          <FaInfoCircle className="text-blue-500 text-4xl mb-2 mx-auto" />
          <p className="text-gray-600 dark:text-gray-300">
            Remember: This assessment is only a reference. Always involve a
            doctor or specialist for a full diagnosis.
          </p>
        </div>
        <button
          onClick={handleProceed}
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Proceed to Test
        </button>
      </div>
    </div>
  );
};

export default Assessment;
