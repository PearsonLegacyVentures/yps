import { AdminSession, requireAdminSession } from "@/lib/admin-auth";

export type MemberStatus = "pending" | "approved" | "rejected" | "hidden";

export interface MemberProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  title: string;
  company_name: string;
  industry: string;
  location: string;
  bio: string;
  services: string;
  website: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  profile_photo_url: string;
  logo_url: string;
  featured_image_url: string;
  banner_image_url: string;
  business_hours: string;
  areas_of_expertise: string;
  professional_interests: string;
  open_to_collaboration: boolean;
  status: MemberStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type MemberFormInput = Omit<
  MemberProfile,
  "id" | "status" | "is_featured" | "created_at" | "updated_at"
>;

export const MEMBER_STATUSES: MemberStatus[] = [
  "pending",
  "approved",
  "rejected",
  "hidden",
];

export const INDUSTRIES = [
  "Accounting & Finance",
  "Architecture & Design",
  "Beauty & Wellness",
  "Construction & Trades",
  "Creative Services",
  "Education & Training",
  "Events & Hospitality",
  "Food & Beverage",
  "Health & Fitness",
  "Legal & Professional Services",
  "Marketing & Media",
  "Nonprofit & Community",
  "Real Estate",
  "Retail & E-commerce",
  "Technology",
  "Travel & Tourism",
] as const;

export const DEFAULT_MEMBER_BANNER_URL = "/yps-default-banner.svg";

const STORAGE_KEY = "yps-member-directory";

export const blankMemberForm: MemberFormInput = {
  full_name: "",
  email: "",
  phone: "",
  whatsapp: "",
  title: "",
  company_name: "",
  industry: "",
  location: "",
  bio: "",
  services: "",
  website: "",
  instagram: "",
  linkedin: "",
  facebook: "",
  profile_photo_url: "",
  logo_url: "",
  featured_image_url: "",
  banner_image_url: "",
  business_hours: "",
  areas_of_expertise: "",
  professional_interests: "",
  open_to_collaboration: false,
};

export const sampleMembers: MemberProfile[] = [
  {
    id: "maya-thompson",
    full_name: "Maya Thompson",
    email: "maya@example.com",
    phone: "+1 242 555 0142",
    whatsapp: "+12425550142",
    title: "Creative Director",
    company_name: "Thompson Creative Studio",
    industry: "Creative Services",
    location: "Nassau, New Providence",
    bio: "Maya develops visual identity systems, campaign imagery, and brand direction for Bahamian founders, hospitality teams, and service businesses preparing for a stronger public presence.",
    services:
      "Brand photography, campaign direction, professional headshots, visual identity support",
    website: "https://example.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "",
    profile_photo_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    banner_image_url:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    business_hours: "Monday–Friday, 9:00 AM–5:00 PM",
    areas_of_expertise: "Brand strategy, photography, campaign planning",
    professional_interests:
      "Entrepreneurship, tourism branding, creative business development",
    open_to_collaboration: true,
    status: "approved",
    is_featured: true,
    created_at: "2026-04-12T10:00:00.000Z",
    updated_at: "2026-04-12T10:00:00.000Z",
  },
  {
    id: "jordan-reed",
    full_name: "Jordan Reed",
    email: "jordan@example.com",
    phone: "+1 242 555 0188",
    whatsapp: "",
    title: "Financial Advisor",
    company_name: "Reed Wealth Partners",
    industry: "Accounting & Finance",
    location: "Nassau, New Providence",
    bio: "Jordan helps young professionals and business owners make practical financial decisions around savings, investing, retirement planning, and company growth.",
    services:
      "Financial planning, investment guidance, retirement planning, small business advisory",
    website: "https://example.com",
    instagram: "",
    linkedin: "https://linkedin.com",
    facebook: "",
    profile_photo_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    banner_image_url:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
    business_hours: "By appointment",
    areas_of_expertise: "Financial planning, wealth education, SME advisory",
    professional_interests:
      "Financial literacy, mentorship, business ownership",
    open_to_collaboration: true,
    status: "approved",
    is_featured: true,
    created_at: "2026-04-18T10:00:00.000Z",
    updated_at: "2026-04-18T10:00:00.000Z",
  },
  {
    id: "alina-patel",
    full_name: "Alina Patel",
    email: "alina@example.com",
    phone: "+1 242 555 0129",
    whatsapp: "+12425550129",
    title: "Founder & Workplace Wellness Consultant",
    company_name: "Aster Wellness Co.",
    industry: "Beauty & Wellness",
    location: "Freeport, Grand Bahama",
    bio: "Alina designs workplace wellness sessions and private coaching programs for teams and professionals who want healthier routines that fit real schedules.",
    services:
      "Wellness coaching, workplace wellness sessions, habit planning, private consultations",
    website: "https://example.com",
    instagram: "https://instagram.com",
    linkedin: "",
    facebook: "https://facebook.com",
    profile_photo_url:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80",
    banner_image_url:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80",
    business_hours: "Tuesday–Saturday",
    areas_of_expertise: "Workplace wellness, habit design, group facilitation",
    professional_interests:
      "Leadership wellbeing, women in business, community health",
    open_to_collaboration: true,
    status: "approved",
    is_featured: true,
    created_at: "2026-05-01T10:00:00.000Z",
    updated_at: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "darius-campbell",
    full_name: "Darius Campbell",
    email: "darius@example.com",
    phone: "+1 242 555 0164",
    whatsapp: "",
    title: "Attorney",
    company_name: "Campbell Legal Advisory",
    industry: "Legal & Professional Services",
    location: "Nassau, New Providence",
    bio: "Darius advises founders and growing companies on practical legal structures, contracts, and compliance matters that support responsible business growth.",
    services:
      "Commercial contracts, company formation, governance support, advisory sessions",
    website: "https://example.com",
    instagram: "",
    linkedin: "https://linkedin.com",
    facebook: "",
    profile_photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url: "",
    banner_image_url: "",
    business_hours: "Monday–Friday, by appointment",
    areas_of_expertise: "Business law, contracts, governance",
    professional_interests:
      "Entrepreneurship, mentorship, policy conversations",
    open_to_collaboration: false,
    status: "approved",
    is_featured: true,
    created_at: "2026-05-03T10:00:00.000Z",
    updated_at: "2026-05-03T10:00:00.000Z",
  },
  {
    id: "natalie-rolle",
    full_name: "Natalie Rolle",
    email: "natalie@example.com",
    phone: "+1 242 555 0118",
    whatsapp: "",
    title: "Marketing Consultant",
    company_name: "Rolle Strategy Group",
    industry: "Marketing & Media",
    location: "Nassau, New Providence",
    bio: "Natalie supports service businesses and community organizations with messaging, campaign planning, and public-facing content that is clear and useful.",
    services:
      "Marketing strategy, messaging, campaign planning, content direction",
    website: "https://example.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "",
    profile_photo_url:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url: "",
    banner_image_url: "",
    business_hours: "Monday–Thursday",
    areas_of_expertise: "Messaging, campaigns, brand positioning",
    professional_interests:
      "Community impact, youth leadership, business visibility",
    open_to_collaboration: true,
    status: "approved",
    is_featured: true,
    created_at: "2026-05-05T10:00:00.000Z",
    updated_at: "2026-05-05T10:00:00.000Z",
  },
  {
    id: "pending-demo",
    full_name: "Pending Member",
    email: "pending@example.com",
    phone: "+1 242 555 0170",
    whatsapp: "",
    title: "Consultant",
    company_name: "Pending Business",
    industry: "Marketing & Media",
    location: "Nassau, New Providence",
    bio: "This sample submission is pending review and does not appear in the public directory.",
    services: "Marketing planning, content strategy, local campaigns",
    website: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    profile_photo_url: "",
    logo_url: "",
    featured_image_url: "",
    banner_image_url: "",
    business_hours: "",
    areas_of_expertise: "",
    professional_interests: "",
    open_to_collaboration: false,
    status: "pending",
    is_featured: false,
    created_at: "2026-05-06T10:00:00.000Z",
    updated_at: "2026-05-06T10:00:00.000Z",
  },
];

const canUseStorage = () =>
  typeof window !== "undefined" && Boolean(window.localStorage);

export function getMembers(): MemberProfile[] {
  if (!canUseStorage()) return sampleMembers;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMembers));
    return sampleMembers;
  }

  try {
    const parsed = JSON.parse(stored) as MemberProfile[];
    return parsed.map((member) => ({
      areas_of_expertise: "",
      professional_interests: "",
      banner_image_url: "",
      open_to_collaboration: false,
      ...member,
    }));
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMembers));
    return sampleMembers;
  }
}

export function saveMembers(members: MemberProfile[]) {
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }
}

export function createPendingMember(input: MemberFormInput): MemberProfile {
  const now = new Date().toISOString();
  const member: MemberProfile = {
    ...input,
    id: `${input.full_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now()}`,
    status: "pending",
    is_featured: false,
    created_at: now,
    updated_at: now,
  };

  saveMembers([member, ...getMembers()]);
  return member;
}

export function updateMember(
  id: string,
  updates: Partial<MemberProfile>,
  adminSession: AdminSession | null,
) {
  requireAdminSession(adminSession);
  const now = new Date().toISOString();
  const members = getMembers().map((member) =>
    member.id === id ? { ...member, ...updates, updated_at: now } : member,
  );
  saveMembers(members);
  return members;
}

export function deleteMember(id: string, adminSession: AdminSession | null) {
  requireAdminSession(adminSession);
  const members = getMembers().filter((member) => member.id !== id);
  saveMembers(members);
  return members;
}

export function approvedMembers() {
  return getMembers().filter((member) => member.status === "approved");
}

export function getApprovedMember(id: string) {
  return approvedMembers().find((member) => member.id === id);
}

export function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "YP"
  );
}

export function normalizePhoneForWhatsApp(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export function toCsv(
  members: MemberProfile[],
  adminSession: AdminSession | null,
) {
  requireAdminSession(adminSession);
  const headers = [
    "full_name",
    "email",
    "phone",
    "whatsapp",
    "title",
    "company_name",
    "industry",
    "location",
    "status",
    "is_featured",
    "banner_image_url",
    "created_at",
    "areas_of_expertise",
    "professional_interests",
    "open_to_collaboration",
  ];
  const rows = members.map((member) =>
    headers
      .map(
        (header) =>
          `"${String(member[header as keyof MemberProfile] ?? "").replace(/"/g, '""')}"`,
      )
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}
