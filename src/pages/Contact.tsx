import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ChamberMap } from "@/components/ChamberMap";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";

const contactCards = [
  {
    icon: MapPin,
    label: "Office address",
    value: `${siteConfig.contact.addressLine1}, ${siteConfig.contact.city}`,
    href: siteConfig.contact.mapsUrl,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`,
  },
];

export default function Contact() {
  const { contact } = siteConfig;

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
        <img
          src={siteConfig.images.contact}
          alt="YPS Bahamas professional community event"
          className="absolute inset-0 h-full w-full object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-primary/78" />
        <div className="content-container relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-eyebrow text-accent">Contact YPS</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Get In Touch
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Questions about membership, networking, or the YPS directory?
              Reach out to us.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" className="rounded-full" asChild>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp YPS
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/join-directory">Join the Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container grid gap-6 lg:grid-cols-3">
          {contactCards.map((item) => (
            <Card
              key={item.label}
              className="rounded-[1.75rem] border-primary/10 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold">{item.label}</h2>
              <a
                href={item.href}
                target={item.label === "Office address" ? "_blank" : undefined}
                rel={item.label === "Office address" ? "noreferrer" : undefined}
                className="mt-2 block text-sm leading-6 text-muted-foreground transition-colors hover:text-primary"
              >
                {item.value}
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-padding-sm bg-card">
        <div className="content-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-eyebrow">Contact details</p>
            <h2 className="mt-3 text-headline">Young Professionals Society</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              <p>
                <span className="block font-semibold text-foreground">
                  {contact.addressName}
                </span>
                <span className="block">{contact.addressLine1}</span>
                <span className="block">{contact.city}</span>
              </p>
              <p>
                <span className="block font-semibold text-foreground">
                  Office hours
                </span>
                {contact.officeHours}
              </p>
              <p>{siteConfig.initiative}</p>
            </div>
          </div>

          <Card className="rounded-[2rem] p-5 shadow-xl shadow-primary/10 md:p-8">
            <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={contact.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder="Membership, directory support, partnership, or general inquiry" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how the YPS team can help."
                />
              </div>
              <Button type="submit" className="w-full rounded-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="section-padding-sm bg-background">
        <div className="content-container">
          <div className="overflow-hidden rounded-[2rem] border border-primary/10 bg-card shadow-sm">
            <div className="grid min-h-[22rem] lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-6 md:p-8">
                <p className="text-eyebrow">Visit The Chamber</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">
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
                <Button variant="outline" className="mt-6 rounded-full" asChild>
                  <a href={contact.mapsUrl} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </Button>
              </div>
              <div className="bg-muted p-4 md:p-6">
                <ChamberMap className="h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
