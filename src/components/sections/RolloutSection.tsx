import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Rocket, Users, Target, Clock } from "lucide-react";

interface RolloutSectionProps {
  rolloutPhases: Array<{
    id: string;
    phase: string;
    duration: string;
    scope: string;
    goals: string;
    criteria: string;
    risks: string;
  }>;
  setRolloutPhases: (phases: Array<{
    id: string;
    phase: string;
    duration: string;
    scope: string;
    goals: string;
    criteria: string;
    risks: string;
  }>) => void;
  changeManagement: string;
  setChangeManagement: (management: string) => void;
  successMetrics: string;
  setSuccessMetrics: (metrics: string) => void;
}

export const RolloutSection = ({ 
  rolloutPhases,
  setRolloutPhases,
  changeManagement,
  setChangeManagement,
  successMetrics,
  setSuccessMetrics
}: RolloutSectionProps) => {
  const addPhase = () => {
    const newPhase = {
      id: Date.now().toString(),
      phase: `Phase ${rolloutPhases.length + 1}`,
      duration: '',
      scope: '',
      goals: '',
      criteria: '',
      risks: ''
    };
    setRolloutPhases([...rolloutPhases, newPhase]);
  };

  const removePhase = (id: string) => {
    setRolloutPhases(rolloutPhases.filter(phase => phase.id !== id));
  };

  const updatePhase = (id: string, field: string, value: string) => {
    setRolloutPhases(rolloutPhases.map(phase => 
      phase.id === id ? { ...phase, [field]: value } : phase
    ));
  };

  const rolloutTemplate = [
    {
      phase: "Pilot Phase",
      duration: "4-6 weeks",
      scope: "Single department, 10-20 users",
      goals: "Validate functionality, identify issues, gather feedback",
      criteria: "90% success rate, user acceptance > 80%",
      risks: "Limited scope may not reveal all issues"
    },
    {
      phase: "Limited Rollout",
      duration: "8-10 weeks", 
      scope: "2-3 departments, 100+ users",
      goals: "Scale testing, process refinement, performance validation",
      criteria: "95% success rate, response time < 30s",
      risks: "Integration challenges between departments"
    },
    {
      phase: "Full Deployment",
      duration: "12-16 weeks",
      scope: "Organization-wide, all users",
      goals: "Complete automation implementation, full benefits realization",
      criteria: "99% uptime, KPI targets achieved",
      risks: "Change resistance, system overload"
    }
  ];

  const phaseColors = [
    "bg-blue-50 border-blue-200",
    "bg-green-50 border-green-200", 
    "bg-purple-50 border-purple-200",
    "bg-orange-50 border-orange-200"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Phased Rollout Strategy Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rolloutTemplate.map((template, index) => (
              <div key={index} className={`p-4 rounded-lg border ${phaseColors[index]}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{template.phase}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white/50">
                      <Clock className="w-3 h-3 mr-1" />
                      {template.duration}
                    </Badge>
                    <Badge variant="outline" className="bg-white/50">
                      <Users className="w-3 h-3 mr-1" />
                      {template.scope}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="font-medium text-primary">Goals:</div>
                    <div className="text-muted-foreground">{template.goals}</div>
                  </div>
                  <div>
                    <div className="font-medium text-success">Success Criteria:</div>
                    <div className="text-muted-foreground">{template.criteria}</div>
                  </div>
                  <div>
                    <div className="font-medium text-warning">Key Risks:</div>
                    <div className="text-muted-foreground">{template.risks}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Implementation Phases</Label>
          <Button onClick={addPhase} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Phase
          </Button>
        </div>

        {rolloutPhases.map((phase, index) => (
          <Card key={phase.id} className={`p-4 ${phaseColors[index % phaseColors.length]}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div>
                    <Label htmlFor={`phase-${phase.id}`}>Phase Name</Label>
                    <Input
                      id={`phase-${phase.id}`}
                      value={phase.phase}
                      onChange={(e) => updatePhase(phase.id, 'phase', e.target.value)}
                      placeholder="e.g., Pilot Phase"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`duration-${phase.id}`}>Duration</Label>
                    <Input
                      id={`duration-${phase.id}`}
                      value={phase.duration}
                      onChange={(e) => updatePhase(phase.id, 'duration', e.target.value)}
                      placeholder="e.g., 4-6 weeks"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => removePhase(phase.id)} 
                  variant="outline" 
                  size="sm"
                  className="text-destructive hover:text-destructive ml-4"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label htmlFor={`scope-${phase.id}`}>Scope & Target Users</Label>
                <Textarea
                  id={`scope-${phase.id}`}
                  value={phase.scope}
                  onChange={(e) => updatePhase(phase.id, 'scope', e.target.value)}
                  placeholder="Define which departments, processes, or user groups will be included in this phase..."
                  rows={2}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`goals-${phase.id}`} className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Phase Goals
                  </Label>
                  <Textarea
                    id={`goals-${phase.id}`}
                    value={phase.goals}
                    onChange={(e) => updatePhase(phase.id, 'goals', e.target.value)}
                    placeholder="What do you want to achieve in this phase?"
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div>
                  <Label htmlFor={`criteria-${phase.id}`} className="flex items-center gap-1">
                    Success Criteria
                  </Label>
                  <Textarea
                    id={`criteria-${phase.id}`}
                    value={phase.criteria}
                    onChange={(e) => updatePhase(phase.id, 'criteria', e.target.value)}
                    placeholder="How will you measure success? KPIs, metrics, thresholds..."
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`risks-${phase.id}`}>Phase-Specific Risks</Label>
                <Textarea
                  id={`risks-${phase.id}`}
                  value={phase.risks}
                  onChange={(e) => updatePhase(phase.id, 'risks', e.target.value)}
                  placeholder="What could go wrong in this phase? Mitigation strategies..."
                  rows={2}
                  className="resize-none"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="changeManagement" className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4" />
            Change Management Strategy
          </Label>
          <Textarea
            id="changeManagement"
            value={changeManagement}
            onChange={(e) => setChangeManagement(e.target.value)}
            placeholder="How will you manage organizational change? Training programs, communication plans, resistance handling..."
            rows={6}
            className="resize-none"
          />
          <div className="text-sm text-muted-foreground">
            Include stakeholder communication, training schedules, and support resources.
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="successMetrics" className="text-base font-semibold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Success Metrics & KPIs
          </Label>
          <Textarea
            id="successMetrics"
            value={successMetrics}
            onChange={(e) => setSuccessMetrics(e.target.value)}
            placeholder="Define how you'll measure overall rollout success. Include adoption rates, performance metrics, business impact..."
            rows={6}
            className="resize-none"
          />
          <div className="text-sm text-muted-foreground">
            Set measurable targets for user adoption, system performance, and business value.
          </div>
        </div>
      </div>
    </div>
  );
};