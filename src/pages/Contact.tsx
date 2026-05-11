import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <PageLayout>
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="content-container grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-eyebrow text-accent">Contact YPS</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
              Connect with the directory team.
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-primary-foreground/75">
              Have a question about joining, updating a profile, sponsorship,
              mentorship, or directory visibility? Send a clear note and the
              team can point you in the right direction.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" className="rounded-full" asChild>
                <Link to="/join-directory">Join the Directory</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/25 bg-white/5 text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/directory">Browse Members</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactForm
        heading="Send a message."
        description="Use the form below for directory questions, member profile support, or general YPS inquiries."
      />
    </PageLayout>
  );
}
