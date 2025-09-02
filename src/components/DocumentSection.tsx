import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentSectionProps {
  title: string;
  number: number;
  description: string;
  isCompleted?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
}

export const DocumentSection = ({ 
  title, 
  number, 
  description, 
  isCompleted = false, 
  isActive = false, 
  children 
}: DocumentSectionProps) => {
  return (
    <Card className={cn(
      "transition-all duration-300",
      isActive && "ring-2 ring-primary shadow-medium",
      isCompleted && "ring-1 ring-success"
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
              isCompleted ? "bg-success text-success-foreground" : 
              isActive ? "bg-primary text-primary-foreground" : 
              "bg-muted text-muted-foreground"
            )}>
              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : number}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {isCompleted && (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              Complete
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground ml-11">{description}</p>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};