import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookIcon, BuildingIcon, IdCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    <Card key={abbreviation} className="overflow-hidden rounded-sm shadow-none">
      <CardHeader className="pt-6 pb-0 px-4">
        <div className="flex flex-row justify-between items-start gap-2">
          <CardTitle className="text-xl break-words">
            {thFullName ?? enFullName}
          </CardTitle>
          <Badge variant="outline" className="font-mono py-1.5">
            {abbreviation}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-4 px-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-start gap-2 flex-col ">
            <div className="flex items-start gap-2">
              <IdCard className="h-4 w-4 text-muted-foreground mt-1" />
              <span className="font-normal whitespace-nowrap">
                {thFullName ? 'Thai Full Name' : 'English Full Name'}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="font-normal break-words w-fit"
            >
              {thFullName ?? enFullName}
            </Badge>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start gap-2">
              <BuildingIcon className="h-4 w-4 text-muted-foreground mt-1" />
              <span className="font-normal whitespace-nowrap">Faculty</span>
            </div>
            <Badge
              variant="outline"
              className={(() => {
                switch (faculty.toLowerCase()) {
                  case 'engineering':
                    return 'font-normal border-[#941113] text-[#941113] break-words w-fit';
                  default:
                    return 'font-normal break-words w-fit';
                }
              })()}
            >
              {faculty}
            </Badge>
          </div>
          {department && (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-start gap-2">
                <BookIcon className="h-4 w-4 text-muted-foreground mt-1" />
                <span className="font-normal whitespace-nowrap">
                  Department
                </span>
              </div>
              <Badge
                variant="secondary"
                className="font-normal break-words w-fit"
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
