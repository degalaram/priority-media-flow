import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Terminal, Send, LayoutDashboard, BookOpen, Download, FileText } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { href: "/", label: "Submit Job", icon: Send },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/docs", label: "Docs", icon: BookOpen },
  ];
  
  const handleDownloadPPT = () => {
    window.open('/Priority_Media_Processor_Presentation.html', '_blank');
  };

  const handleDownloadBackend = () => {
    window.open('/django_backend/README.md', '_blank');
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 flex h-14 sm:h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:glow-primary transition-all duration-300">
            <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm font-semibold text-foreground">
              Priority Media Processor
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
              Backend Demo v1.0
            </span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Download PPT Button */}
          <button
            onClick={handleDownloadPPT}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Open Presentation (Print to PDF)"
          >
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">PPT</span>
          </button>

          {/* Download Backend Code */}
          <button
            onClick={handleDownloadBackend}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm transition-all duration-200 text-accent hover:text-foreground hover:bg-accent/10"
            title="View Django Backend Code"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Code</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
