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

const InstructorCard = ({ abbreviation, enFullName, thFullName, faculty, department }: InstructorCardProps) => {
  return (
    <Card key={abbreviation} className="overflow-hidden">
      <CardHeader className="bg-primary/5 py-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{thFullName}</CardTitle>
          <Badge variant="outline" className="font-mono">
            {abbreviation}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-2">
          {!enFullName && (
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <span className="font-medium">Thai Full Name:</span>
                <Badge variant="secondary">{thFullName}</Badge>
              </div>
            </div>
          )}
          {!thFullName && (
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <span className="font-medium">English Full Name:</span>
                <Badge variant="secondary">{enFullName}</Badge>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              <span className="font-medium">Faculty:</span>
              <Badge variant="secondary">{faculty}</Badge>
            </div>
          </div>
          {department && (
            <div className="flex items-center gap-2">
              <BookIcon className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <span className="font-medium">Department:</span>
                <Badge variant="secondary">{department}</Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { InstructorCard };
