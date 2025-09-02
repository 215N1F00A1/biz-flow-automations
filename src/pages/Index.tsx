import { DocumentSection } from "@/components/DocumentSection";
import { ProgressTracker } from "@/components/ProgressTracker";
import { TitleSection } from "@/components/sections/TitleSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { StakeholdersSection } from "@/components/sections/StakeholdersSection";
import { KPISection } from "@/components/sections/KPISection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { DevelopmentSection } from "@/components/sections/DevelopmentSection";
import { FailureSection } from "@/components/sections/FailureSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { RolloutSection } from "@/components/sections/RolloutSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Zap, Target, Users, BarChart3, Cog, AlertTriangle, Shield, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-automation.jpg";

const Index = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [evidenceType, setEvidenceType] = useState("");
  const [evidenceDetails, setEvidenceDetails] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [primaryStakeholders, setPrimaryStakeholders] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [impactedRoles, setImpactedRoles] = useState("");
  
  // KPI Section
  const [kpiMetrics, setKpiMetrics] = useState<Array<{id: string; metric: string; current: string; target: string; impact: string}>>([]);
  const [businessImpact, setBusinessImpact] = useState("");
  
  // Workflow Section
  const [workflowSteps, setWorkflowSteps] = useState<Array<{id: string; stepNumber: number; title: string; description: string; trigger: string; systems: string[]; duration: string}>>([]);
  const [systemsInvolved, setSystemsInvolved] = useState("");
  
  // Development Section
  const [techStack, setTechStack] = useState("");
  const [apiIntegrations, setApiIntegrations] = useState("");
  const [dataFlow, setDataFlow] = useState("");
  const [architecture, setArchitecture] = useState("");
  const [developmentPhases, setDevelopmentPhases] = useState("");
  
  // Failure Section
  const [failureModes, setFailureModes] = useState<Array<{id: string; scenario: string; impact: string; probability: string; detection: string; recovery: string; prevention: string}>>([]);
  const [monitoringStrategy, setMonitoringStrategy] = useState("");
  
  // Security Section
  const [dataClassification, setDataClassification] = useState("");
  const [securityMeasures, setSecurityMeasures] = useState("");
  const [privacyCompliance, setPrivacyCompliance] = useState("");
  const [accessControls, setAccessControls] = useState("");
  const [securityChecklist, setSecurityChecklist] = useState<string[]>([]);
  
  // Rollout Section
  const [rolloutPhases, setRolloutPhases] = useState<Array<{id: string; phase: string; duration: string; scope: string; goals: string; criteria: string; risks: string}>>([]);
  const [changeManagement, setChangeManagement] = useState("");
  const [successMetrics, setSuccessMetrics] = useState("");

  // Progress tracking
  const [currentSection, setCurrentSection] = useState(1);
  const [completedSections, setCompletedSections] = useState(0);

  const sections = [
    { id: 1, title: "Title & Summary", icon: FileText, description: "Define your automation use case" },
    { id: 2, title: "Problem & Evidence", icon: Target, description: "Document the business challenge" },
    { id: 3, title: "Stakeholders", icon: Users, description: "Identify who's involved and benefits" },
    { id: 4, title: "KPIs & Impact", icon: BarChart3, description: "Quantify measurable improvements" },
    { id: 5, title: "Multi-Step Use Case", icon: Zap, description: "Map the complete workflow" },
    { id: 6, title: "Development Approach", icon: Cog, description: "Technical implementation plan" },
    { id: 7, title: "Failure Modes", icon: AlertTriangle, description: "Risk analysis and recovery" },
    { id: 8, title: "Security & Privacy", icon: Shield, description: "Data protection considerations" },
    { id: 9, title: "Rollout Plan", icon: Rocket, description: "Phased implementation strategy" }
  ];

  // Calculate completion
  useEffect(() => {
    let completed = 0;
    if (title && summary) completed++;
    if (problemDescription && evidenceDetails && selectedDepartment) completed++;
    if (primaryStakeholders && beneficiaries) completed++;
    if (kpiMetrics.length > 0 && businessImpact) completed++;
    if (workflowSteps.length > 0 && systemsInvolved) completed++;
    if (techStack && apiIntegrations && dataFlow) completed++;
    if (failureModes.length > 0 && monitoringStrategy) completed++;
    if (dataClassification && securityMeasures && privacyCompliance) completed++;
    if (rolloutPhases.length > 0 && changeManagement) completed++;
    
    setCompletedSections(completed);
  }, [title, summary, problemDescription, evidenceDetails, selectedDepartment, primaryStakeholders, beneficiaries, kpiMetrics, businessImpact, workflowSteps, systemsInvolved, techStack, apiIntegrations, dataFlow, failureModes, monitoringStrategy, dataClassification, securityMeasures, privacyCompliance, rolloutPhases, changeManagement]);

  const exportDocument = () => {
    const doc = {
      // Section 1: Title & Summary
      title,
      summary,
      
      // Section 2: Problem & Evidence
      problemDescription,
      evidenceType,
      evidenceDetails,
      selectedDepartment,
      painPoints,
      
      // Section 3: Stakeholders
      primaryStakeholders,
      beneficiaries,
      impactedRoles,
      
      // Section 4: KPIs & Impact
      kpiMetrics,
      businessImpact,
      
      // Section 5: Multi-Step Use Case
      workflowSteps,
      systemsInvolved,
      
      // Section 6: Development Approach
      techStack,
      apiIntegrations,
      dataFlow,
      architecture,
      developmentPhases,
      
      // Section 7: Failure Modes
      failureModes,
      monitoringStrategy,
      
      // Section 8: Security & Privacy
      dataClassification,
      securityMeasures,
      privacyCompliance,
      accessControls,
      securityChecklist,
      
      // Section 9: Rollout Plan
      rolloutPhases,
      changeManagement,
      successMetrics,
      
      // Metadata
      exportedAt: new Date().toISOString(),
      completedSections,
      totalSections: sections.length
    };
    
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'b2b-automation-use-case.json';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative bg-gradient-hero">
          <div className="container mx-auto px-4 py-16 text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Assignment Builder
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              B2B Automation Use Case
              <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
                Documentation Assistant
              </span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Build a professional, comprehensive automation use case that demonstrates 
              real-world business value and technical feasibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                Multi-step Workflows
              </Badge>
              <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                Measurable Impact
              </Badge>
              <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                B2B Focused
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <ProgressTracker 
              completedSections={completedSections}
              totalSections={sections.length}
              currentSection={currentSection}
            />
            
            <Card className="mt-6 shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm">Document Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <div 
                    key={section.id}
                    className={`flex items-center gap-2 p-2 rounded-md text-sm cursor-pointer transition-colors ${
                      currentSection === section.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setCurrentSection(section.id)}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="truncate">{section.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Build Your Use Case</h2>
                <p className="text-muted-foreground">
                  Follow the structured approach to create a compelling automation proposal
                </p>
              </div>
              <Button onClick={exportDocument} variant="professional" className="gap-2">
                <Download className="w-4 h-4" />
                Export Document
              </Button>
            </div>

            <Separator />

            {/* Section 1: Title & Summary */}
            <DocumentSection
              number={1}
              title="Title & One-Line Summary"
              description="Create a clear, impactful title and concise problem statement"
              isActive={currentSection === 1}
              isCompleted={!!(title && summary)}
            >
              <TitleSection 
                title={title}
                setTitle={setTitle}
                summary={summary}
                setSummary={setSummary}
              />
            </DocumentSection>

            {/* Section 2: Problem & Evidence */}
            <DocumentSection
              number={2}
              title="Problem & Evidence"
              description="Document the operational challenge with credible proof"
              isActive={currentSection === 2}
              isCompleted={!!(problemDescription && evidenceDetails && selectedDepartment)}
            >
              <ProblemSection
                problemDescription={problemDescription}
                setProblemDescription={setProblemDescription}
                evidenceType={evidenceType}
                setEvidenceType={setEvidenceType}
                evidenceDetails={evidenceDetails}
                setEvidenceDetails={setEvidenceDetails}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                painPoints={painPoints}
                setPainPoints={setPainPoints}
              />
            </DocumentSection>

            {/* Section 3: Stakeholders */}
            <DocumentSection
              number={3}
              title="Stakeholders"
              description="Identify who's involved, who benefits, and who's impacted"
              isActive={currentSection === 3}
              isCompleted={!!(primaryStakeholders && beneficiaries)}
            >
              <StakeholdersSection
                primaryStakeholders={primaryStakeholders}
                setPrimaryStakeholders={setPrimaryStakeholders}
                beneficiaries={beneficiaries}
                setBeneficiaries={setBeneficiaries}
                impactedRoles={impactedRoles}
                setImpactedRoles={setImpactedRoles}
              />
            </DocumentSection>

            {/* Section 4: KPIs & Impact */}
            <DocumentSection
              number={4}
              title="KPIs & Impact"
              description="Quantify measurable improvements and business value"
              isActive={currentSection === 4}
              isCompleted={!!(kpiMetrics.length > 0 && businessImpact)}
            >
              <KPISection
                kpiMetrics={kpiMetrics}
                setKpiMetrics={setKpiMetrics}
                businessImpact={businessImpact}
                setBusinessImpact={setBusinessImpact}
              />
            </DocumentSection>

            {/* Section 5: Multi-Step Use Case */}
            <DocumentSection
              number={5}
              title="Multi-Step Use Case"
              description="Map the complete workflow and system interactions"
              isActive={currentSection === 5}
              isCompleted={!!(workflowSteps.length > 0 && systemsInvolved)}
            >
              <WorkflowSection
                workflowSteps={workflowSteps}
                setWorkflowSteps={setWorkflowSteps}
                systemsInvolved={systemsInvolved}
                setSystemsInvolved={setSystemsInvolved}
              />
            </DocumentSection>

            {/* Section 6: Development Approach */}
            <DocumentSection
              number={6}
              title="Development Approach"
              description="Technical implementation plan and architecture"
              isActive={currentSection === 6}
              isCompleted={!!(techStack && apiIntegrations && dataFlow)}
            >
              <DevelopmentSection
                techStack={techStack}
                setTechStack={setTechStack}
                apiIntegrations={apiIntegrations}
                setApiIntegrations={setApiIntegrations}
                dataFlow={dataFlow}
                setDataFlow={setDataFlow}
                architecture={architecture}
                setArchitecture={setArchitecture}
                developmentPhases={developmentPhases}
                setDevelopmentPhases={setDevelopmentPhases}
              />
            </DocumentSection>

            {/* Section 7: Failure Modes */}
            <DocumentSection
              number={7}
              title="Failure Modes"
              description="Risk analysis and recovery strategies"
              isActive={currentSection === 7}
              isCompleted={!!(failureModes.length > 0 && monitoringStrategy)}
            >
              <FailureSection
                failureModes={failureModes}
                setFailureModes={setFailureModes}
                monitoringStrategy={monitoringStrategy}
                setMonitoringStrategy={setMonitoringStrategy}
              />
            </DocumentSection>

            {/* Section 8: Security & Privacy */}
            <DocumentSection
              number={8}
              title="Security & Privacy"
              description="Data protection and compliance considerations"
              isActive={currentSection === 8}
              isCompleted={!!(dataClassification && securityMeasures && privacyCompliance)}
            >
              <SecuritySection
                dataClassification={dataClassification}
                setDataClassification={setDataClassification}
                securityMeasures={securityMeasures}
                setSecurityMeasures={setSecurityMeasures}
                privacyCompliance={privacyCompliance}
                setPrivacyCompliance={setPrivacyCompliance}
                accessControls={accessControls}
                setAccessControls={setAccessControls}
                securityChecklist={securityChecklist}
                setSecurityChecklist={setSecurityChecklist}
              />
            </DocumentSection>

            {/* Section 9: Rollout Plan */}
            <DocumentSection
              number={9}
              title="Rollout Plan"
              description="Phased implementation and change management strategy"
              isActive={currentSection === 9}
              isCompleted={!!(rolloutPhases.length > 0 && changeManagement)}
            >
              <RolloutSection
                rolloutPhases={rolloutPhases}
                setRolloutPhases={setRolloutPhases}
                changeManagement={changeManagement}
                setChangeManagement={setChangeManagement}
                successMetrics={successMetrics}
                setSuccessMetrics={setSuccessMetrics}
              />
            </DocumentSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
