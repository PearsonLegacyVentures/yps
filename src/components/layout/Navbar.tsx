import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-card/90 backdrop-blur-xl">
      <div className="content-container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-foreground"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-xs font-bold tracking-tight text-primary-foreground shadow-sm shadow-primary/20">
            YPS
          </span>
          <span className="hidden text-base font-bold tracking-tight sm:inline lg:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="default" size="sm" asChild>
            <Link to="/join-directory">Join the Directory</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="content-container flex flex-col gap-4 py-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="default" className="w-full mt-2" asChild>
              <Link to="/join-directory" onClick={() => setMobileOpen(false)}>
                Join the Directory
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
