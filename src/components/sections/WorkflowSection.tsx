import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, ArrowRight, Zap, Database, Users } from "lucide-react";

interface WorkflowSectionProps {
  workflowSteps: Array<{
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    trigger: string;
    systems: string[];
    duration: string;
  }>;
  setWorkflowSteps: (steps: Array<{
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    trigger: string;
    systems: string[];
    duration: string;
  }>) => void;
  systemsInvolved: string;
  setSystemsInvolved: (systems: string) => void;
}

export const WorkflowSection = ({ 
  workflowSteps, 
  setWorkflowSteps,
  systemsInvolved,
  setSystemsInvolved
}: WorkflowSectionProps) => {
  const addStep = () => {
    const newStep = {
      id: Date.now().toString(),
      stepNumber: workflowSteps.length + 1,
      title: '',
      description: '',
      trigger: '',
      systems: [],
      duration: ''
    };
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  const removeStep = (id: string) => {
    const filtered = workflowSteps.filter(step => step.id !== id);
    // Renumber steps
    const renumbered = filtered.map((step, index) => ({
      ...step,
      stepNumber: index + 1
    }));
    setWorkflowSteps(renumbered);
  };

  const updateStep = (id: string, field: string, value: string | string[]) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const triggerTypes = [
    'Schedule-based', 'Event-triggered', 'Manual initiation', 'Threshold-based', 'API webhook'
  ];

  const workflowExample = {
    title: "Invoice Processing Automation",
    steps: [
      { title: "Invoice Receipt", trigger: "Email/Upload", systems: ["Email", "Document Scanner"], duration: "Instant" },
      { title: "Data Extraction", trigger: "Auto OCR", systems: ["OCR Service", "AI Parser"], duration: "2 minutes" },
      { title: "Validation", trigger: "Rule Engine", systems: ["ERP", "Vendor Database"], duration: "5 minutes" },
      { title: "Approval Routing", trigger: "Workflow Engine", systems: ["Approval System", "Notifications"], duration: "1 hour" },
      { title: "Payment Processing", trigger: "Approval Complete", systems: ["Payment Gateway", "Banking API"], duration: "30 minutes" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Workflow Example: {workflowExample.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {workflowExample.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Trigger: {step.trigger} | Duration: {step.duration}
                  </div>
                </div>
                <div className="flex gap-1">
                  {step.systems.map((system, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {system}
                    </Badge>
                  ))}
                </div>
                {index < workflowExample.steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Multi-Step Workflow</Label>
          <Button onClick={addStep} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
        </div>

        <div className="grid gap-4">
          {workflowSteps.map((step, index) => (
            <Card key={step.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                  {step.stepNumber}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`title-${step.id}`}>Step Title</Label>
                    <Input
                      id={`title-${step.id}`}
                      value={step.title}
                      onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                      placeholder="e.g., Data Validation"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`trigger-${step.id}`}>Trigger Type</Label>
                    <Select onValueChange={(value) => updateStep(step.id, 'trigger', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        {triggerTypes.map((trigger) => (
                          <SelectItem key={trigger} value={trigger}>
                            {trigger}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`duration-${step.id}`}>Duration</Label>
                    <Input
                      id={`duration-${step.id}`}
                      value={step.duration}
                      onChange={(e) => updateStep(step.id, 'duration', e.target.value)}
                      placeholder="e.g., 5 minutes"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={() => removeStep(step.id)} 
                      variant="outline" 
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 ml-14">
                <Label htmlFor={`description-${step.id}`}>Step Description</Label>
                <Textarea
                  id={`description-${step.id}`}
                  value={step.description}
                  onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                  placeholder="Describe what happens in this step, data transformations, validations, etc."
                  rows={2}
                  className="resize-none"
                />
              </div>
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center mt-4">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="systemsInvolved" className="text-base font-semibold flex items-center gap-2">
          <Database className="w-4 h-4" />
          Systems & Integrations Involved
        </Label>
        <Textarea
          id="systemsInvolved"
          value={systemsInvolved}
          onChange={(e) => setSystemsInvolved(e.target.value)}
          placeholder="List all systems, APIs, databases, and third-party services that will be integrated. Include data flow between systems..."
          rows={4}
          className="resize-none"
        />
        <div className="text-sm text-muted-foreground">
          Include CRM, ERP, email systems, databases, payment gateways, notification services, etc.
        </div>
      </div>
    </div>
  );
};