"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IdeaInput() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    setError(null);
  
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
  
      if (!response.ok) throw new Error("Failed to validate idea. Try again.");
  
      const data = await response.json();
      setFeedback(data.feedback);
  
      // Redirect only if there's meaningful feedback
      if (data.feedback) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Share Your Startup Idea</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea..."
            className="w-full h-48 p-4 rounded-lg bg-white bg-opacity-50 backdrop-blur-md border border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
            required
          />
          <div className="absolute bottom-4 right-4 text-sm text-gray-500">{idea.length}/500</div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        >
          {loading ? "Validating..." : "Analyze My Idea"}
        </button>
      </form>

      {feedback && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow">
          <strong>AI Feedback:</strong> {feedback}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg shadow">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
