import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Facebook,
  Handshake,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DEFAULT_MEMBER_BANNER_URL,
  getApprovedMember,
  getInitials,
  normalizePhoneForWhatsApp,
} from "@/lib/member-directory";

export default function MemberProfile() {
  const { id } = useParams();
  const member = id ? getApprovedMember(id) : undefined;

  if (!member) {
    return (
      <PageLayout>
        <section className="section-padding">
          <div className="narrow-container text-center">
            <h1 className="text-headline">Profile unavailable</h1>
            <p className="mt-4 text-muted-foreground">
              This member profile is not approved for public viewing or no
              longer exists.
            </p>
            <Button className="mt-8 rounded-full" asChild>
              <Link to="/directory">Back to Directory</Link>
            </Button>
          </div>
        </section>
      </PageLayout>
    );
  }

  const whatsapp = normalizePhoneForWhatsApp(member.whatsapp || member.phone);
  const bannerUrl = member.banner_image_url || DEFAULT_MEMBER_BANNER_URL;

  return (
    <PageLayout>
      <section className="bg-primary pb-20 pt-10 text-primary-foreground md:pb-24">
        <div className="content-container">
          <Button
            variant="ghost"
            className="mb-8 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            asChild
          >
            <Link to="/directory">
              <ArrowLeft className="h-4 w-4" /> Back to Directory
            </Link>
          </Button>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/20 md:rounded-[2.5rem] md:p-3">
            <div className="relative h-56 overflow-hidden rounded-[1.5rem] md:h-[22rem] md:rounded-[2rem]">
              <img
                src={bannerUrl}
                alt={`${member.full_name} profile banner`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 md:bottom-7 md:left-7 md:right-7 md:flex-row md:items-end md:justify-between">
                <div className="flex items-end gap-4">
                  <Avatar className="h-24 w-24 rounded-3xl border-4 border-white bg-muted shadow-xl md:h-32 md:w-32">
                    <AvatarImage
                      src={member.profile_photo_url || member.logo_url}
                      alt={member.full_name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-3xl bg-primary text-2xl text-primary-foreground md:text-3xl">
                      {getInitials(member.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  {member.logo_url && (
                    <div className="hidden rounded-2xl border border-white/30 bg-white/90 p-3 shadow-xl sm:block">
                      <img
                        src={member.logo_url}
                        alt={`${member.company_name} logo`}
                        className="max-h-14 max-w-32 object-contain"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <Badge className="rounded-full bg-accent text-accent-foreground">
                    {member.industry}
                  </Badge>
                  {member.open_to_collaboration && (
                    <Badge className="rounded-full border border-white/20 bg-white/10 text-primary-foreground">
                      <Handshake className="mr-1 h-3 w-3" /> Open to
                      Collaboration
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
                {member.full_name}
              </h1>
              <p className="mt-4 text-xl text-primary-foreground/78">
                {member.title} at {member.company_name}
              </p>
              <p className="mt-3 flex items-center gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-accent" /> {member.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {member.email && (
                <Button variant="accent" className="rounded-full" asChild>
                  <a href={`mailto:${member.email}`}>
                    <Mail className="h-4 w-4" /> Connect With Member
                  </a>
                </Button>
              )}
              {whatsapp && (
                <Button
                  className="rounded-full bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
              )}
              {member.phone && (
                <Button
                  variant="outline"
                  className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href={`tel:${member.phone}`}>
                    <Phone className="h-4 w-4" /> Call
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary"
                onClick={() =>
                  navigator.clipboard?.writeText(window.location.href)
                }
              >
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="content-container grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit rounded-[2rem] p-6 shadow-xl shadow-primary/10">
            <div className="space-y-4 text-sm">
              <Info label="Company" value={member.company_name} />
              <Info
                label="Business hours"
                value={member.business_hours || "By appointment"}
              />
              <Info
                label="Website"
                value={member.website}
                href={member.website}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {member.instagram && (
                <Social
                  href={member.instagram}
                  label="Instagram"
                  icon={<Instagram className="h-4 w-4" />}
                />
              )}
              {member.linkedin && (
                <Social
                  href={member.linkedin}
                  label="LinkedIn"
                  icon={<Linkedin className="h-4 w-4" />}
                />
              )}
              {member.facebook && (
                <Social
                  href={member.facebook}
                  label="Facebook"
                  icon={<Facebook className="h-4 w-4" />}
                />
              )}
            </div>
          </Card>

          <div className="space-y-6">
            {member.featured_image_url && (
              <img
                src={member.featured_image_url}
                alt={`${member.company_name} featured`}
                className="h-64 w-full rounded-[2rem] object-cover shadow-sm md:h-80"
              />
            )}
            <Card className="rounded-[2rem] p-6 md:p-8">
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                {member.bio}
              </p>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <ProfileDetail
                title="Areas of Expertise"
                value={member.areas_of_expertise || member.services}
              />
              <ProfileDetail
                title="Professional Interests"
                value={member.professional_interests}
                fallback="Not listed yet."
              />
            </div>
            <Card className="rounded-[2rem] p-6 md:p-8">
              <h2 className="text-2xl font-semibold">Services offered</h2>
              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">
                {member.services}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function ProfileDetail({
  title,
  value,
  fallback,
}: {
  title: string;
  value?: string;
  fallback?: string;
}) {
  return (
    <Card className="rounded-[2rem] p-6 md:p-7">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
        {value || fallback}
      </p>
    </Card>
  );
}

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value?: string;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-1 inline-flex items-center gap-1 font-medium text-foreground hover:text-accent"
          target="_blank"
          rel="noreferrer"
        >
          {value}
          <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <p className="mt-1 font-medium text-foreground">{value}</p>
      )}
    </div>
  );
}

function Social({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Button variant="outline" size="sm" className="rounded-full" asChild>
      <a href={href} target="_blank" rel="noreferrer">
        {icon}
        {label}
      </a>
    </Button>
  );
}
