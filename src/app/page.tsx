'use client';

import { useState } from 'react';
import { SearchIcon, TriangleAlert } from 'lucide-react';
import { instructors } from '@/db/data';
import { InstructorCard } from '@/components/instructor-card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function InstructorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof instructors>(instructors);
  const [searched, setSearched] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setResults(instructors);
      setSearched(false);
      return;
    }

    setSearched(true);
    const searchValue = value.toLowerCase();

    // First find all matching instructors
    const matchingInstructors = instructors.filter(
      (instructor) =>
        instructor.abbreviation.toLowerCase().includes(searchValue) ||
        instructor.fullName.toLowerCase().includes(searchValue) ||
        instructor.faculty.toLowerCase().includes(searchValue) ||
        instructor.department.toLowerCase().includes(searchValue)
    );

    // Sort results to prioritize abbreviation matches
    const sortedResults = matchingInstructors.sort((a, b) => {
      // If a's abbreviation matches but b's doesn't, a comes first
      const aAbbrevMatch = a.abbreviation.toLowerCase().includes(searchValue);
      const bAbbrevMatch = b.abbreviation.toLowerCase().includes(searchValue);

      if (aAbbrevMatch && !bAbbrevMatch) return -1;
      if (!aAbbrevMatch && bAbbrevMatch) return 1;

      // If both match or both don't match abbreviation, sort alphabetically by abbreviation
      return a.abbreviation.localeCompare(b.abbreviation);
    });

    setResults(sortedResults);
  };

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
        <h1 className="text-3xl font-bold mb-2 text-primary sm:m-2">
          CU Instructor Search
        </h1>
        {/* <p className="text-muted-foreground">Find instructor details by abbreviation, name, faculty, or department</p> */}
      </div>

      <div className="border-1 border-white mb-2 rounded-[8px] has-[input:focus]:border-[#2A2D48] transition duration-100">
        <div className="relative border-1 border-[#E0E0E0] has-[input:focus]:border-1 has-[input:focus]:border-[#2A2D48] hover:border-[#2A2D48] transition duration-100 rounded-sm box-border">
          <input
            placeholder="Search for instructors..."
            className="rounded-sm py-2 pl-3.5 pr-10 border-0 w-full text-md sm:text-lg focus:ring-0 focus:ring-offset-0 focus:outline-none"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:m-3">
        • Search by abbreviation, name, faculty or department <br />• Search
        across all fields - abbreviation matches are shown first
      </p>

      <div className="space-y-4">
        {searched && results.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <h2 className="text-xl font-semibold mb-2">No instructors found</h2>
            <p className="text-muted-foreground">
              Try searching with a different term or category
            </p>
          </div>
        ) : (
          results.map((instructor) => (
            <InstructorCard
              key={instructor.abbreviation}
              abbreviation={instructor.abbreviation}
              faculty={instructor.faculty}
              thFullName={instructor.fullName}
              department={instructor.department}
            />
          ))
        )}
      </div>
    </main>
  );
}
