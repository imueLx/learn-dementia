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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Respondent's Profile
        </h1>
        <form className="space-y-8">
          {/* Nickname Input */}
          <div className="mb-6">
            <label
              htmlFor="nickname"
              className="block text-lg font-semibold mb-2"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={profile.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Other Questions */}
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
          <QuestionGroup
            title="1.2 Gender"
            name="gender"
            options={["Male", "Female"]}
            value={profile.gender}
            onChange={handleInputChange}
          />
          <QuestionGroup
            title="1.3 Marital Status"
            name="maritalStatus"
            options={["Single", "Married", "Separated/Divorced", "Widowed"]}
            value={profile.maritalStatus}
            onChange={handleInputChange}
          />
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
        </form>
        <div className="mt-8">
          <button
            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-bold ${
              isFormComplete
                ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
                : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
