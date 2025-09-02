import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { departmentUseCases } from "@/data/useCases";

interface ProblemSectionProps {
  problemDescription: string;
  setProblemDescription: (desc: string) => void;
  evidenceType: string;
  setEvidenceType: (type: string) => void;
  evidenceDetails: string;
  setEvidenceDetails: (details: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
  painPoints: string;
  setPainPoints: (points: string) => void;
}

export const ProblemSection = ({ 
  problemDescription, 
  setProblemDescription,
  evidenceType,
  setEvidenceType,
  evidenceDetails,
  setEvidenceDetails,
  selectedDepartment,
  setSelectedDepartment,
  painPoints,
  setPainPoints
}: ProblemSectionProps) => {
  const departments = Object.keys(departmentUseCases);
  const currentUseCases = selectedDepartment ? departmentUseCases[selectedDepartment as keyof typeof departmentUseCases] : [];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="department" className="text-base font-medium">Target Department</Label>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Select the primary department affected" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {currentUseCases.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {currentUseCases.map((useCase, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {useCase}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="problem" className="text-base font-medium">Detailed Problem Description</Label>
        <Textarea
          id="problem"
          placeholder="Describe the specific operational challenges, current manual processes, bottlenecks, and business impact..."
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          rows={5}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="painPoints" className="text-base font-medium">Key Pain Points</Label>
        <Textarea
          id="painPoints"
          placeholder="List the main pain points: time waste, errors, compliance issues, customer impact, etc."
          value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="evidenceType" className="text-base font-medium">Evidence Type</Label>
          <Select value={evidenceType} onValueChange={setEvidenceType}>
            <SelectTrigger>
              <SelectValue placeholder="Select evidence type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="industry-report">Industry Report/Study</SelectItem>
              <SelectItem value="company-data">Internal Company Data</SelectItem>
              <SelectItem value="survey-research">Survey/Research Data</SelectItem>
              <SelectItem value="case-study">Published Case Study</SelectItem>
              <SelectItem value="interview">Stakeholder Interview</SelectItem>
              <SelectItem value="benchmark">Industry Benchmark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="evidence" className="text-base font-medium">Evidence Details</Label>
          <Input
            id="evidence"
            placeholder="e.g., McKinsey study shows 65% time spent on manual processes"
            value={evidenceDetails}
            onChange={(e) => setEvidenceDetails(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-warning/5 border-warning/20">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-warning">Evidence Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Provide credible, specific evidence (stats, reports, studies)</li>
                <li>• Quantify the impact where possible (time, cost, errors)</li>
                <li>• Reference reputable sources (McKinsey, Deloitte, industry reports)</li>
                <li>• Consider including URLs or citations for verification</li>
              </ul>
              <a 
                href="https://www.mckinsey.com/capabilities/operations/our-insights" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Find industry insights <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};