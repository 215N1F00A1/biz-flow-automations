import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Target } from "lucide-react";

interface ProgressTrackerProps {
  completedSections: number;
  totalSections: number;
  currentSection: number;
}

export const ProgressTracker = ({ 
  completedSections, 
  totalSections, 
  currentSection 
}: ProgressTrackerProps) => {
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <Card className="sticky top-6 shadow-medium">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Assignment Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium">{completedSections}/{totalSections} sections</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-xl font-bold text-success">{completedSections}</span>
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-xl font-bold text-warning">{totalSections - completedSections}</span>
            </div>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
        </div>

        {currentSection <= totalSections && (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm font-medium text-primary">
              Currently working on: Section {currentSection}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};