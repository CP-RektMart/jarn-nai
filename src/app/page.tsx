import { Caution } from "@/components/caution";
import { InstructorSearchClient } from "@/components/instructor-card-list";
import { instructors } from "@/db/data";

export default function InstructorSearchPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <Caution />

      <div className="mb-4 text-left">
        <h1 className="mb-2 font-bold text-3xl text-primary">
          CU Instructor Search
        </h1>
      </div>

      <InstructorSearchClient instructors={instructors} />
    </main>
  );
}
