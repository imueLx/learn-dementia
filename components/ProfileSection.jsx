"use client";

import React, { useState, useEffect } from "react";
import QuestionGroup from "./QuestionGroup";

const ProfileSection = ({ onNext }) => {
  const [profile, setProfile] = useState({
    nickname: "",
    age: "",
    gender: "",
    maritalStatus: "",
    education: "",
    livingSituation: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleInputChange = (field, value) => {
    setProfile((prev) => {
      const updatedProfile = { ...prev, [field]: value };
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  const isFormComplete = Object.values(profile).every((value) => value !== "");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          Respondent's Profile
        </h1>

        <form className="space-y-8">
          {/* Nickname Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Nickname
            </label>
            <div className="relative">
              <input
                type="text"
                value={profile.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 transition-colors"
                placeholder="Enter preferred nickname"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Demographic Sections */}
          <div className="space-y-8">
            <QuestionGroup
              title="1.1 Age"
              name="age"
              options={[
                "60-69 years old",
                "70-79 years old",
                "80 years old and above",
              ]}
              value={profile.age}
              onChange={handleInputChange}
            />
            <hr className="border-t border-gray-100 dark:border-gray-700" />

            <QuestionGroup
              title="1.2 Gender"
              name="gender"
              options={["Male", "Female"]}
              value={profile.gender}
              onChange={handleInputChange}
            />
            <hr className="border-t border-gray-100 dark:border-gray-700" />

            <QuestionGroup
              title="1.3 Marital Status"
              name="maritalStatus"
              options={["Single", "Married", "Separated/Divorced", "Widowed"]}
              value={profile.maritalStatus}
              onChange={handleInputChange}
            />
            <hr className="border-t border-gray-100 dark:border-gray-700" />

            <QuestionGroup
              title="1.4 Educational Attainment"
              name="education"
              options={[
                "No formal education",
                "Elementary school",
                "High school graduate",
                "Vocational/technical education",
                "Some college, no degree",
                "Associate degree",
                "Bachelor's degree",
                "Postgraduate degree (Master's, Doctorate)",
              ]}
              value={profile.education}
              onChange={handleInputChange}
            />
            <hr className="border-t border-gray-100 dark:border-gray-700" />

            <QuestionGroup
              title="1.5 Living Situation"
              name="livingSituation"
              options={[
                "Lives alone",
                "Lives with immediate family",
                "Lives with extended family",
                "Lives in a communal setup/shared housing",
                "Homeless",
              ]}
              value={profile.livingSituation}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onNext}
              disabled={!isFormComplete}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                isFormComplete
                  ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-sm hover:shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Next Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSection;
