import { instructors } from '@/db/data';
import { InstructorSearchClient } from '@/components/instructor-card-list';
import { Caution } from '@/components/caution';

export default function InstructorSearchPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Caution />

      <div className="text-left mb-4">
        <h1 className="text-3xl font-bold mb-2 text-primary">
          CU Instructor Search
        </h1>
      </div>

      <InstructorSearchClient instructors={instructors} />
    </main>
  );
}
