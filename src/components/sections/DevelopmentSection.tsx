import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Database, Cloud, Zap, Settings } from "lucide-react";

interface DevelopmentSectionProps {
  techStack: string;
  setTechStack: (stack: string) => void;
  apiIntegrations: string;
  setApiIntegrations: (apis: string) => void;
  dataFlow: string;
  setDataFlow: (flow: string) => void;
  architecture: string;
  setArchitecture: (arch: string) => void;
  developmentPhases: string;
  setDevelopmentPhases: (phases: string) => void;
}

export const DevelopmentSection = ({ 
  techStack, 
  setTechStack,
  apiIntegrations,
  setApiIntegrations,
  dataFlow,
  setDataFlow,
  architecture,
  setArchitecture,
  developmentPhases,
  setDevelopmentPhases
}: DevelopmentSectionProps) => {
  const techStackTemplates = [
    {
      name: "Cloud-Native Microservices",
      description: "Node.js/Python, Docker, Kubernetes, Redis, PostgreSQL",
      stack: "Backend: Node.js/Express or Python/FastAPI\nDatabase: PostgreSQL/MongoDB\nCache: Redis\nQueue: RabbitMQ/Apache Kafka\nContainers: Docker + Kubernetes\nCloud: AWS/Azure/GCP\nMonitoring: Prometheus + Grafana"
    },
    {
      name: "Enterprise Integration",
      description: "Java Spring, Oracle/SQL Server, Enterprise Service Bus",
      stack: "Backend: Java Spring Boot\nDatabase: Oracle/SQL Server\nIntegration: MuleSoft/Apache Camel\nMessage Queue: IBM MQ/ActiveMQ\nSecurity: OAuth 2.0/SAML\nMonitoring: Splunk/New Relic"
    },
    {
      name: "Serverless & AI-Powered",
      description: "AWS Lambda, OpenAI APIs, DynamoDB, Event-driven",
      stack: "Compute: AWS Lambda/Azure Functions\nDatabase: DynamoDB/CosmosDB\nAI/ML: OpenAI API/AWS Bedrock\nEvents: EventBridge/Service Bus\nStorage: S3/Blob Storage\nAPI Gateway: AWS API Gateway"
    }
  ];

  const commonAPIs = [
    { category: "CRM", apis: "Salesforce API, HubSpot API, Pipedrive API" },
    { category: "ERP", apis: "SAP API, Oracle NetSuite, Microsoft Dynamics" },
    { category: "Communication", apis: "Slack API, Microsoft Teams, Twilio, SendGrid" },
    { category: "Finance", apis: "Stripe API, PayPal API, QuickBooks API, Xero API" },
    { category: "Document", apis: "DocuSign API, Adobe Sign, Google Drive API" },
    { category: "Data", apis: "Google Sheets API, Airtable API, Excel Online API" }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Technology Stack Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {techStackTemplates.map((template, index) => (
              <div key={index} className="p-4 bg-background/60 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge variant="outline">{template.description}</Badge>
                </div>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-muted/30 p-3 rounded">
                  {template.stack}
                </pre>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="techStack" className="text-base font-semibold flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Technology Stack
          </Label>
          <Textarea
            id="techStack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="List programming languages, frameworks, databases, cloud services, and tools you'll use..."
            rows={6}
            className="resize-none font-mono text-sm"
          />
          <div className="text-sm text-muted-foreground">
            Include backend, frontend, database, messaging, monitoring, and deployment technologies.
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="architecture" className="text-base font-semibold flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            System Architecture
          </Label>
          <Textarea
            id="architecture"
            value={architecture}
            onChange={(e) => setArchitecture(e.target.value)}
            placeholder="Describe the overall system design, microservices, data architecture, security layers..."
            rows={6}
            className="resize-none"
          />
          <div className="text-sm text-muted-foreground">
            Cover scalability, reliability, security, and performance considerations.
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Common API Categories
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonAPIs.map((category, index) => (
            <Card key={index} className="p-3">
              <div className="font-medium text-sm mb-2">{category.category}</div>
              <div className="text-xs text-muted-foreground">{category.apis}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="apiIntegrations" className="text-base font-semibold flex items-center gap-2">
          <Database className="w-4 h-4" />
          API Integrations & Data Sources
        </Label>
        <Textarea
          id="apiIntegrations"
          value={apiIntegrations}
          onChange={(e) => setApiIntegrations(e.target.value)}
          placeholder="Detail all APIs, webhooks, and data sources. Include authentication methods, rate limits, data formats..."
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataFlow" className="text-base font-semibold">Data Flow & Processing</Label>
        <Textarea
          id="dataFlow"
          value={dataFlow}
          onChange={(e) => setDataFlow(e.target.value)}
          placeholder="Explain how data moves through the system, transformations, validations, storage, and retrieval patterns..."
          rows={4}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="developmentPhases" className="text-base font-semibold">Development Phases</Label>
        <Textarea
          id="developmentPhases"
          value={developmentPhases}
          onChange={(e) => setDevelopmentPhases(e.target.value)}
          placeholder="Break down development into phases: Phase 1 (Core automation), Phase 2 (Advanced features), Phase 3 (Scale & optimize)..."
          rows={5}
          className="resize-none"
        />
        <div className="text-sm text-muted-foreground">
          Include timelines, milestones, testing phases, and deployment strategies for each phase.
        </div>
      </div>
    </div>
  );
};