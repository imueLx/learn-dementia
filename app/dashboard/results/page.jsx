"use client";
import { useEffect, useState } from "react";
import { FaEye, FaTrash, FaSpinner } from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/results");
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setAssessments(result.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );

  return (
    <div className="container mx-auto p-6 dark:bg-gray-800">
      <div className="bg-white darK:bg-gray-700 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Assessment Results
        </h1>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table headers remain the same */}
            <tbody className="bg-white divide-y divide-gray-200">
              {assessments.map((assessment) => (
                <tr key={assessment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(assessment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assessment.profile?.nickname || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {assessment.profile?.age || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {assessment.totalScore}/30
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <Link
                      href={`/admin/results/${assessment._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEye className="inline-block mr-1" /> View
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(assessment._id)}
                    >
                      <FaTrash className="inline-block mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
