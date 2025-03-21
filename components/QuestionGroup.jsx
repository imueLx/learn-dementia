import {
  FiCheckCircle,
  FiCircle,
  FiChevronDown,
  FiArrowRight,
  FiInfo,
} from "react-icons/fi";

// Enhanced QuestionGroup Component
const QuestionGroup = ({ title, name, options, value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FiInfo className="text-indigo-600 dark:text-indigo-400 shrink-0" />
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`relative flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer
              ${
                value === option
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 dark:border-indigo-400"
                  : "border-gray-200 hover:border-indigo-200 dark:border-gray-700 dark:hover:border-indigo-800"
              }`}
          >
            {value === option ? (
              <FiCheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            ) : (
              <FiCircle className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
            )}
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(name, e.target.value)}
              className="absolute opacity-0 -z-1"
            />
            <span className="text-gray-700 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
