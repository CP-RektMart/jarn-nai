const Navbar = () => {
  return (
    <div className="h-10 w-full bg-primary">
      <div className="container max-w-6xl flex h-full w-full mx-auto justify-end items-center">
        <a
          href="https://github.com/CP-RektMart/jarn-nai/issues/new?template=instructor-abbreviation.yml"
          className="text-white underline truncate hover:text-gray-300 mr-4"
        >
          Add Instructor
        </a>
      </div>
    </div>
  );
};

export { Navbar };
