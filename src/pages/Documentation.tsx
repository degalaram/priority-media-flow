import { Header } from "@/components/Header";
import { DatabaseSchema } from "@/components/DatabaseSchema";
import { ApiDocumentation } from "@/components/ApiDocumentation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-mono text-2xl font-bold text-foreground">
            Technical Documentation
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            API specs, database schema, and architecture overview
          </p>
        </div>
        
        {/* Architecture Diagram */}
        <ArchitectureDiagram />
        
        {/* API Documentation */}
        <ApiDocumentation />
        
        {/* Database Schema */}
        <DatabaseSchema />
      </main>
    </div>
  );
};

export default Documentation;
