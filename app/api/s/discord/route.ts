import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ url: "https://discord.com/users/969088519161139270" });
}
