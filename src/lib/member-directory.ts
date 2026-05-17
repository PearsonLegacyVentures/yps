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
const REMOVED_PLACEHOLDER_MEMBER_IDS = new Set([
  "maya-thompson",
  "alina-patel",
  "jordan-reed",
  "darius-campbell",
  "natalie-rolle",
  "pending-demo",
]);

function withoutRemovedPlaceholders(members: MemberProfile[]) {
  return members.filter((member) => !REMOVED_PLACEHOLDER_MEMBER_IDS.has(member.id));
}

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

export const initialMembers: MemberProfile[] = [];
const canUseStorage = () =>
  typeof window !== "undefined" && Boolean(window.localStorage);

export function getMembers(): MemberProfile[] {
  if (!canUseStorage()) return initialMembers;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMembers));
    return initialMembers;
  }

  try {
    const parsed = JSON.parse(stored) as MemberProfile[];
    const members = withoutRemovedPlaceholders(
      parsed.map((member) => ({
        areas_of_expertise: "",
        professional_interests: "",
        banner_image_url: "",
        open_to_collaboration: false,
        ...member,
      })),
    );

    if (members.length !== parsed.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    }

    return members;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMembers));
    return initialMembers;
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
