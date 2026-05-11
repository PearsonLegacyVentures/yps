import { Link } from "react-router-dom";
import { BookOpen, Handshake, Megaphone, Target, Users } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const focusAreas = [
  {
    icon: Handshake,
    title: "Professional networking",
    description:
      "Create practical rooms for introductions, referrals, mentorship, and collaboration across industries.",
  },
  {
    icon: BookOpen,
    title: "Leadership development",
    description:
      "Support members with learning, dialogue, and skills that help them move with confidence in professional settings.",
  },
  {
    icon: Megaphone,
    title: "Business visibility",
    description:
      "Help young professionals and entrepreneurs become easier to discover within the broader business community.",
  },
  {
    icon: Users,
    title: "Community impact",
    description:
      "Encourage members to contribute to initiatives that strengthen professional life and civic participation in The Bahamas.",
  },
];

export default function About() {
  return (
    <PageLayout>
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="content-container max-w-4xl">
          <p className="text-eyebrow text-accent">About YPS</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            A connected community for young professionals in The Bahamas.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-primary-foreground/75">
            The Young Professionals Society is connected to the Bahamas Chamber
            of Commerce and Employers’ Confederation and brings together
            ambitious professionals, entrepreneurs, and emerging leaders for
            growth, connection, and community impact.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button variant="accent" size="lg" className="rounded-full" asChild>
              <Link to="/join-directory">Join the Directory</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link to="/directory">Browse Members</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="content-container grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <p className="text-eyebrow">Purpose</p>
            <h2 className="mt-3 text-headline">
              Built around connection, development, and opportunity.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            <p>
              YPS creates a professional environment where members can build
              relationships, learn from peers and experienced leaders, and stay
              visible within The Bahamas’ business ecosystem.
            </p>
            <p>
              The Member Directory extends that purpose online. It gives members
              a clear public profile and gives the community a straightforward
              way to find professionals by sector, expertise, and location.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-muted/50">
        <div className="content-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow">YPS focus</p>
            <h2 className="mt-3 text-headline">What the directory supports.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {focusAreas.map((area) => (
              <Card key={area.title} className="rounded-3xl p-6 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <area.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="content-container rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
              <Target className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                The goal is simple: make valuable professional connections
                easier to find.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Whether someone is looking for a consultant, attorney, creative,
                accountant, mentor, collaborator, or future business leader, the
                directory gives the YPS network a more organized and trusted
                point of discovery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
