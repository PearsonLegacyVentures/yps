import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DEFAULT_MEMBER_BANNER_URL,
  getInitials,
  MemberProfile,
} from "@/lib/member-directory";

interface MemberCardProps {
  member: MemberProfile;
}

export function MemberCard({ member }: MemberCardProps) {
  const contactHref = member.email
    ? `mailto:${member.email}`
    : member.website || undefined;
  const cardImage =
    member.featured_image_url ||
    member.banner_image_url ||
    DEFAULT_MEMBER_BANNER_URL;

  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={cardImage}
          alt={`${member.company_name} profile visual`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/25" />
        {member.is_featured && (
          <Badge className="absolute right-4 top-4 rounded-full bg-accent text-accent-foreground text-[11px]">
            Featured
          </Badge>
        )}
      </div>

      <div className="p-5">
        <div className="-mt-14 flex items-end gap-4">
          <Avatar className="h-24 w-24 rounded-3xl border-4 border-card bg-muted shadow-lg">
            <AvatarImage
              src={member.profile_photo_url || member.logo_url}
              alt={member.full_name}
              className="object-cover"
            />
            <AvatarFallback className="rounded-3xl bg-primary text-xl text-primary-foreground">
              {getInitials(member.full_name)}
            </AvatarFallback>
          </Avatar>
          <Badge
            variant="secondary"
            className="mb-2 rounded-full text-[11px] font-medium"
          >
            {member.industry}
          </Badge>
        </div>

        <h3 className="mt-5 text-xl font-semibold leading-tight text-foreground">
          {member.full_name}
        </h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {member.title}
        </p>
        <p className="text-sm text-muted-foreground">{member.company_name}</p>

        <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {member.bio}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{member.location}</span>
        </div>

        {member.open_to_collaboration && (
          <div className="mt-4 rounded-2xl bg-accent/15 px-4 py-3 text-xs font-semibold text-primary">
            Open to collaboration
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1 rounded-full" asChild>
            <Link to={`/directory/${member.id}`}>View Profile</Link>
          </Button>
          {contactHref && (
            <Button variant="outline" className="flex-1 rounded-full" asChild>
              <a href={contactHref}>
                <Mail className="h-4 w-4" /> Contact
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
