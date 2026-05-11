import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getInitials, MemberProfile } from "@/lib/member-directory";

interface MemberCardProps {
  member: MemberProfile;
}

export function MemberCard({ member }: MemberCardProps) {
  const contactHref = member.email ? `mailto:${member.email}` : member.website || undefined;

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="flex gap-4">
        <Avatar className="h-16 w-16 rounded-2xl border border-border bg-muted">
          <AvatarImage src={member.profile_photo_url || member.logo_url} alt={member.full_name} className="object-cover" />
          <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">{getInitials(member.full_name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full text-[11px] font-medium">
              {member.industry}
            </Badge>
            {member.is_featured && <Badge className="rounded-full bg-accent text-accent-foreground text-[11px]">Featured</Badge>}
          </div>
          <h3 className="mt-3 text-xl font-semibold leading-tight text-foreground">{member.full_name}</h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{member.title}</p>
          <p className="text-sm text-muted-foreground">{member.company_name}</p>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">{member.bio}</p>

      <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 text-accent" />
        <span>{member.location}</span>
      </div>

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
    </Card>
  );
}
