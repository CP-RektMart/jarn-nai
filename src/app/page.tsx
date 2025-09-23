'use client'

import { useState } from 'react'

import { instructors } from '@/db/data'
import { SearchIcon, TriangleAlert } from 'lucide-react'

import { InstructorCard } from '@/components/instructor-card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function InstructorSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<typeof instructors>(instructors)
  const [searched, setSearched] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)

    if (!value.trim()) {
      setResults(instructors)
      setSearched(false)
      return
    }

    setSearched(true)
    const searchValue = value.toLowerCase()

    // First find all matching instructors
    const matchingInstructors = instructors.filter((instructor) => {
      return (
        instructor.abbreviation.toLowerCase().includes(searchValue) ||
        instructor.fullName.toLowerCase().includes(searchValue) ||
        instructor.faculty.toLowerCase().includes(searchValue) ||
        instructor.department.toLowerCase().includes(searchValue)
      )
    })

    // Sort results to prioritize abbreviation matches
    const sortedResults = matchingInstructors.sort((a, b) => {
      // If a's abbreviation matches but b's doesn't, a comes first
      const aAbbrevMatch = a.abbreviation.toLowerCase().includes(searchValue)
      const bAbbrevMatch = b.abbreviation.toLowerCase().includes(searchValue)

      if (aAbbrevMatch && !bAbbrevMatch) return -1
      if (!aAbbrevMatch && bAbbrevMatch) return 1

      // If both match or both don't match abbreviation, sort alphabetically by abbreviation
      return a.abbreviation.localeCompare(b.abbreviation)
    })

    setResults(sortedResults)
  }

  return (
    <main className='container mx-auto max-w-6xl px-4 py-8'>
      <Alert className='mb-4 rounded-sm border-0 bg-[#FFF4E5]'>
        <TriangleAlert
          className='h-4 w-4'
          stroke='#ED6C02'
        />
        <AlertDescription>
          Jarn-nai is a website created by students and is not supported by
          servers from Reg Chula. It is merely a tool to help find instructors
          more easily, but it is not an actual course registration system. You
          can register for courses only through the official channel at
          https://www2.reg.chula.ac.th/.
        </AlertDescription>
      </Alert>
      <div className='mb-4 text-left'>
        <h1 className='text-primary mb-2 text-3xl font-bold'>
          CU Instructor Search
        </h1>
        {/* <p className="text-muted-foreground">Find instructor details by abbreviation, name, faculty, or department</p> */}
      </div>

      <div className='mb-2 rounded-[8px] border-1 border-white transition duration-100 has-[input:focus]:border-[#2A2D48]'>
        <div className='relative box-border rounded-sm border-1 border-[#E0E0E0] transition duration-100 hover:border-[#2A2D48] has-[input:focus]:border-1 has-[input:focus]:border-[#2A2D48]'>
          <input
            placeholder='Search for instructors...'
            className='text-md w-full rounded-sm border-0 py-2 pr-10 pl-3.5 focus:ring-0 focus:ring-offset-0 focus:outline-none'
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchIcon className='text-muted-foreground absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2' />
        </div>
      </div>
      <ul className='text-muted-foreground mb-4 ml-4 list-disc text-xs'>
        <li>Search by abbreviation, name, faculty or department</li>
        <li>Search across all fields - abbreviation matches are shown first</li>
      </ul>

      <div className='space-y-4'>
        {searched && results.length === 0 ? (
          <div className='bg-muted/50 rounded-lg border p-8 text-center'>
            <h2 className='mb-2 text-xl font-semibold'>No instructors found</h2>
            <p className='text-muted-foreground'>
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
  )
}
