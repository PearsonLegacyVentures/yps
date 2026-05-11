import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Handshake,
  LineChart,
  Network,
  Search,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { approvedMembers } from "@/lib/member-directory";

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
        <div
          className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_0%,transparent_48%,hsl(var(--accent))_48%,hsl(var(--accent))_49%,transparent_49%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="content-container relative grid gap-12 py-16 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-24 lg:py-28">
          <div>
            <p className="text-eyebrow text-accent">
              Young Professionals Society · The Bahamas
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
              Connect With The Next Generation of Bahamian Professionals
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/78 sm:text-xl">
              The official YPS Member Directory showcasing entrepreneurs,
              professionals, business leaders, and emerging talent across The
              Bahamas.
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
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
                alt="Professionals networking at a business event"
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
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
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
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-8">
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
                className="rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
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
                <Building2 className="h-4 w-4 text-accent-foreground" />
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
