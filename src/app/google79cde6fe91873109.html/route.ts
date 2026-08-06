import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "google79cde6fe91873109.html",
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}