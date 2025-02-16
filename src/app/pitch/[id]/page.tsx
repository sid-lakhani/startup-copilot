'use client';

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type PitchProps = { params: { id: string } };

export default function PitchPage({ params }: PitchProps) {
  const { id } = params;
  const [pitch, setPitch] = useState("");

  useEffect(() => {
    const fetchPitch = async () => {
      const res = await fetch(`/api/get-pitch?id=${id}`);
      const data = await res.json();
      setPitch(data.content || "No pitch found.");
    };
    fetchPitch();
  }, [id]);

  if (!id) return notFound();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Your AI-Generated Pitch</h1>
      <p className="text-lg max-w-2xl text-center">{pitch}</p>
    </div>
  );
}
