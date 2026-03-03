import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  FlaskConical,
  Heart,
  ScanLine,
  Settings2,
} from "lucide-react";
import type React from "react";
import { useGetAllAdditives } from "../hooks/useQueries";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  // Trigger auto-seeding of default additives when the app first loads
  useGetAllAdditives();

  const navLinks: Array<{
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    ocid: string;
  }> = [
    { to: "/", label: "Scan", icon: ScanLine, ocid: "scan.tab" },
    {
      to: "/encyclopedia",
      label: "Encyclopedia",
      icon: BookOpen,
      ocid: "encyclopedia.tab",
    },
    { to: "/admin", label: "Admin", icon: Settings2, ocid: "admin.tab" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              data-ocid="nav.scan.link"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FlaskConical className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                Addi<span className="text-primary">Scan</span>
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-0.5">
              {navLinks.map(({ to, label, icon: Icon, ocid }) => {
                const isActive =
                  to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    data-ocid={ocid}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
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
      <footer className="border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium text-foreground/60">AddiScan</span>
              <span className="text-muted-foreground/60">·</span>
              <span>Know what's in your food</span>
            </div>
            <div className="flex items-center gap-1">
              <span>© {new Date().getFullYear()} · Built with</span>
              <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" />
              <span>using</span>
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
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
