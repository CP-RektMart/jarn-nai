import { instructors } from "@/db/data";

import { Caution } from "@/components/caution";
import { InstructorSearchClient } from "@/components/instructor-card-list";

export default function InstructorSearchPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <Caution />

      <div className="mb-4 text-left">
        <h1 className="text-primary mb-2 text-3xl font-bold">
          CU Instructor Search
        </h1>
      </div>

      <InstructorSearchClient instructors={instructors} />
    </main>
  );
}
