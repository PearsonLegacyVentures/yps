import { Link } from "react-router-dom";
import {
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
import { ChamberMap } from "@/components/ChamberMap";
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
  const { images, contact } = siteConfig;

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <img
          src={images.about}
          alt="YPS Bahamas members at a professional community event"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.08] saturate-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/82 via-[#111111]/45 to-transparent md:from-[#111111]/72 md:via-[#111111]/18 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111]/70 to-transparent" />
        <div className="content-container relative grid min-h-[40rem] py-16 sm:min-h-[42rem] md:grid-cols-[0.78fr_1.22fr] md:items-center md:py-24 lg:min-h-[46rem]">
          <div className="max-w-2xl py-10 md:py-0">
            <p className="text-eyebrow text-accent">
              Official YPS Member Directory
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Young Professionals. Real Connections. Stronger Bahamas.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/88 sm:text-xl">
              Discover entrepreneurs, professionals, business leaders, and
              emerging talent across The Bahamas.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="accent"
                className="w-full rounded-full px-7 sm:w-auto"
                asChild
              >
                <Link to="/join-directory">Join the Directory</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white/45 bg-white/5 px-7 text-white backdrop-blur-[2px] hover:border-white hover:bg-white hover:text-primary sm:w-auto"
                asChild
              >
                <Link to="/directory">Browse Members</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div>
            <p className="text-eyebrow">What is YPS?</p>
            <h2 className="mt-3 text-headline">
              A professional network for rising Bahamian leaders.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The Young Professionals Society is connected to the Bahamas Chamber
              of Commerce and Employers’ Confederation and brings together
              ambitious professionals, entrepreneurs, and future business leaders
              across The Bahamas.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
            <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-72 bg-primary">
                <img
                  src={images.hero}
                  alt="YPS and BCCEC professionals networking in The Bahamas"
                  className="h-full min-h-72 w-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-lg leading-8 text-muted-foreground">
                  The directory gives the YPS community a polished public home —
                  making it easier for members, partners, and Chamber-connected
                  audiences to identify talent, services, and collaboration
                  opportunities.
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
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-eyebrow">YPS in action</p>
              <h2 className="mt-3 text-headline">
                Built around the moments where professionals actually connect.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The platform supports the practical rhythm of the YPS community:
                networking rooms, leadership conversations, member visibility,
                and warm introductions that can continue after an event ends.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <img
                src={images.networking}
                alt="YPS networking and business community gathering"
                className="h-72 w-full rounded-[2rem] object-cover shadow-sm"
              />
              <div className="grid gap-4">
                <img
                  src={images.community}
                  alt="YPS members collaborating at a community event"
                  className="h-36 w-full rounded-[1.5rem] object-cover shadow-sm sm:h-32"
                />
                <img
                  src={images.leadership}
                  alt="YPS leadership and professional development event"
                  className="h-36 w-full rounded-[1.5rem] object-cover shadow-sm sm:h-32"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
      </section>

      <section className="section-padding-sm bg-background pt-0">
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
                  Approved member profiles highlighted by the YPS team.
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
          <div className="grid overflow-hidden rounded-[2rem] border border-primary/10 bg-card shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-6 md:p-8">
              <p className="text-eyebrow">Visit The Chamber</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Bahamas Chamber of Commerce & Employers’ Confederation
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The Young Professionals Society operates within the Bahamas
                Chamber of Commerce and Employers’ Confederation.
              </p>
              <div className="mt-5 space-y-1 text-sm leading-6 text-muted-foreground">
                <p className="font-semibold text-foreground">{contact.addressName}</p>
                <p>{contact.addressLine1}</p>
                <p>{contact.city}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="rounded-full" asChild>
                  <Link to="/contact">Contact YPS</Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href={contact.mapsUrl} target="_blank" rel="noreferrer">
                    <MapPin className="h-4 w-4" /> Open Map
                  </a>
                </Button>
              </div>
            </div>
            <div className="bg-muted p-4 md:p-6">
              <ChamberMap className="h-full" />
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
