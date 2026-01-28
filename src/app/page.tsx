import type { Instructor } from "@/app/api/instructors/route";
import { Caution } from "@/components/caution";
import { InstructorSearchClient } from "@/components/instructor-card-list";

// export const runtime = "edge";

const BASE_URL = process.env.BASE_URL ?? "https://jarn-nai.pages.dev";

export default async function InstructorSearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  if (!params.limit) params.limit = "10000";
  const sp = new URLSearchParams(params);

  const req = await fetch(`${BASE_URL}/api/instructors?${sp.toString()}`, {
    next: { revalidate: 3600 },
  });

  const instructors: { items: Instructor[] } = await req.json();

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <Caution />

      <div className="mb-4 text-left">
        <h1 className="mb-2 font-bold text-3xl text-primary">
          CU Instructor Search
        </h1>
      </div>

      <InstructorSearchClient instructors={instructors.items} />
    </main>
  );
}
