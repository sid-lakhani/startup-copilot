"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Idea Validation Metrics",
    },
  },
};

const labels = ["Market Potential", "Innovation", "Feasibility", "Scalability"];

export default function Dashboard() {
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  useEffect(() => {
    const fetchValidationResults = async () => {
      try {
        const response = await fetch("/api/validate"); // Replace with actual endpoint
        if (!response.ok) throw new Error("Failed to fetch data.");

        const data = await response.json();
        setScores(data.scores);
        setFeedback(data.feedback);
      } catch (err) {
        setError("Could not fetch validation results.");
      } finally {
        setLoading(false);
      }
    };

    fetchValidationResults();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: scores,
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Startup Idea Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Idea Analysis</h2>
          {loading ? (
            <p>Loading chart...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <Bar options={options} data={data} />
          )}
        </div>

        <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">AI Feedback</h2>
          <button
            onClick={() => setFeedbackVisible(!feedbackVisible)}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {feedbackVisible ? "Hide Feedback" : "Show Feedback"}
          </button>
          {feedbackVisible &&
            (loading ? (
              <p>Loading feedback...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {feedback.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Refine your business model based on the AI feedback</li>
          <li>Research potential competitors in your market</li>
          <li>Start building a minimum viable product (MVP)</li>
          <li>Explore funding options in the Investors section</li>
        </ul>
      </div>
    </div>
  );
}
