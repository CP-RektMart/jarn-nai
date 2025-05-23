import Link from 'next/link';

const Footer = () => {
  return (
    <div className="h-40 w-full bg-primary flex flex-col mt-auto">
      <div className="container max-w-6xl flex h-full w-full mx-auto justify-center items-center">
        <div className="text-white text-sm flex flex-col gap-4 p-4">
          <span className="sm:text-2xl text-xl text-center">(อา)จารย์ ไหน</span>
          <div className="flex justify-center items-end gap-2">
            <Link
              href="https://github.com/CP-RektMart"
              target="_blank"
              className="text-base sm:text-xl hover:text-gray-300"
            >
              CP-Rektmart
            </Link>
            <span className="text-base sm:text-xl">|</span>
            <Link
              href="https://github.com/CP-RektMart/jarn-nai"
              target="_blank"
              className="flex flex-row justify-center items-center gap-2"
            >
              <span className="text-base sm:text-xl hover:text-gray-300">
                Open Source on
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github hover:text-gray-300"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </Link>
          </div>

          <div className="flex justify-center items-end">
            <a
              href="#privacy"
              className="text-base sm:text-white hover:text-gray-300 mr-4"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-base sm:text-white hover:text-gray-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
