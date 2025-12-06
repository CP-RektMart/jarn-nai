import { NextResponse } from "next/server";
import allInstructors from "@/db/all.json";

export const runtime = "edge";

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

    const pageRaw = searchParams.get("page") ?? "1";
    const limitRaw = searchParams.get("limit") ?? "20";

    let page = Number.parseInt(pageRaw, 10);
    let limit = Number.parseInt(limitRaw, 10);

    if (!Number.isFinite(page) || page < 1) page = 1;
    if (!Number.isFinite(limit) || limit < 1) limit = 20;
    if (limit > 100) limit = 100;

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
      : "department";

    instructors.sort((a, b) => {
      const av = (a[sortBy] ?? "").toString().toLowerCase();
      const bv = (b[sortBy] ?? "").toString().toLowerCase();

      if (av === bv) return 0;
      if (sortOrderParam === "desc") {
        return av < bv ? 1 : -1;
      }
      return av < bv ? -1 : 1;
    });

    const total = instructors.length;
    const last = Math.max(1, Math.ceil(total / limit));
    if (page > last) page = last;

    const start = (page - 1) * limit;
    const end = start + limit;
    const items = instructors.slice(start, end);

    return NextResponse.json(
      {
        items,
        page,
        limit,
        total,
        last,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to load instructors:", error);
    return NextResponse.json(
      { error: "Failed to load instructors" },
      { status: 500 },
    );
  }
}
