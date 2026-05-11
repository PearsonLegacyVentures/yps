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
  business_hours: string;
  status: MemberStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type MemberFormInput = Omit<MemberProfile, "id" | "status" | "is_featured" | "created_at" | "updated_at">;

export const MEMBER_STATUSES: MemberStatus[] = ["pending", "approved", "rejected", "hidden"];

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
  business_hours: "",
};

export const sampleMembers: MemberProfile[] = [
  {
    id: "maya-thompson",
    full_name: "Maya Thompson",
    email: "maya@example.com",
    phone: "+1 555 0142",
    whatsapp: "+15550142",
    title: "Brand Photographer",
    company_name: "Thompson Creative Studio",
    industry: "Creative Services",
    location: "Savannah, GA",
    bio: "Maya creates warm, editorial brand photography for founders, hospitality teams, and local businesses that need a stronger visual presence.",
    services: "Brand photography, campaign shoots, headshots, lifestyle content, image direction",
    website: "https://example.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "",
    profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
    business_hours: "Monday–Friday, 9:00 AM–5:00 PM",
    status: "approved",
    is_featured: true,
    created_at: "2026-04-12T10:00:00.000Z",
    updated_at: "2026-04-12T10:00:00.000Z",
  },
  {
    id: "jordan-reed",
    full_name: "Jordan Reed",
    email: "jordan@example.com",
    phone: "+1 555 0188",
    whatsapp: "",
    title: "Financial Advisor",
    company_name: "Reed Wealth Partners",
    industry: "Accounting & Finance",
    location: "Charleston, SC",
    bio: "Jordan helps young professionals and business owners make practical plans for savings, investing, retirement, and business growth.",
    services: "Financial planning, investment guidance, retirement planning, small business advisory",
    website: "https://example.com",
    instagram: "",
    linkedin: "https://linkedin.com",
    facebook: "",
    profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url: "",
    business_hours: "By appointment",
    status: "approved",
    is_featured: true,
    created_at: "2026-04-18T10:00:00.000Z",
    updated_at: "2026-04-18T10:00:00.000Z",
  },
  {
    id: "alina-patel",
    full_name: "Alina Patel",
    email: "alina@example.com",
    phone: "+1 555 0129",
    whatsapp: "+15550129",
    title: "Founder & Wellness Coach",
    company_name: "Aster Wellness Co.",
    industry: "Beauty & Wellness",
    location: "Savannah, GA",
    bio: "Alina offers approachable wellness coaching for busy professionals who want healthier routines without adding more noise to their week.",
    services: "Wellness coaching, workplace wellness sessions, habit planning, private consultations",
    website: "https://example.com",
    instagram: "https://instagram.com",
    linkedin: "",
    facebook: "https://facebook.com",
    profile_photo_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    logo_url: "",
    featured_image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80",
    business_hours: "Tuesday–Saturday",
    status: "approved",
    is_featured: false,
    created_at: "2026-05-01T10:00:00.000Z",
    updated_at: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "pending-demo",
    full_name: "Pending Member",
    email: "pending@example.com",
    phone: "+1 555 0170",
    whatsapp: "",
    title: "Marketing Consultant",
    company_name: "Northline Marketing",
    industry: "Marketing & Media",
    location: "Hilton Head, SC",
    bio: "This sample submission is pending review and does not appear in the public directory.",
    services: "Marketing planning, content strategy, local campaigns",
    website: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    profile_photo_url: "",
    logo_url: "",
    featured_image_url: "",
    business_hours: "",
    status: "pending",
    is_featured: false,
    created_at: "2026-05-06T10:00:00.000Z",
    updated_at: "2026-05-06T10:00:00.000Z",
  },
];

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

export function getMembers(): MemberProfile[] {
  if (!canUseStorage()) return sampleMembers;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMembers));
    return sampleMembers;
  }

  try {
    return JSON.parse(stored) as MemberProfile[];
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
    id: `${input.full_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`,
    status: "pending",
    is_featured: false,
    created_at: now,
    updated_at: now,
  };

  saveMembers([member, ...getMembers()]);
  return member;
}

export function updateMember(id: string, updates: Partial<MemberProfile>, adminSession: AdminSession | null) {
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
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "YP";
}

export function normalizePhoneForWhatsApp(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export function toCsv(members: MemberProfile[], adminSession: AdminSession | null) {
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
    "created_at",
  ];
  const rows = members.map((member) =>
    headers
      .map((header) => `"${String(member[header as keyof MemberProfile] ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}
