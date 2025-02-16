import { NextResponse } from "next/server";

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
      body: JSON.stringify({ inputs: `Validate this startup idea: ${idea}` }),
    });

    const data = await res.json();
    return NextResponse.json({ feedback: data[0]?.generated_text || "Validation failed." });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
