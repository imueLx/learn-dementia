// components/QuestionGroup.jsx
import { FiChevronRight } from "react-icons/fi";

export default function QuestionGroup({
  title,
  options,
  value,
  onChange,
  name,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors 
              ${
                value === option
                  ? "border-blue-500 bg-blue-50"
                  : "hover:border-blue-300"
              }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(name, option)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-3 text-gray-700">{option}</span>
            <FiChevronRight className="ml-auto text-gray-400" />
          </label>
        ))}
      </div>
    </div>
  );
}
