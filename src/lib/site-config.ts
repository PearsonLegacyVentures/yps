/**
 * Site Configuration
 * Change these values to customize the starter for any brand.
 */

export const siteConfig = {
  name: "YPS Member Directory",
  tagline:
    "The member directory for young professionals, entrepreneurs, and emerging leaders across The Bahamas.",
  description:
    "Discover professionals, entrepreneurs, and businesses within the Young Professionals Society network.",
  url: "https://ypsbahamas.com/",
  ogImage: "/og-image.jpg",
  nav: [
    { label: "Directory", href: "/directory" },
    { label: "About YPS", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    company: [
      { label: "About YPS", href: "/about" },
      { label: "Directory", href: "/directory" },
      { label: "Join the Directory", href: "/join-directory" },
      { label: "Contact", href: "/contact" },
      { label: "Admin Login", href: "/admin/login" },
    ],
    resources: [
      { label: "Browse Members", href: "/directory" },
      { label: "Submit Profile", href: "/join-directory" },
      { label: "Member Review", href: "/admin/login" },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    social: {
      twitter: "#",
      linkedin: "https://www.linkedin.com/company/ypsbahamas/",
      instagram: "#",
    },
  },
};
