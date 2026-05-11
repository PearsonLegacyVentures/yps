import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getApprovedMember, getInitials, normalizePhoneForWhatsApp } from "@/lib/member-directory";

export default function MemberProfile() {
  const { id } = useParams();
  const member = id ? getApprovedMember(id) : undefined;

  if (!member) {
    return (
      <PageLayout>
        <section className="section-padding">
          <div className="narrow-container text-center">
            <h1 className="text-headline">Profile unavailable</h1>
            <p className="mt-4 text-muted-foreground">This member profile is not approved for public viewing or no longer exists.</p>
            <Button className="mt-8 rounded-full" asChild><Link to="/directory">Back to Directory</Link></Button>
          </div>
        </section>
      </PageLayout>
    );
  }

  const whatsapp = normalizePhoneForWhatsApp(member.whatsapp || member.phone);

  return (
    <PageLayout>
      <section className="bg-primary pb-24 pt-10 text-primary-foreground">
        <div className="content-container">
          <Button variant="ghost" className="mb-8 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground" asChild>
            <Link to="/directory"><ArrowLeft className="h-4 w-4" /> Back to Directory</Link>
          </Button>
          <div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <Badge className="rounded-full bg-accent text-accent-foreground">{member.industry}</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">{member.full_name}</h1>
              <p className="mt-4 text-xl text-primary-foreground/78">{member.title} at {member.company_name}</p>
              <p className="mt-3 flex items-center gap-2 text-primary-foreground/70"><MapPin className="h-4 w-4 text-accent" /> {member.location}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {member.email && <Button variant="accent" className="rounded-full" asChild><a href={`mailto:${member.email}`}><Mail className="h-4 w-4" /> Email</a></Button>}
              {whatsapp && <Button className="rounded-full bg-white text-primary hover:bg-white/90" asChild><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></Button>}
              {member.phone && <Button variant="outline" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary" asChild><a href={`tel:${member.phone}`}><Phone className="h-4 w-4" /> Call</a></Button>}
              <Button variant="outline" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary" onClick={() => navigator.clipboard?.writeText(window.location.href)}><Share2 className="h-4 w-4" /> Share</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-14 section-padding-sm pt-0">
        <div className="content-container grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="h-fit rounded-[2rem] p-6 shadow-xl shadow-primary/10">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 rounded-3xl border border-border">
                <AvatarImage src={member.profile_photo_url || member.logo_url} alt={member.full_name} className="object-cover" />
                <AvatarFallback className="rounded-3xl bg-primary text-2xl text-primary-foreground">{getInitials(member.full_name)}</AvatarFallback>
              </Avatar>
              {member.logo_url && <img src={member.logo_url} alt={`${member.company_name} logo`} className="max-h-16 max-w-32 rounded-xl border border-border object-contain p-2" />}
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <Info label="Company" value={member.company_name} />
              <Info label="Business hours" value={member.business_hours || "By appointment"} />
              <Info label="Website" value={member.website} href={member.website} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {member.instagram && <Social href={member.instagram} label="Instagram" icon={<Instagram className="h-4 w-4" />} />}
              {member.linkedin && <Social href={member.linkedin} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />}
              {member.facebook && <Social href={member.facebook} label="Facebook" icon={<Facebook className="h-4 w-4" />} />}
            </div>
          </Card>

          <div className="space-y-6">
            {member.featured_image_url && <img src={member.featured_image_url} alt={`${member.company_name} featured`} className="h-64 w-full rounded-[2rem] object-cover shadow-sm md:h-80" />}
            <Card className="rounded-[2rem] p-6 md:p-8">
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{member.bio}</p>
            </Card>
            <Card className="rounded-[2rem] p-6 md:p-8">
              <h2 className="text-2xl font-semibold">Services offered</h2>
              <p className="mt-4 whitespace-pre-line leading-8 text-muted-foreground">{member.services}</p>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function Info({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) return null;
  return <div><p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>{href ? <a href={href} className="mt-1 inline-flex items-center gap-1 font-medium text-foreground hover:text-accent" target="_blank" rel="noreferrer">{value}<ExternalLink className="h-3 w-3" /></a> : <p className="mt-1 font-medium text-foreground">{value}</p>}</div>;
}

function Social({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return <Button variant="outline" size="sm" className="rounded-full" asChild><a href={href} target="_blank" rel="noreferrer">{icon}{label}</a></Button>;
}
