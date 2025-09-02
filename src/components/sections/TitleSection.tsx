import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface TitleSectionProps {
  title: string;
  setTitle: (title: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
}

export const TitleSection = ({ title, setTitle, summary, setSummary }: TitleSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="title" className="text-base font-medium">Project Title</Label>
        <Input
          id="title"
          placeholder="e.g., Automated Invoice Processing & Payment Follow-up System"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg h-12"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="summary" className="text-base font-medium">One-Line Problem Summary</Label>
        <Textarea
          id="summary"
          placeholder="e.g., B2B companies waste 40+ hours weekly on manual invoice processing, leading to payment delays, cash flow issues, and 15% increase in operational costs."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-primary">Writing Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about the business impact (time, cost, errors)</li>
                <li>• Focus on recurring, multi-step operational challenges</li>
                <li>• Mention the target department or role affected</li>
                <li>• Keep it concise but impactful</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};