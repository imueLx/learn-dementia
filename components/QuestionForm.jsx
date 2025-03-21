import React from "react";

const QuestionForm = ({ title, questions, answers, onChange, onNext }) => {
  const validate = () => questions.every((question) => answers[question.field]);

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-2xl">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {question.label}
            </label>

            {question.type === "select" ? (
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
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
                <FiChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              </div>
            ) : (
              <input
                type={question.type}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                onChange={(e) =>
                  onChange(
                    question.field,
                    question.type === "number"
                      ? parseInt(e.target.value, 10)
                      : e.target.value
                  )
                }
                value={answers[question.field] || ""}
                placeholder={`Enter ${question.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!validate()}
        className={`mt-8 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-medium transition-all
          ${
            validate()
              ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-sm hover:shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }`}
      >
        Continue
        <FiArrowRight
          className={`h-5 w-5 transition-transform ${
            validate() && "group-hover:translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default QuestionForm;
