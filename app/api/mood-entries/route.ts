import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const moodEntries: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.selectedEmotions || !body.feelingState || !body.impactFactors) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const moodEntry = await prisma.moodEntry.create({
      data: {
        selectedEmotions: body.selectedEmotions,
        feelingStateValue: body.feelingState.value,
        feelingStateLabel: body.feelingState.label,
        feelingStateShortLabel: body.feelingState.shortLabel,
        feelingStateDescription: body.feelingState.description,
        impactFactors: body.impactFactors,
        additionalContext: body.additionalContext,
        timestamp: new Date(body.timestamp),
        latitude: body.location?.latitude,
        longitude: body.location?.longitude,
        city: body.location?.city,
        district: body.location?.district,
        state: body.location?.state,
        country: body.location?.country,
      },
    });

    return NextResponse.json({ success: true, id: moodEntry.id });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save mood entry: " + error.message },
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
