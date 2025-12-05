const Navbar = () => {
  return (
    <div className="bg-primary h-10 w-full">
      <div className="container mx-auto flex h-full w-full max-w-6xl items-center justify-end">
        <a
          href="https://github.com/CP-RektMart/jarn-nai/issues/new?template=instructor-abbreviation.yml"
          className="mr-4 truncate text-white underline hover:text-gray-300"
        >
          Add Instructor
        </a>
      </div>
    </div>
  );
};

export { Navbar };
