import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json({
      status: 404,
      message: "Password is required",
      data: null,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Login Successfully",
  });
}
