import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Terminal, Send, LayoutDashboard } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { href: "/", label: "Submit Job", icon: Send },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:glow-primary transition-all duration-300">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-semibold text-foreground">
              Priority Media Processor
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Backend Demo v1.0
            </span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
