import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Building } from "lucide-react";

interface StakeholdersSectionProps {
  primaryStakeholders: string;
  setPrimaryStakeholders: (stakeholders: string) => void;
  beneficiaries: string;
  setBeneficiaries: (beneficiaries: string) => void;
  impactedRoles: string;
  setImpactedRoles: (roles: string) => void;
}

export const StakeholdersSection = ({ 
  primaryStakeholders, 
  setPrimaryStakeholders,
  beneficiaries,
  setBeneficiaries,
  impactedRoles,
  setImpactedRoles
}: StakeholdersSectionProps) => {
  const stakeholderExamples = [
    "Finance Manager", "Accounts Payable", "CFO", "Operations Manager",
    "Sales Director", "Account Managers", "Customer Success", "IT Admin",
    "Procurement Manager", "Vendor Relations", "Compliance Officer"
  ];

  const beneficiaryTypes = [
    "Direct Users", "Management", "Customers", "Partners", "Vendors", 
    "IT Department", "Compliance Team", "Executive Leadership"
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Primary Users</h3>
            <p className="text-sm text-muted-foreground">Who will use the system daily?</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <UserCheck className="w-8 h-8 text-success mx-auto mb-2" />
            <h3 className="font-medium">Beneficiaries</h3>
            <p className="text-sm text-muted-foreground">Who benefits from the automation?</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Building className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-medium">Impacted Roles</h3>
            <p className="text-sm text-muted-foreground">Whose workflows will change?</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <Label htmlFor="primary" className="text-base font-medium">Primary Stakeholders</Label>
        <Textarea
          id="primary"
          placeholder="List the main users who will interact with the automation system daily (roles, departments, responsibilities)..."
          value={primaryStakeholders}
          onChange={(e) => setPrimaryStakeholders(e.target.value)}
          rows={4}
        />
        <div className="flex flex-wrap gap-1">
          {stakeholderExamples.map((example, index) => (
            <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary/10" 
                   onClick={() => {
                     const current = primaryStakeholders;
                     const toAdd = current ? `, ${example}` : example;
                     setPrimaryStakeholders(current + toAdd);
                   }}>
              {example}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="beneficiaries" className="text-base font-medium">Key Beneficiaries</Label>
        <Textarea
          id="beneficiaries"
          placeholder="Describe who benefits from this automation and how (time savings, reduced errors, better insights, etc.)..."
          value={beneficiaries}
          onChange={(e) => setBeneficiaries(e.target.value)}
          rows={4}
        />
        <div className="flex flex-wrap gap-1">
          {beneficiaryTypes.map((type, index) => (
            <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-success/10"
                   onClick={() => {
                     const current = beneficiaries;
                     const toAdd = current ? `, ${type}` : type;
                     setBeneficiaries(current + toAdd);
                   }}>
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="impacted" className="text-base font-medium">Impacted Roles & Departments</Label>
        <Textarea
          id="impacted"
          placeholder="Detail how different roles and departments will be affected by this automation..."
          value={impactedRoles}
          onChange={(e) => setImpactedRoles(e.target.value)}
          rows={3}
        />
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Stakeholder Analysis Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Be specific:</strong> Include job titles, departments, and team sizes</li>
            <li>• <strong>Show impact:</strong> Explain how each group benefits or is affected</li>
            <li>• <strong>Consider hierarchy:</strong> Include both end-users and decision-makers</li>
            <li>• <strong>Think broader:</strong> Consider customers, vendors, and partners too</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};