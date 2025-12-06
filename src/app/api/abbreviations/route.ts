import { NextResponse } from "next/server";
import allInstructors from "@/db/all.json";

export const runtime = "edge";

export async function GET(_req: Request) {
  try {
    // Get all unique abbreviations from instructors
    const abbreviations = Array.from(
      new Set(
        (allInstructors as { abbreviation: string }[]).map(
          (inst) => inst.abbreviation,
        ),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return NextResponse.json(
      {
        abbreviations,
        total: abbreviations.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to load abbreviations:", error);
    return NextResponse.json(
      { error: "Failed to load abbreviations" },
      { status: 500 },
    );
  }
}
