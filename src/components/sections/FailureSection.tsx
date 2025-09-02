import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, AlertTriangle, RefreshCw, Shield, Zap } from "lucide-react";

interface FailureSectionProps {
  failureModes: Array<{
    id: string;
    scenario: string;
    impact: string;
    probability: string;
    detection: string;
    recovery: string;
    prevention: string;
  }>;
  setFailureModes: (modes: Array<{
    id: string;
    scenario: string;
    impact: string;
    probability: string;
    detection: string;
    recovery: string;
    prevention: string;
  }>) => void;
  monitoringStrategy: string;
  setMonitoringStrategy: (strategy: string) => void;
}

export const FailureSection = ({ 
  failureModes,
  setFailureModes,
  monitoringStrategy,
  setMonitoringStrategy
}: FailureSectionProps) => {
  const addFailureMode = () => {
    const newMode = {
      id: Date.now().toString(),
      scenario: '',
      impact: '',
      probability: '',
      detection: '',
      recovery: '',
      prevention: ''
    };
    setFailureModes([...failureModes, newMode]);
  };

  const removeFailureMode = (id: string) => {
    setFailureModes(failureModes.filter(mode => mode.id !== id));
  };

  const updateFailureMode = (id: string, field: string, value: string) => {
    setFailureModes(failureModes.map(mode => 
      mode.id === id ? { ...mode, [field]: value } : mode
    ));
  };

  const probabilityLevels = ['Low', 'Medium', 'High', 'Critical'];
  const impactLevels = ['Minor', 'Moderate', 'Major', 'Severe'];

  const commonFailures = [
    {
      scenario: "API Service Downtime",
      impact: "Automation stops, manual fallback required",
      probability: "Medium",
      detection: "Health checks, status monitoring",
      recovery: "Retry logic, failover to backup service",
      prevention: "Multiple API providers, circuit breakers"
    },
    {
      scenario: "Data Validation Failure",
      impact: "Incorrect processing, potential data corruption",
      probability: "High",
      detection: "Data quality checks, validation rules",
      recovery: "Quarantine bad data, manual review process",
      prevention: "Robust validation, data cleansing pipelines"
    },
    {
      scenario: "Authentication Token Expiry",
      impact: "System access denied, process interruption",
      probability: "Medium",
      detection: "Token validation, expiry monitoring",
      recovery: "Automatic token refresh, re-authentication",
      prevention: "Proactive token renewal, refresh logic"
    }
  ];

  const getRiskLevel = (probability: string, impact: string) => {
    const probScore = ['Low', 'Medium', 'High', 'Critical'].indexOf(probability);
    const impactScore = ['Minor', 'Moderate', 'Major', 'Severe'].indexOf(impact);
    const riskScore = probScore + impactScore;
    
    if (riskScore >= 5) return { level: 'Critical', color: 'destructive' };
    if (riskScore >= 3) return { level: 'High', color: 'secondary' };
    if (riskScore >= 1) return { level: 'Medium', color: 'outline' };
    return { level: 'Low', color: 'outline' };
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Common Failure Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commonFailures.map((failure, index) => (
              <div key={index} className="p-4 bg-background/60 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{failure.scenario}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {failure.probability} Probability
                    </Badge>
                    <Badge variant={getRiskLevel(failure.probability, 'Major').color as any}>
                      {getRiskLevel(failure.probability, 'Major').level} Risk
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="font-medium text-destructive">Impact:</div>
                    <div className="text-muted-foreground">{failure.impact}</div>
                  </div>
                  <div>
                    <div className="font-medium text-warning">Detection:</div>
                    <div className="text-muted-foreground">{failure.detection}</div>
                  </div>
                  <div>
                    <div className="font-medium text-success">Recovery:</div>
                    <div className="text-muted-foreground">{failure.recovery}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Failure Mode Analysis</Label>
          <Button onClick={addFailureMode} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Failure Mode
          </Button>
        </div>

        {failureModes.map((mode) => (
          <Card key={mode.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Failure Scenario</h4>
                <Button 
                  onClick={() => removeFailureMode(mode.id)} 
                  variant="outline" 
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`scenario-${mode.id}`}>Failure Scenario</Label>
                  <Input
                    id={`scenario-${mode.id}`}
                    value={mode.scenario}
                    onChange={(e) => updateFailureMode(mode.id, 'scenario', e.target.value)}
                    placeholder="e.g., Database connection timeout"
                  />
                </div>
                <div>
                  <Label htmlFor={`probability-${mode.id}`}>Probability</Label>
                  <Select onValueChange={(value) => updateFailureMode(mode.id, 'probability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select probability" />
                    </SelectTrigger>
                    <SelectContent>
                      {probabilityLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  {mode.probability && mode.impact && (
                    <Badge variant={getRiskLevel(mode.probability, mode.impact).color as any}>
                      {getRiskLevel(mode.probability, mode.impact).level} Risk
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor={`impact-${mode.id}`}>Business Impact</Label>
                <Textarea
                  id={`impact-${mode.id}`}
                  value={mode.impact}
                  onChange={(e) => updateFailureMode(mode.id, 'impact', e.target.value)}
                  placeholder="Describe the business consequences, financial impact, operational disruption..."
                  rows={2}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`detection-${mode.id}`} className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Detection Method
                  </Label>
                  <Textarea
                    id={`detection-${mode.id}`}
                    value={mode.detection}
                    onChange={(e) => updateFailureMode(mode.id, 'detection', e.target.value)}
                    placeholder="How will this failure be detected?"
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div>
                  <Label htmlFor={`recovery-${mode.id}`} className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Recovery Strategy
                  </Label>
                  <Textarea
                    id={`recovery-${mode.id}`}
                    value={mode.recovery}
                    onChange={(e) => updateFailureMode(mode.id, 'recovery', e.target.value)}
                    placeholder="How will the system recover?"
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div>
                  <Label htmlFor={`prevention-${mode.id}`} className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Prevention Measures
                  </Label>
                  <Textarea
                    id={`prevention-${mode.id}`}
                    value={mode.prevention}
                    onChange={(e) => updateFailureMode(mode.id, 'prevention', e.target.value)}
                    placeholder="How can this be prevented?"
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="monitoringStrategy" className="text-base font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Monitoring & Alerting Strategy
        </Label>
        <Textarea
          id="monitoringStrategy"
          value={monitoringStrategy}
          onChange={(e) => setMonitoringStrategy(e.target.value)}
          placeholder="Describe monitoring tools, alert thresholds, escalation procedures, dashboards, and key metrics to track system health..."
          rows={4}
          className="resize-none"
        />
        <div className="text-sm text-muted-foreground">
          Include performance metrics, error rates, availability monitoring, and notification channels.
        </div>
      </div>
    </div>
  );
};