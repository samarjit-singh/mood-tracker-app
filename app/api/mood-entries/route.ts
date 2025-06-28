import { type NextRequest, NextResponse } from "next/server";

const moodEntries: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const moodEntry = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    moodEntries.push(moodEntry);

    return NextResponse.json({ success: true, id: moodEntry.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save mood entry" + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(moodEntries);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch mood entries" + error.message },
      { status: 500 }
    );
  }
}
