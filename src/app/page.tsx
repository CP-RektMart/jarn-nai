import { TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { instructors } from '@/db/data';
import { InstructorSearchClient } from '@/components/instructor-card-list';

export default function InstructorSearchPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Alert className="bg-[#FFF4E5] border-0 mb-4 rounded-sm">
        <TriangleAlert className="h-4 w-4" stroke="#ED6C02" />
        <AlertDescription>
          Jarn-nai is a website created by students and is not supported by
          servers from Reg Chula. It is merely a tool to help find instructors
          more easily, but it is not an actual course registration system. You
          can register for courses only through the official channel at
          https://www2.reg.chula.ac.th/.
        </AlertDescription>
      </Alert>

      <div className="text-left mb-4">
        <h1 className="text-3xl font-bold mb-2 text-primary">
          CU Instructor Search
        </h1>
      </div>

      <InstructorSearchClient instructors={instructors} />
    </main>
  );
}
