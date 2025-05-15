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
      <CardHeader className="pt-6 pb-0 px-8">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{thFullName}</CardTitle>
          <Badge variant="outline" className="font-mono">
            {abbreviation}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-4 px-8">
        <div className="grid gap-2">
          {!enFullName && (
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <span className="font-normal">Thai Full Name:</span>
                <Badge variant="secondary" className="font-normal">
                  {thFullName}
                </Badge>
              </div>
            </div>
          )}
          {!thFullName && (
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <span className="font-normal">English Full Name:</span>
                <Badge variant="secondary" className="font-normal">
                  {enFullName}
                </Badge>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              <span className="font-normal">Faculty:</span>
              <Badge
                variant="outline"
                className={(() => {
                  switch (faculty.toLowerCase()) {
                    case 'engineering':
                      return 'font-normal border-[#941113] text-[#941113]';
                    default:
                      return 'font-normal';
                  }
                })()}
              >
                {faculty}
              </Badge>
            </div>
          </div>
          {department && (
            <div className="flex items-center gap-2">
              <BookIcon className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <span className="font-normal">Department:</span>
                <Badge variant="secondary" className="font-normal">
                  {department}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { InstructorCard };
