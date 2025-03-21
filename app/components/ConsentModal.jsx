"use client";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const ConsentModal = ({ onAccept, onClose }) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");

  const handleAccept = () => {
    if (!consentGiven) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAccept();
    }, 500);
  };

  const consentText = {
    english: {
      title: "Consent Form (English)",
      body1:
        "This assessment aims to evaluate cognitive function to identify early signs of dementia.",
      body2:
        'By clicking the "I Consent" button below, I understand the purpose of this assessment and acknowledge that a website will be used to administer, record, and summarize the assessment using the Mini-Mental State Examination (MMSE). I voluntarily consent to participate and understand that my responses will be kept confidential and anonymous.',
      checkbox: "I Consent to Participate",
      confirmText:
        "Please check the box to confirm you have read and understood the consent terms in English.",
    },
    tagalog: {
      title: "Consent Form (Tagalog)",
      body1:
        "Ang pagtatasa na ito ay naglalayong subukin ang pag-iisip upang makilala ang mga unang senyales ng Dementia.",
      body2:
        'Sa pamamagitan ng pag-click sa button na "Sumasang-ayon" sa ibaba, naiintindihan ko ang layunin ng pagtatasang ito at kinikilala ko na ang isang website ay gagamitin upang magsagawa, mag-record, at mag-summarize ng pagtataya gamit ang Mini-Mental State Examination (MMSE). Sumasang-ayon ako na makibahagi nang kusang-loob at naiintindihan ko na ang aking mga tugon ay panatilihin na lihim at walang pangalan.',
      checkbox: "Sumasang-ayon Ako na Makibahagi",
      confirmText:
        "Mangyaring i-check ang box upang kumpirmahin na nabasa at naintindihan mo ang mga tuntunin ng pahintulot sa Tagalog.",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Consent Form
        </h2>
        {/* Language Selector */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setLanguage("english")}
            className={`px-4 py-2 rounded-md ${
              language === "english"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("tagalog")}
            className={`px-4 py-2 rounded-md ${
              language === "tagalog"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            Tagalog
          </button>
        </div>
        <div className="text-left space-y-6 text-gray-700 dark:text-gray-300 text-sm">
          <div>
            <h3 className="font-semibold mb-2">
              {consentText[language].title}
            </h3>
            <p>{consentText[language].body1}</p>
            <p className="mt-2">{consentText[language].body2}</p>
          </div>
        </div>
        <div className="mt-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={() => setConsentGiven(!consentGiven)}
              className="h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-900 dark:text-gray-100">
              {consentText[language].checkbox}
            </span>
          </label>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
            {consentText[language].confirmText}
          </p>
        </div>
        <button
          onClick={handleAccept}
          disabled={!consentGiven || loading}
          className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-bold flex items-center justify-center space-x-2 ${
            consentGiven
              ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
              : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
          }`}
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <FaCheckCircle />
              <span>Accept & Continue</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConsentModal;
