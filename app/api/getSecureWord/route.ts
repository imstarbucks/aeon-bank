import { NextResponse } from "next/server";

const secureWord = "secureWord123";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({
      status: 404,
      message: "Username is required",
      data: null,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Username is valid",
    data: secureWord,
  });
}
