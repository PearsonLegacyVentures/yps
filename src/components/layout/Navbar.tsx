import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-card/95 backdrop-blur-xl">
      <div className="content-container flex min-h-40 items-center justify-between gap-5 py-3 sm:min-h-44 xl:min-h-48">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center text-foreground"
          aria-label={`${siteConfig.name} home`}
        >
          <img
            src={siteConfig.logoUrl}
            alt={`${siteConfig.name} logo`}
            className="h-32 w-[min(25rem,calc(100vw-6.5rem))] object-contain object-left sm:h-[9rem] sm:w-[34rem] xl:h-40 xl:w-[42rem]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-8">
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
          className="rounded-full border border-border p-2 text-foreground shadow-sm xl:hidden"
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
        <div className="xl:hidden border-t border-border bg-card">
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
