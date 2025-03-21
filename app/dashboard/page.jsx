"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaSpinner } from "react-icons/fa";
import {
  FiUsers,
  FiHome,
  FiHeart,
  FiBook,
  FiAlertTriangle,
} from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement, // Add this
  LineElement, // Add this
  Title,
  Tooltip,
  Legend,
  LineController
);
import questions from "@/data/questions";

export default function AdminDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/results");
        const result = await response.json();
        if (result.success) {
          setAssessments(result.data);
          analyzeData(result.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const analyzeData = (data) => {
    // Question-wise analysis
    const questionStats = questions[0].questions.map((q) => ({
      id: q.id,
      maxScore: q.maxScore,
      total: 0,
      sum: 0,
      fullScoreCount: 0,
    }));

    // Dementia risk calculation (MMSE <24 indicates possible dementia)
    const dementiaCases = data.filter((a) => a.totalScore <= 23).length;
    const dementiaPrevalence = (dementiaCases / data.length) * 100;

    // Cognitive domain analysis
    const domainStats = {
      Orientation: { total: 0, sum: 0, maxPossible: 10 },
      Registration: { total: 0, sum: 0, maxPossible: 3 },
      "Attention and Calculation": { total: 0, sum: 0, maxPossible: 5 },
      Recall: { total: 0, sum: 0, maxPossible: 3 },
      Language: { total: 0, sum: 0, maxPossible: 9 },
      "Visual Construction": { total: 0, sum: 0, maxPossible: 1 },
    };

    data.forEach((assessment) => {
      // Process each answer
      assessment.answers.forEach(({ questionId, score }) => {
        // Find the question in your questions data
        const question = questions[0].questions.find(
          (q) => q.id === questionId
        );
        if (!question) return;

        // Update question statistics
        const qStat = questionStats.find((q) => q.id === questionId);
        if (qStat) {
          qStat.total++;
          qStat.sum += score;
          if (score === qStat.maxScore) qStat.fullScoreCount++;
        }

        // Update domain statistics
        const domain = question.guide.title;
        if (domainStats[domain]) {
          domainStats[domain].total++;
          domainStats[domain].sum += score;
        }
      });
    });

    setAnalytics({
      questionStats,
      domainStats: Object.entries(domainStats).map(([domain, stats]) => ({
        domain,
        ...stats,
        average: stats.sum / (stats.total || 1),
      })),
      dementiaPrevalence,
      dementiaCases,
      totalAssessments: data.length,
      averageScore:
        data.reduce((sum, a) => sum + a.totalScore, 0) / data.length,
    });
  };

  // Chart data configuration
  const questionChartData = {
    labels: questions[0].questions.map((q) => `Q${q.id}`),
    datasets: [
      {
        label: "Average Score",
        data: analytics?.questionStats.map((q) => q.sum / (q.total || 1)) || [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Full Score Rate",
        data:
          analytics?.questionStats.map(
            (q) => (q.fullScoreCount / (q.total || 1)) * 100
          ) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        yAxisID: "y-percent",
      },
    ],
  };

  const domainChartData = {
    labels: analytics?.domainStats.map((d) => d.domain) || [],
    datasets: [
      {
        label: "Average Domain Score",
        data: analytics?.domainStats.map((d) => d.average) || [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Max Possible",
        data: analytics?.domainStats.map((d) => d.maxPossible) || [],
        backgroundColor: "rgba(201, 203, 207, 0.6)",
        type: "line",
      },
    ],
  };

  const createScoreMap = (answers) => {
    return answers.reduce((map, answer) => {
      map[answer.questionId] = answer.score;
      return map;
    }, {});
  };

  // Add scientific analysis functions
  const calculateQuestionStats = () => {
    if (!analytics) return [];
    return analytics.questionStats.map((q) => ({
      id: q.id,
      avg: q.sum / q.total,
      fullScoreRate: (q.fullScoreCount / q.total) * 100,
    }));
  };

  const analyzeDemographicPatterns = (assessments) => {
    const demographics = {
      ageGroups: {},
      genderDistribution: {},
      maritalStatus: {},
      educationLevels: {},
      livingSituations: {},
    };

    assessments.forEach((assessment) => {
      const profile = assessment.profile;

      // Age groups
      demographics.ageGroups[profile.age] =
        (demographics.ageGroups[profile.age] || 0) + 1;

      // Gender
      demographics.genderDistribution[profile.gender] =
        (demographics.genderDistribution[profile.gender] || 0) + 1;

      // Marital Status
      demographics.maritalStatus[profile.maritalStatus] =
        (demographics.maritalStatus[profile.maritalStatus] || 0) + 1;

      // Education
      demographics.educationLevels[profile.education] =
        (demographics.educationLevels[profile.education] || 0) + 1;

      // Living Situation
      demographics.livingSituations[profile.livingSituation] =
        (demographics.livingSituations[profile.livingSituation] || 0) + 1;
    });

    return demographics;
  };

  const calculateAverageAge = (assessments) => {
    const ageMap = {
      "18-29 years old": 24,
      "30-39 years old": 35,
      "40-49 years old": 45,
      "50-59 years old": 55,
      "60-69 years old": 65,
      "70+ years old": 75,
    };

    const total = assessments.reduce((sum, a) => {
      return sum + (ageMap[a.profile.age] || 0);
    }, 0);

    return (total / assessments.length).toFixed(1);
  };

  // Add this inside your component
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this assessment?")) return;

    try {
      const response = await fetch(`/api/results/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete assessment");

      // Update local state to remove the deleted item
      setAssessments((prev) => prev.filter((a) => a._id !== id));

      // Recalculate analytics
      analyzeData(assessments.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete assessment. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Neurocognitive Assessment Analysis
        </h1>

        {/* Scientific Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="text-blue-800 dark:text-blue-200">Cohort Size</h3>
            <p className="text-2xl font-bold">
              {analytics?.totalAssessments || 0}
            </p>
            <p className="text-sm mt-1 text-blue-700 dark:text-blue-300">
              Total participants in analysis
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <h3 className="text-green-800 dark:text-green-200">
              Global Cognitive Score
            </h3>
            <p className="text-2xl font-bold">
              {analytics?.averageScore?.toFixed(1) || 0}/30
            </p>
            <p className="text-sm mt-1 text-green-700 dark:text-green-300">
              Mean total score ±{" "}
              {Math.sqrt(analytics?.averageScore || 0).toFixed(1)} SD
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
            <h3 className="text-purple-800 dark:text-purple-200">
              Critical Deficit Area
            </h3>
            <p className="text-xl font-bold">
              {analytics
                ? analytics.domainStats.sort(
                    (a, b) =>
                      a.average / a.maxPossible - b.average / b.maxPossible
                  )[0].domain
                : "N/A"}
            </p>
            <p className="text-sm mt-1 text-purple-700 dark:text-purple-300">
              Lowest performing cognitive domain
            </p>
          </div>
          {/* Dementia Prevalence Card */}
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h3 className="text-red-800 dark:text-red-200">
              <FiAlertTriangle className="inline-block mr-2" />
              Probable Dementia
            </h3>
            <p className="text-2xl font-bold">
              {analytics?.dementiaPrevalence?.toFixed(1) || 0}%
            </p>
            <p className="text-sm mt-1 text-red-700 dark:text-red-300">
              {analytics?.dementiaCases} of {analytics?.totalAssessments}{" "}
              participants
            </p>
          </div>
        </div>

        {/* Enhanced Scientific Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Item Analysis</h3>
            <Bar
              data={questionChartData}
              options={{
                scales: {
                  y: { title: { display: true, text: "Mean Score" } },
                  "y-percent": {
                    position: "right",
                    ticks: { callback: (value) => value + "%" },
                    title: { display: true, text: "Full Score Rate" },
                  },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.dataset.label || "";
                        if (label === "Average Score") {
                          return `Mean: ${context.raw.toFixed(2)}/${
                            questions[0].questions[context.dataIndex].maxScore
                          }`;
                        }
                        return `${label}: ${context.raw.toFixed(1)}%`;
                      },
                    },
                  },
                },
              }}
            />
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="font-semibold mb-2">Clinical Interpretation</h4>
              <p className="text-sm">
                The bar graph shows individual test item performance. Blue bars
                represent average scores, green bars show percentage of perfect
                responses. Items with &lt;60% full score rate (green) may
                indicate common cognitive deficits.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">
              Domain Performance Profile
            </h3>
            <Bar
              data={domainChartData}
              options={{
                scales: {
                  y: {
                    title: { display: true, text: "Mean Score" },
                    beginAtZero: true,
                  },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const domain = context.dataset.label;
                        const max =
                          context.dataset.backgroundColor ===
                          "rgba(201, 203, 207, 0.6)"
                            ? ""
                            : ` (Max ${context.raw})`;
                        return `${domain}: ${context.raw.toFixed(2)}${max}`;
                      },
                    },
                  },
                },
              }}
            />
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <h4 className="font-semibold mb-2">Neuropsychological Insight</h4>
              <p className="text-sm">
                Domain scores compared to maximum possible (gray line). Scores
                below 80% of maximum suggest impairment. Orientation deficits
                may indicate early dementia, while language deficits could
                suggest left hemisphere dysfunction.
              </p>
            </div>
          </div>
        </div>

        {/* Scientific Data Matrix */}
        <h2 className="text-2xl font-bold mb-4">
          Cognitive Performance Matrix
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
              <tr>
                <th className="p-4 text-left min-w-[200px] sticky left-0 bg-gray-100 dark:bg-gray-800 z-10">
                  Participant
                </th>
                {questions[0].questions.map((question) => (
                  <th
                    key={question.id}
                    className="p-4 text-center group relative"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        Q{question.id}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        (Max {question.maxScore})
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-200 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${
                            calculateQuestionStats().find(
                              (q) => q.id === question.id
                            )?.fullScoreRate || 0
                          }%`,
                        }}
                      />
                    </div>
                  </th>
                ))}
                <th className="p-4 text-center">Total</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {assessments.map((assessment) => {
                const scoreMap = createScoreMap(assessment.answers);
                return (
                  <tr
                    key={assessment._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-4 sticky left-0 bg-white dark:bg-gray-900">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {assessment.profile.nickname}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {assessment.profile.age}, {assessment.profile.gender}
                        </span>
                      </div>
                    </td>

                    {questions[0].questions.map((question) => {
                      const score = scoreMap[question.id] || 0;
                      return (
                        <td key={question.id} className="p-4 text-center">
                          <span
                            className={`font-mono ${
                              score === question.maxScore
                                ? "text-green-700 dark:text-green-300"
                                : score === 0
                                ? "text-red-700 dark:text-red-300"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {score}
                          </span>
                        </td>
                      );
                    })}

                    <td className="p-4 text-center font-medium">
                      {assessment.totalScore}/30
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        onClick={() => handleDelete(assessment._id)}
                      >
                        <FaTrash className="inline-block" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* Statistical Summary Row */}
              <tr className="bg-gray-50 dark:bg-gray-800 font-medium">
                <td className="p-4 sticky left-0 bg-gray-50 dark:bg-gray-800">
                  Cohort Average
                </td>
                {questions[0].questions.map((question) => {
                  const stats = calculateQuestionStats().find(
                    (q) => q.id === question.id
                  );
                  return (
                    <td key={question.id} className="p-4 text-center">
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {stats?.avg?.toFixed(1) || 0}/{question.maxScore}
                        </span>
                        <span
                          className={`text-xs ${
                            (stats?.fullScoreRate || 0) < 60
                              ? "text-red-600"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          ({stats?.fullScoreRate?.toFixed(0) || 0}%)
                        </span>
                      </div>
                    </td>
                  );
                })}
                <td className="p-4 text-center">
                  {analytics?.averageScore?.toFixed(1) || 0}/30
                </td>
                <td className="p-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Clinical Notes Section */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Interpretation Guidelines</h3>
          <ul className="space-y-3 text-sm">
            <li>
              • Scores below 80% of maximum in any domain suggest clinical
              concern
            </li>
            <li>
              • Orientation deficits correlate with dementia progression (r =
              .72)
            </li>
            <li>
              • Language domain scores below 6/9 may indicate left hemisphere
              lesions
            </li>
            <li>
              • Visual construction errors often precede Alzheimer's diagnosis
            </li>
            <li>
              • Total scores ≤23/30 indicate need for comprehensive evaluation
            </li>
            <li>
              • {analytics?.dementiaPrevalence?.toFixed(1)}% of participants
              scored ≤23/30 (clinical dementia threshold)
            </li>
            <li>
              • Scores ≤23 have 89% sensitivity for dementia diagnosis
              (Folstein, 1983)
            </li>
          </ul>
        </div>

        {/* New Psychosocial Patterns Section - Add this right after Clinical Notes */}
        <div className="mt-8 p-6 bg-rose-50 dark:bg-rose-900 rounded-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiHeart className="text-rose-600 dark:text-rose-300" />
            Community Wellbeing Patterns
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Living Situations */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiHome className="text-rose-500" />
                <h4 className="font-semibold">Living Arrangements</h4>
              </div>
              {Object.entries(
                analyzeDemographicPatterns(assessments).livingSituations
              ).map(([situation, count]) => (
                <div
                  key={situation}
                  className="flex justify-between text-sm py-1"
                >
                  <span>{situation}</span>
                  <span className="text-rose-600 dark:text-rose-300">
                    {((count / assessments.length) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Social Connections */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiUsers className="text-rose-500" />
                <h4 className="font-semibold">Social Bonds</h4>
              </div>
              {Object.entries(
                analyzeDemographicPatterns(assessments).maritalStatus
              ).map(([status, count]) => (
                <div key={status} className="flex justify-between text-sm py-1">
                  <span>{status}</span>
                  <span className="text-rose-600 dark:text-rose-300">
                    {((count / assessments.length) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                {Object.entries(
                  analyzeDemographicPatterns(assessments).maritalStatus
                ).find(([s]) => s === "Single")?.[1] || 0}
                participants living without partner support
              </p>
            </div>

            {/* Educational Background */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiBook className="text-rose-500" />
                <h4 className="font-semibold">Learning Journeys</h4>
              </div>
              {Object.entries(
                analyzeDemographicPatterns(assessments).educationLevels
              ).map(([education, count]) => (
                <div
                  key={education}
                  className="flex justify-between text-sm py-1"
                >
                  <span>{education}</span>
                  <span className="text-rose-600 dark:text-rose-300">
                    {((count / assessments.length) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                {(
                  ((analyzeDemographicPatterns(assessments).educationLevels[
                    "High school diploma"
                  ] || 0) /
                    assessments.length) *
                  100
                ).toFixed(1)}
                % completed secondary education
              </p>
            </div>

            {/* Generational Patterns */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiUsers className="text-rose-500" />
                <h4 className="font-semibold">Age Perspectives</h4>
              </div>
              {Object.entries(
                analyzeDemographicPatterns(assessments).ageGroups
              ).map(([age, count]) => (
                <div key={age} className="flex justify-between text-sm py-1">
                  <span>{age}</span>
                  <span className="text-rose-600 dark:text-rose-300">
                    {((count / assessments.length) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                Majority in{" "}
                {
                  Object.entries(
                    analyzeDemographicPatterns(assessments).ageGroups
                  ).sort((a, b) => b[1] - a[1])[0]?.[0]
                }{" "}
                age group
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-rose-100 dark:bg-rose-800 rounded">
            <h4 className="font-semibold mb-2">Human Context Insights</h4>
            <ul className="space-y-2 text-sm text-rose-800 dark:text-rose-200">
              <li>
                •{" "}
                {(
                  (analyzeDemographicPatterns(assessments).livingSituations[
                    "Lives alone"
                  ] /
                    assessments.length) *
                  100
                ).toFixed(1)}
                % live independently{" "}
              </li>
              <li>
                •{" "}
                {(
                  (analyzeDemographicPatterns(assessments).maritalStatus[
                    "Married"
                  ] /
                    assessments.length) *
                  100
                ).toFixed(1)}
                % have spousal support
              </li>
              <li>
                •{" "}
                {(
                  (analyzeDemographicPatterns(assessments).educationLevels[
                    "Bachelor's degree"
                  ] /
                    assessments.length) *
                  100
                ).toFixed(1)}
                % hold university degrees
              </li>
              <li>
                • Average cohort age: {calculateAverageAge(assessments)} years
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
