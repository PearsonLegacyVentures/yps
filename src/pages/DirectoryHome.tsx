import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Handshake,
  LineChart,
  MapPin,
  Network,
  Search,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { approvedMembers } from "@/lib/member-directory";
import { siteConfig } from "@/lib/site-config";

const benefits = [
  {
    icon: Network,
    title: "Expand Your Network",
    text: "Find peers, partners, mentors, and collaborators across industries in The Bahamas.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Promote Your Business",
    text: "Give members and Chamber-connected audiences a clearer way to understand what you do.",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    text: "Search by profession, sector, service, or island to identify useful connections faster.",
  },
  {
    icon: UsersRound,
    title: "Connect With Professionals",
    text: "Move from introductions to practical conversations with people inside the YPS network.",
  },
  {
    icon: LineChart,
    title: "Grow Within The Community",
    text: "Stay visible as you build your career, company, practice, or leadership profile.",
  },
  {
    icon: Handshake,
    title: "Build Meaningful Relationships",
    text: "Support referrals, mentorship, business visibility, and long-term professional trust.",
  },
];


const communityPillars = [
  {
    icon: CalendarDays,
    title: "Networking events",
    text: "Rooms designed for useful introductions, business mixers, and Chamber-connected conversations.",
  },
  {
    icon: LineChart,
    title: "Professional growth",
    text: "Practical learning moments for members building careers, companies, and public leadership profiles.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Entrepreneurship",
    text: "Visibility and support for founders, operators, and independent professionals serving The Bahamas.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "A trusted network for referrals, mentorship, partnerships, and community-minded projects.",
  },
  {
    icon: Trophy,
    title: "Leadership development",
    text: "A platform for young professionals preparing to contribute with confidence and discipline.",
  },
];

const categories = [
  "Entrepreneurs",
  "Attorneys",
  "Creatives",
  "Accountants",
  "Consultants",
  "Realtors",
  "Engineers",
  "Marketing Professionals",
  "Financial Professionals",
  "Startup Founders",
  "Executives",
  "Students & Emerging Leaders",
];

export default function DirectoryHome() {
  const featured = approvedMembers()
    .filter((member) => member.is_featured)
    .slice(0, 6);

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="content-container relative grid gap-12 py-16 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-24 lg:py-28">
          <div>
            <p className="text-eyebrow text-accent">
              Young Professionals Society (YPS)
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
              Connect With The Next Generation of Bahamian Professionals
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80 sm:text-xl">
              The official Young Professionals Society directory showcases
              entrepreneurs, professionals, business leaders, and emerging
              talent across The Bahamas.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="accent"
                className="rounded-full"
                asChild
              >
                <Link to="/join-directory">
                  Join the Directory <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/directory">Browse Members</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/20 backdrop-blur">
              {/* Replace this placeholder with approved YPS Bahamas LinkedIn/event photography once image rights and local hosting are confirmed. Do not hotlink LinkedIn assets. */}
              <img
                src="/yps-community-visual.svg"
                alt="YPS Bahamas networking, leadership, and community visual"
                className="h-[22rem] w-full rounded-[1.5rem] object-cover md:h-[30rem]"
              />
            </div>
            <Card className="absolute -bottom-6 left-4 right-4 rounded-3xl border-white/40 bg-background/95 p-5 text-foreground shadow-xl backdrop-blur md:left-auto md:right-6 md:w-80">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Directory preview</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Approved member profiles only
                  </p>
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  BCCEC ecosystem
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {featured.slice(0, 2).map((member) => (
                  <div
                    key={member.id}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <p className="font-semibold">{member.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.title} · {member.industry}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <div>
            <p className="text-eyebrow">What is YPS?</p>
            <h2 className="mt-3 text-headline">
              A professional network for rising Bahamian leaders.
            </h2>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="min-h-56 bg-primary">
                {/* Manual asset slot: upload approved YPS networking, Chamber gathering, or leadership event photography here when available. */}
                <img
                  src="/yps-community-visual.svg"
                  alt="YPS Bahamas community photography placeholder"
                  className="h-full min-h-56 w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-lg leading-8 text-muted-foreground">
                  The Young Professionals Society (YPS) is an initiative connected
                  to the Bahamas Chamber of Commerce and Employers’ Confederation
                  focused on bringing together ambitious young professionals,
                  entrepreneurs, and future business leaders across The Bahamas.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Networking", "Leadership", "Community impact"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-muted px-4 py-3 text-sm font-semibold text-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-muted/50">
        <div className="content-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow">Member value</p>
            <h2 className="mt-3 text-headline">
              A practical directory for visibility, connection, and growth.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Designed for professionals who want to be easier to find, easier
              to refer, and better connected within the YPS community.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((item) => (
              <Card
                key={item.title}
                className="rounded-3xl border-primary/10 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <section className="section-padding-sm bg-card">
        <div className="content-container">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-end">
            <div>
              <p className="text-eyebrow">Community & Leadership</p>
              <h2 className="mt-3 text-headline">
                Built around the moments where professionals actually connect.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                YPS brings together networking, leadership dialogue, and
                entrepreneurial visibility in a setting that feels credible,
                useful, and connected to the business community.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {communityPillars.map((item) => (
                <Card
                  key={item.title}
                  className="rounded-[1.5rem] border-primary/10 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-primary/10 bg-muted shadow-sm">
            <div className="grid md:grid-cols-3">
              {["Bahamian networking events", "Chamber gatherings", "Leadership panels"].map((label) => (
                <div key={label} className="border-b border-border bg-card p-6 md:border-b-0 md:border-r last:md:border-r-0">
                  <div className="aspect-[4/3] rounded-[1.5rem] border border-dashed border-primary/25 bg-primary/5" />
                  <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Replace with approved YPS/BCCEC event photography when available.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-eyebrow">Who uses the directory</p>
            <h2 className="mt-3 text-headline">
              Built for the breadth of young professional life in The Bahamas.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              From independent founders to emerging executives, the directory
              helps people discover the talent already moving through the YPS
              network.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-sm"
              >
                <Building2 className="h-4 w-4 text-primary" />
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section-padding-sm bg-muted/50">
          <div className="content-container">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-eyebrow">Featured members</p>
                <h2 className="mt-3 text-headline">
                  Professionals inside the YPS network.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A sample of approved member profiles representing the
                  directory experience.
                </p>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/directory">Browse all members</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featured.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}



      <section className="section-padding-sm bg-background">
        <div className="content-container">
          <div className="grid overflow-hidden rounded-[2rem] border border-primary/10 bg-card shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 md:p-8">
              <p className="text-eyebrow">YPS contact point</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                #2 Shirley Street and Collins Avenue, Nassau, Bahamas
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {siteConfig.initiative} For directory questions, membership
                support, or partnership conversations, contact the YPS team.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-full" asChild>
                  <Link to="/contact">Contact YPS</Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href={siteConfig.contact.mapsUrl} target="_blank" rel="noreferrer">
                    <MapPin className="h-4 w-4" /> Open Map
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex min-h-80 items-center justify-center bg-muted p-6">
              <div className="w-full max-w-xl rounded-[1.5rem] border border-dashed border-primary/30 bg-card p-8 text-center">
                <MapPin className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-4 text-sm font-semibold text-foreground">
                  Map embed placeholder
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  #2 Shirley Street and Collins Avenue, Nassau, Bahamas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-primary text-primary-foreground">
        <div className="content-container grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-eyebrow text-accent">Join the network</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Make your professional profile easier to discover.
            </h2>
            <p className="mt-4 max-w-2xl text-primary-foreground/75">
              Submit your profile for review and help members, partners, and
              peers understand how to connect with you.
            </p>
          </div>
          <Button size="lg" variant="accent" className="rounded-full" asChild>
            <Link to="/join-directory">
              Join the Directory <Sparkles className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
