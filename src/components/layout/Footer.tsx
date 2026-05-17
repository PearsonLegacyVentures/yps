import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { contact } = siteConfig;

  return (
    <footer className="border-t border-border bg-card">
      <div className="content-container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-14">
          <div>
            <Link
              to="/"
              className="inline-flex items-center"
              aria-label={`${siteConfig.name} home`}
            >
              <img
                src={siteConfig.logoUrl}
                alt={`${siteConfig.name} logo`}
                className="h-32 w-full max-w-[26rem] object-contain object-left sm:h-40 sm:max-w-[36rem]"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              {siteConfig.tagline} {siteConfig.initiative}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <h4 className="col-span-full text-sm font-semibold text-foreground">
              Explore
            </h4>
            {siteConfig.footer.links.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm text-muted-foreground transition-colors hover:text-primary ${item.href === "/admin/login" ? "opacity-70" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="rounded-[1.75rem] border border-primary/10 bg-muted/70 p-5">
            <h4 className="text-sm font-semibold text-foreground">
              Contact
            </h4>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <p>
                  <span className="block font-semibold text-foreground">
                    {contact.addressName}
                  </span>
                  <span className="block">{contact.addressLine1}</span>
                  <span className="block">{contact.city}</span>
                </p>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="flex gap-3 transition-colors hover:text-primary"
              >
                <Mail className="mt-1 h-4 w-4 shrink-0 text-primary" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="flex gap-3 transition-colors hover:text-primary"
              >
                <Phone className="mt-1 h-4 w-4 shrink-0 text-primary" />
                {contact.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Powered by the Young Professionals Society of The Bahamas.
          </p>
        </div>
      </div>
    </footer>
  );
}
