const QuestionGroup = ({ title, name, options, value, onChange }) => {
  return (
    <div className="mb-6">
      <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center space-x-2 p-2 border rounded-md cursor-pointer ${
              value === option
                ? "border-blue-500 dark:border-blue-400"
                : "border-gray-300 dark:border-gray-700"
            } hover:bg-gray-50 dark:hover:bg-gray-800`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(name, e.target.value)}
              className="h-4 w-4 text-blue-500 focus:ring-blue-400 dark:focus:ring-blue-300"
            />
            <span className="text-gray-700 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
