import { NextResponse } from "next/server";
import allInstructors from "@/db/all.json";

// export const runtime = "edge";

export async function GET(_req: Request) {
  try {
    // Get all unique faculties from instructors
    const faculties = Array.from(
      new Set(
        (allInstructors as { faculty: string }[]).map((inst) => inst.faculty),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return NextResponse.json(
      {
        faculties,
        total: faculties.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to load faculties:", error);
    return NextResponse.json(
      { error: "Failed to load faculties" },
      { status: 500 },
    );
  }
}
