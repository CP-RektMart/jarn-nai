import { NextResponse } from "next/server";
import allInstructors from "@/db/all.json";

// export const runtime = "edge";

export async function GET(_req: Request) {
  try {
    const departments = Array.from(
      new Set(
        (allInstructors as { department: string }[]).map(
          (inst) => inst.department,
        ),
      ),
    ).sort((a, b) => a.localeCompare(b));

    const faculties = Array.from(
      new Set(
        (allInstructors as { faculty: string }[]).map((inst) => inst.faculty),
      ),
    ).sort((a, b) => a.localeCompare(b));

    const abbreviations = Array.from(
      new Set(
        (allInstructors as { abbreviation: string }[]).map(
          (inst) => inst.abbreviation,
        ),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return NextResponse.json(
      {
        departments,
        faculties,
        abbreviations,
        totalDepartments: departments.length,
        totalFaculties: faculties.length,
        totalAbbreviations: abbreviations.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to load metadata:", error);
    return NextResponse.json(
      { error: "Failed to load metadata" },
      { status: 500 },
    );
  }
}
