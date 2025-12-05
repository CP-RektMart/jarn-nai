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
      className="overflow-hidden rounded-sm shadow-none gap-0 p-0"
    >
      <CardHeader className="px-4 pt-6 pb-0 gap-0">
        <div className="flex flex-row items-start justify-between gap-2">
          <CardTitle className="text-xl wrap-break-word">
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
              <IdCard className="text-muted-foreground mt-1 h-4 w-4" />
              <span className="font-normal whitespace-nowrap">
                {thFullName ? "Thai Full Name" : "English Full Name"}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="w-fit font-normal wrap-break-word"
            >
              {thFullName ?? enFullName}
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-2">
              <BuildingIcon className="text-muted-foreground mt-1 h-4 w-4" />
              <span className="font-normal whitespace-nowrap">Faculty</span>
            </div>
            <Badge
              variant="outline"
              className={(() => {
                switch (faculty.toLowerCase()) {
                  case "engineering":
                    return "w-fit border-[#941113] font-normal wrap-break-word text-[#941113]";
                  default:
                    return "w-fit font-normal wrap-break-word";
                }
              })()}
            >
              {faculty}
            </Badge>
          </div>
          {department && (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-start gap-2">
                <BookIcon className="text-muted-foreground mt-1 h-4 w-4" />
                <span className="font-normal whitespace-nowrap">
                  Department
                </span>
              </div>
              <Badge
                variant="secondary"
                className="w-fit font-normal wrap-break-word"
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
