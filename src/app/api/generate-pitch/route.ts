import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();
    if (!idea) return NextResponse.json({ error: "No idea provided" }, { status: 400 });

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const res = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: `Generate a pitch for this idea: ${idea}` }),
    });

    const data = await res.json();
    const pitchContent = data[0]?.generated_text || "Failed to generate pitch.";

    const { data: saved, error } = await supabase.from("pitches").insert([{ content: pitchContent }]).select();

    if (error) throw new Error("Database error");

    return NextResponse.json({ url: `/pitch/${saved[0].id}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
