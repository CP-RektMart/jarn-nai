'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchIcon, BookIcon, BuildingIcon } from 'lucide-react';
import { instructors } from '@/db/data';
import { InstructorCard } from '@/components/instructor-card';

export default function InstructorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof instructors>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setResults([]);
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
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">CU Instructor Search</h1>
        <p className="text-muted-foreground">Find instructor details by abbreviation, name, faculty, or department</p>
      </div>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by abbreviation, name, faculty or department..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Search across all fields - abbreviation matches are shown first
        </p>
      </div>

      <div className="space-y-4">
        {searched && results.length === 0 ? (
          <div className="text-center p-8 border rounded-lg bg-muted/50">
            <h2 className="text-xl font-semibold mb-2">No instructors found</h2>
            <p className="text-muted-foreground">Try searching with a different term or category</p>
          </div>
        ) : (
          results.map((instructor, i) => (
            <InstructorCard
              key={instructor.abbreviation}
              abbreviation={instructor.abbreviation}
              faculty={instructor.faculty}
              thFullName={instructor.fullName}
              department={instructor.faculty}
            />
          ))
        )}
      </div>
    </main>
  );
}
