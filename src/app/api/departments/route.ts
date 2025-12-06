import { NextResponse } from "next/server";
import allInstructors from "@/db/all.json";

export const runtime = "edge";

export async function GET(_req: Request) {
  try {
    // Get all unique departments from instructors
    const departments = Array.from(
      new Set(
        (allInstructors as { department: string }[]).map(
          (inst) => inst.department,
        ),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return NextResponse.json(
      {
        departments,
        total: departments.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to load departments:", error);
    return NextResponse.json(
      { error: "Failed to load departments" },
      { status: 500 },
    );
  }
}
