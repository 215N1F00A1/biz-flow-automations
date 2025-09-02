import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Eye, AlertTriangle, FileCheck } from "lucide-react";

interface SecuritySectionProps {
  dataClassification: string;
  setDataClassification: (classification: string) => void;
  securityMeasures: string;
  setSecurityMeasures: (measures: string) => void;
  privacyCompliance: string;
  setPrivacyCompliance: (compliance: string) => void;
  accessControls: string;
  setAccessControls: (controls: string) => void;
  securityChecklist: string[];
  setSecurityChecklist: (checklist: string[]) => void;
}

export const SecuritySection = ({ 
  dataClassification,
  setDataClassification,
  securityMeasures,
  setSecurityMeasures,
  privacyCompliance,
  setPrivacyCompliance,
  accessControls,
  setAccessControls,
  securityChecklist,
  setSecurityChecklist
}: SecuritySectionProps) => {
  const securityRequirements = [
    "Data encryption at rest and in transit",
    "Multi-factor authentication (MFA)",
    "Role-based access control (RBAC)",
    "API rate limiting and throttling",
    "Audit logging for all operations",
    "Regular security vulnerability scans",
    "Data backup and disaster recovery",
    "GDPR/CCPA compliance measures",
    "Network security and VPN access",
    "Secure API key management",
    "Database connection security",
    "File upload validation and scanning"
  ];

  const complianceFrameworks = [
    { name: "GDPR", description: "European data protection regulation" },
    { name: "CCPA", description: "California consumer privacy act" },
    { name: "SOC 2", description: "Security and availability controls" },
    { name: "ISO 27001", description: "Information security management" },
    { name: "HIPAA", description: "Healthcare data protection (if applicable)" },
    { name: "PCI DSS", description: "Payment card industry standards" }
  ];

  const dataTypes = [
    { type: "Public", risk: "Low", description: "Marketing content, public documentation" },
    { type: "Internal", risk: "Medium", description: "Employee data, internal processes" },
    { type: "Confidential", risk: "High", description: "Financial records, customer PII" },
    { type: "Restricted", risk: "Critical", description: "Trade secrets, payment information" }
  ];

  const handleChecklistChange = (item: string, checked: boolean) => {
    if (checked) {
      setSecurityChecklist([...securityChecklist, item]);
    } else {
      setSecurityChecklist(securityChecklist.filter(i => i !== item));
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security & Compliance Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Data Classification
              </h4>
              <div className="space-y-2">
                {dataTypes.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background/60 rounded border">
                    <div>
                      <span className="font-medium">{data.type}</span>
                      <div className="text-xs text-muted-foreground">{data.description}</div>
                    </div>
                    <Badge variant={data.risk === 'Critical' ? 'destructive' : data.risk === 'High' ? 'secondary' : 'outline'}>
                      {data.risk} Risk
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Compliance Standards
              </h4>
              <div className="space-y-2">
                {complianceFrameworks.map((framework, index) => (
                  <div key={index} className="p-2 bg-background/60 rounded border">
                    <div className="font-medium text-sm">{framework.name}</div>
                    <div className="text-xs text-muted-foreground">{framework.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="dataClassification" className="text-base font-semibold flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Data Classification & Sensitivity
        </Label>
        <Textarea
          id="dataClassification"
          value={dataClassification}
          onChange={(e) => setDataClassification(e.target.value)}
          placeholder="Classify the types of data handled: PII, financial records, business secrets. Assess sensitivity levels and regulatory requirements..."
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="securityMeasures" className="text-base font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Security Measures & Controls
        </Label>
        <Textarea
          id="securityMeasures"
          value={securityMeasures}
          onChange={(e) => setSecurityMeasures(e.target.value)}
          placeholder="Detail encryption methods, authentication mechanisms, network security, secure coding practices, vulnerability management..."
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accessControls" className="text-base font-semibold">Access Controls & Authorization</Label>
        <Textarea
          id="accessControls"
          value={accessControls}
          onChange={(e) => setAccessControls(e.target.value)}
          placeholder="Define user roles, permissions, authentication flows, session management, and authorization policies..."
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="privacyCompliance" className="text-base font-semibold">Privacy & Compliance</Label>
        <Textarea
          id="privacyCompliance"
          value={privacyCompliance}
          onChange={(e) => setPrivacyCompliance(e.target.value)}
          placeholder="Address GDPR, CCPA, and other relevant regulations. Include data retention policies, consent management, right to deletion..."
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Security Requirements Checklist</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityRequirements.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`security-${index}`}
                checked={securityChecklist.includes(requirement)}
                onCheckedChange={(checked) => handleChecklistChange(requirement, !!checked)}
              />
              <Label 
                htmlFor={`security-${index}`}
                className="text-sm font-normal cursor-pointer"
              >
                {requirement}
              </Label>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Select all security measures that will be implemented in your automation solution.
        </div>
      </div>
    </div>
  );
};