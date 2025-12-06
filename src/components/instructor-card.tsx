import { BookIcon, BuildingIcon, IdCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InstructorCardProps {
  abbreviation: string;
  enFullName?: string;
  thFullName?: string;
  faculty: string;
  department?: string;
}

const InstructorCard = ({
  abbreviation,
  enFullName,
  thFullName,
  faculty,
  department,
}: InstructorCardProps) => {
  return (
    <Card
      key={abbreviation}
      className="gap-0 overflow-hidden rounded-sm p-0 shadow-none"
    >
      <CardHeader className="gap-0 px-4 pt-6 pb-0">
        <div className="flex flex-row items-start justify-between gap-2">
          <CardTitle className="wrap-break-word text-xl">
            {thFullName ?? enFullName}
          </CardTitle>
          <Badge variant="outline" className="py-1.5 font-mono">
            {abbreviation}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-2">
              <IdCard className="mt-1 h-4 w-4 text-muted-foreground" />
              <span className="whitespace-nowrap font-normal">
                {thFullName ? "Thai Full Name" : "English Full Name"}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="wrap-break-word w-fit font-normal"
            >
              {thFullName ?? enFullName}
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-2">
              <BuildingIcon className="mt-1 h-4 w-4 text-muted-foreground" />
              <span className="whitespace-nowrap font-normal">Faculty</span>
            </div>
            <Badge
              variant="outline"
              className={(() => {
                switch (faculty.toLowerCase()) {
                  case "engineering":
                    return "wrap-break-word w-fit border-[#941113] font-normal text-[#941113]";
                  default:
                    return "wrap-break-word w-fit font-normal";
                }
              })()}
            >
              {faculty}
            </Badge>
          </div>
          {department && (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-start gap-2">
                <BookIcon className="mt-1 h-4 w-4 text-muted-foreground" />
                <span className="whitespace-nowrap font-normal">
                  Department
                </span>
              </div>
              <Badge
                variant="secondary"
                className="wrap-break-word w-fit font-normal"
              >
                {department}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { InstructorCard };
