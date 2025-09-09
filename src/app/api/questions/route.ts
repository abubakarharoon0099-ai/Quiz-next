import { NextResponse } from "next/server"
import data from "../../../../public/questions.json"

export async function GET() {
  return NextResponse.json(data)
}
