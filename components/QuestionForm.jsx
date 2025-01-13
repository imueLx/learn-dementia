import React from "react";

const QuestionForm = ({ title, questions, answers, onChange, onNext }) => {
  const validate = () => {
    for (const question of questions) {
      if (!answers[question.field]) return false;
    }
    return true;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700">
              {question.label}
            </label>
            {question.type === "select" ? (
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                onChange={(e) => onChange(question.field, e.target.value)}
                value={answers[question.field] || ""}
              >
                <option value="">Select an option</option>
                {question.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={question.type}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  onChange(question.field, parseInt(e.target.value, 10))
                }
                value={answers[question.field] || ""}
              />
            )}
          </div>
        ))}
      </div>
      <button
        className={`mt-6 py-2 px-4 rounded-lg ${
          validate()
            ? "bg-blue-500 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={() => validate() && onNext()}
        disabled={!validate()}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionForm;
