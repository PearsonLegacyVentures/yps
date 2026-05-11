/**
 * Site Configuration
 * Change these values to customize the starter for any brand.
 */

export const siteConfig = {
  name: "Young Professionals Society",
  shortName: "YPS",
  tagline:
    "The member directory for young professionals, entrepreneurs, and emerging leaders across The Bahamas.",
  description:
    "Discover professionals, entrepreneurs, and businesses within the Young Professionals Society network.",
  initiative:
    "An initiative connected to the Bahamas Chamber of Commerce and Employers’ Confederation.",
  url: "https://ypsbahamas.com/",
  ogImage: "/og-image.jpg",
  contact: {
    organization: "Young Professionals Society",
    email: "admin@ypsbahamas.com",
    phone: "+1 242-395-7845",
    whatsapp: "+12423957845",
    addressName: "Bahamas Chamber of Commerce & Employers’ Confederation",
    addressLine1: "#2 Shirley Street and Collins Avenue",
    city: "Nassau, Bahamas",
    officeHours: "Monday–Friday, 9:00 AM–5:00 PM",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%232%20Shirley%20Street%20and%20Collins%20Avenue%2C%20Nassau%2C%20Bahamas",
  },
  nav: [
    { label: "Directory", href: "/directory" },
    { label: "About YPS", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    links: [
      { label: "About YPS", href: "/about" },
      { label: "Browse Members", href: "/directory" },
      { label: "Join the Directory", href: "/join-directory" },
      { label: "Contact", href: "/contact" },
      { label: "Admin Login", href: "/admin/login" },
    ],
    social: {
      linkedin: "https://www.linkedin.com/company/ypsbahamas/",
      instagram: "#",
    },
  },
};
