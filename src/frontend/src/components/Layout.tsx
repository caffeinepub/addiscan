import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Heart, Scan, Settings2 } from "lucide-react";
import type React from "react";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navLinks: Array<{
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    ocid?: string;
  }> = [
    { to: "/", label: "Scan", icon: Scan },
    { to: "/encyclopedia", label: "Encyclopedia", icon: BookOpen },
    { to: "/admin", label: "Admin", icon: Settings2, ocid: "nav.admin_link" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="AddiScan logo"
                className="w-9 h-9 rounded-lg object-contain"
              />
              <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                AddiScan
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, ocid }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    data-ocid={ocid}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="AddiScan"
                className="w-5 h-5 rounded object-contain opacity-60"
              />
              <span className="font-medium text-foreground">AddiScan</span>
              <span>— Know what's in your food.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>© {new Date().getFullYear()} · Built with</span>
              <Heart className="w-3.5 h-3.5 text-safe fill-safe mx-0.5" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "addiscan")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
