import { NextResponse } from "next/server";

export const runtime = "edge";

export type Instructor = {
  abbreviation: string;
  fullName: string;
  faculty: string;
  department: string;
};

type GithubContent = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
};

const GH_CONTENTS_URL =
  process.env.GH_CONTENTS_URL ??
  "https://api.github.com/repos/CP-RektMart/jarn-nai/contents/src/db";

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

    const token = process.env.GITHUB_TOKEN;

    console.log("PAT", token);

    const listRes = await fetch(GH_CONTENTS_URL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!listRes.ok) {
      const text = await listRes.text();
      console.error("Failed to list GitHub folder:", text);
      return NextResponse.json(
        { error: "Failed to list GitHub folder" },
        { status: 502 },
      );
    }

    const contents = (await listRes.json()) as GithubContent[];

    const jsonFiles = contents.filter(
      (item) =>
        item.type === "file" &&
        item.name.endsWith(".json") &&
        item.download_url,
    );

    const allArrays = await Promise.all(
      jsonFiles.map(async (file) => {
        if (!file.download_url) return;
        const res = await fetch(file.download_url, {
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          console.warn(
            "Failed to fetch file:",
            file.download_url,
            await res.text(),
          );
          return [] as Instructor[];
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          return data as Instructor[];
        }
        return [data as Instructor];
      }),
    );

    let instructors = allArrays.flat();

    if (q) {
      instructors = instructors.filter((inst) => {
        if (!inst) return false;
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
      instructors = instructors.filter((inst) => {
        if (!inst) return false;
        return facultyFilters.includes(inst.faculty);
      });
    }

    if (departmentFilters.length > 0) {
      instructors = instructors.filter(
        (inst) => inst && departmentFilters.includes(inst.department),
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
      if (!a && !b) return 0;
      if (!a) return 1;
      if (!b) return -1;

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
      { error: "Failed to load instructors", details: error },
      { status: 500 },
    );
  }
}
