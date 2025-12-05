"use client";

import { memo, useDeferredValue, useMemo, useState } from "react";

import { SearchIcon } from "lucide-react";

import { InstructorCard } from "@/components/instructor-card";

type Instructor = typeof import("@/db/data").instructors[number];

interface InstructorSearchClientProps {
  instructors: Instructor[];
}

interface InstructorSearchResultProps {
  searched: boolean;
  results: Instructor[];
}

export const InstructorSearchResult = memo(function InstructorSearchResult({
  searched,
  results,
}: InstructorSearchResultProps) {
  if (searched && results.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg border p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold">No instructors found</h2>
        <p className="text-muted-foreground">
          Try searching with a different term or category
        </p>
      </div>
    );
  }

  return (
    <>
      {results.map((instructor) => (
        <InstructorCard
          key={instructor.abbreviation}
          abbreviation={instructor.abbreviation}
          faculty={instructor.faculty}
          thFullName={instructor.fullName}
          department={instructor.department}
        />
      ))}
    </>
  );
});

export function InstructorSearchClient({
  instructors,
}: InstructorSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { results, searched } = useMemo(() => {
    const term = deferredSearchTerm.trim().toLowerCase();
    if (!term) {
      return { results: instructors, searched: false };
    }

    const matching = instructors.filter(
      (i) =>
        i.abbreviation.toLowerCase().includes(term) ||
        i.fullName.toLowerCase().includes(term) ||
        i.faculty.toLowerCase().includes(term) ||
        i.department.toLowerCase().includes(term),
    );

    matching.sort((a, b) => {
      const aAbbrev = a.abbreviation.toLowerCase().includes(term);
      const bAbbrev = b.abbreviation.toLowerCase().includes(term);
      if (aAbbrev && !bAbbrev) return -1;
      if (!aAbbrev && bAbbrev) return 1;
      return a.abbreviation.localeCompare(b.abbreviation);
    });

    return { results: matching, searched: true };
  }, [deferredSearchTerm, instructors]);

  return (
    <>
      <div className="mb-2 rounded-xl border border-white transition duration-100 has-[input:focus]:border-[#2A2D48]">
        <div className="relative box-border rounded-sm border border-[#E0E0E0] transition duration-100 hover:border-[#2A2D48] has-[input:focus]:border has-[input:focus]:border-[#2A2D48]">
          <input
            placeholder="Search for instructors..."
            className="text-md w-full rounded-sm border-0 py-2 pr-10 pl-3.5 focus:ring-0 focus:ring-offset-0 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="text-muted-foreground absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
        </div>
      </div>

      <ul className="text-muted-foreground mb-4 ml-4 list-disc text-xs">
        <li>Search by abbreviation, name, faculty or department</li>
        <li>Search across all fields - abbreviation matches are shown first</li>
      </ul>

      <div className="space-y-4">
        <InstructorSearchResult searched={searched} results={results} />
      </div>
    </>
  );
}
