import { NextResponse } from "next/server";
import allInstructors from "@/db/all.json";

export type Instructor = {
  abbreviation: string;
  fullName: string;
  faculty: string;
  department: string;
};

export const revalidate = 3600;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const q = (searchParams.get("q") ?? "").toLowerCase().trim();

    const facultyParam = searchParams.get("faculty");
    const departmentParam = searchParams.get("department");

    const sortByParam = (searchParams.get("sortBy") ??
      "fullName") as keyof Instructor;
    const sortOrderParam =
      searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

    const facultyFilters =
      facultyParam
        ?.split(",")
        .map((v) => v.trim())
        .filter(Boolean) ?? [];

    const departmentFilters =
      departmentParam
        ?.split(",")
        .map((v) => v.trim())
        .filter(Boolean) ?? [];

    let instructors: Instructor[] = allInstructors as Instructor[];

    if (q) {
      instructors = instructors.filter((inst) => {
        const haystack = [
          inst.abbreviation,
          inst.fullName,
          inst.faculty,
          inst.department,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });
    }

    if (facultyFilters.length > 0) {
      instructors = instructors.filter((inst) =>
        facultyFilters.includes(inst.faculty),
      );
    }

    if (departmentFilters.length > 0) {
      instructors = instructors.filter((inst) =>
        departmentFilters.includes(inst.department),
      );
    }

    const validSortFields: (keyof Instructor)[] = [
      "abbreviation",
      "fullName",
      "faculty",
      "department",
    ];

    const sortBy: keyof Instructor = validSortFields.includes(sortByParam)
      ? sortByParam
      : "fullName";

    instructors.sort((a, b) => {
      const av = (a[sortBy] ?? "").toString().toLowerCase();
      const bv = (b[sortBy] ?? "").toString().toLowerCase();

      if (av === bv) return 0;
      if (sortOrderParam === "desc") {
        return av < bv ? 1 : -1;
      }
      return av < bv ? -1 : 1;
    });

    return NextResponse.json(instructors, { status: 200 });
  } catch (error) {
    console.error("Failed to load instructors:", error);
    return NextResponse.json(
      { error: "Failed to load instructors" },
      { status: 500 },
    );
  }
}
