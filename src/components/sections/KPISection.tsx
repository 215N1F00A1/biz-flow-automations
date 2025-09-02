import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

interface KPISectionProps {
  kpiMetrics: Array<{id: string; metric: string; current: string; target: string; impact: string}>;
  setKpiMetrics: (metrics: Array<{id: string; metric: string; current: string; target: string; impact: string}>) => void;
  businessImpact: string;
  setBusinessImpact: (impact: string) => void;
}

export const KPISection = ({ 
  kpiMetrics, 
  setKpiMetrics, 
  businessImpact, 
  setBusinessImpact 
}: KPISectionProps) => {
  const addKPI = () => {
    const newKPI = {
      id: Date.now().toString(),
      metric: '',
      current: '',
      target: '',
      impact: ''
    };
    setKpiMetrics([...kpiMetrics, newKPI]);
  };

  const removeKPI = (id: string) => {
    setKpiMetrics(kpiMetrics.filter(kpi => kpi.id !== id));
  };

  const updateKPI = (id: string, field: string, value: string) => {
    setKpiMetrics(kpiMetrics.map(kpi => 
      kpi.id === id ? { ...kpi, [field]: value } : kpi
    ));
  };

  const kpiTemplates = [
    { metric: "Processing Time", current: "4 hours per transaction", target: "15 minutes per transaction", impact: "87.5% time reduction" },
    { metric: "Error Rate", current: "12% manual errors", target: "1% automated errors", impact: "91% error reduction" },
    { metric: "Cost per Transaction", current: "$25 per transaction", target: "$3 per transaction", impact: "$22 cost savings per transaction" }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            KPI Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {kpiTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/60 rounded-lg border">
                <div className="flex-1">
                  <div className="font-medium">{template.metric}</div>
                  <div className="text-sm text-muted-foreground">
                    {template.current} → {template.target}
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  {template.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Key Performance Indicators</Label>
          <Button onClick={addKPI} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add KPI
          </Button>
        </div>

        {kpiMetrics.map((kpi) => (
          <Card key={kpi.id} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor={`metric-${kpi.id}`}>Metric Name</Label>
                <Input
                  id={`metric-${kpi.id}`}
                  value={kpi.metric}
                  onChange={(e) => updateKPI(kpi.id, 'metric', e.target.value)}
                  placeholder="e.g., Processing Time"
                />
              </div>
              <div>
                <Label htmlFor={`current-${kpi.id}`}>Current State</Label>
                <Input
                  id={`current-${kpi.id}`}
                  value={kpi.current}
                  onChange={(e) => updateKPI(kpi.id, 'current', e.target.value)}
                  placeholder="e.g., 4 hours"
                />
              </div>
              <div>
                <Label htmlFor={`target-${kpi.id}`}>Target State</Label>
                <Input
                  id={`target-${kpi.id}`}
                  value={kpi.target}
                  onChange={(e) => updateKPI(kpi.id, 'target', e.target.value)}
                  placeholder="e.g., 15 minutes"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor={`impact-${kpi.id}`}>Impact</Label>
                  <Input
                    id={`impact-${kpi.id}`}
                    value={kpi.impact}
                    onChange={(e) => updateKPI(kpi.id, 'impact', e.target.value)}
                    placeholder="e.g., 87% reduction"
                  />
                </div>
                <Button 
                  onClick={() => removeKPI(kpi.id)} 
                  variant="outline" 
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessImpact" className="text-base font-semibold">Overall Business Impact</Label>
        <Textarea
          id="businessImpact"
          value={businessImpact}
          onChange={(e) => setBusinessImpact(e.target.value)}
          placeholder="Describe the cumulative business value, ROI expectations, and strategic benefits..."
          rows={4}
          className="resize-none"
        />
        <div className="text-sm text-muted-foreground">
          Include quantified benefits like annual cost savings, efficiency gains, and competitive advantages.
        </div>
      </div>
    </div>
  );
};