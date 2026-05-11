import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Search, UsersRound } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { approvedMembers } from "@/lib/member-directory";

const values = [
  { icon: Search, title: "Find members by industry", text: "Browse people and businesses by category, location, service, or keyword." },
  { icon: BriefcaseBusiness, title: "Promote what you do", text: "Create a clear profile that makes your work easier to discover and understand." },
  { icon: UsersRound, title: "Build real connections", text: "Turn the YPS network into a practical place for introductions, referrals, and collaboration." },
];

export default function DirectoryHome() {
  const featured = approvedMembers().filter((member) => member.is_featured).slice(0, 3);

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,hsl(var(--accent)/0.18),transparent_34%),linear-gradient(135deg,hsl(var(--primary)),hsl(220_35%_18%))] text-primary-foreground">
        <div className="content-container grid gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-28 lg:py-32">
          <div>
            <p className="text-eyebrow text-accent">Young Professionals Society</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
              YPS Member Directory
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/78 sm:text-xl">
              Discover professionals, entrepreneurs, and businesses within the YPS network.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="accent" className="rounded-full" asChild>
                <Link to="/join-directory">Join the Directory <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/directory">Browse Members</Link>
              </Button>
            </div>
          </div>

          <Card className="rounded-[2rem] border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="rounded-[1.5rem] bg-background p-5 text-foreground">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm font-semibold">Directory preview</p>
                  <p className="text-xs text-muted-foreground">Approved members only</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">Live</span>
              </div>
              <div className="mt-5 space-y-4">
                {featured.slice(0, 2).map((member) => (
                  <div key={member.id} className="rounded-2xl border border-border bg-card p-4">
                    <p className="font-semibold">{member.full_name}</p>
                    <p className="text-sm text-muted-foreground">{member.title} · {member.industry}</p>
                  </div>
                ))}
                <div className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                  Pending submissions stay private until an admin reviews and approves them.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container">
          <div className="max-w-2xl">
            <p className="text-eyebrow">Why it works</p>
            <h2 className="mt-3 text-headline">A useful place to find, refer, and connect.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((item) => (
              <Card key={item.title} className="rounded-2xl p-6 shadow-sm">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section-padding-sm bg-muted/50">
          <div className="content-container">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-eyebrow">Featured members</p>
                <h2 className="mt-3 text-headline">Meet people inside the network.</h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/directory">Browse all members</Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {featured.map((member) => <MemberCard key={member.id} member={member} />)}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
