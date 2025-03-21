// components/LoadingSpinner.jsx
import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );
}
