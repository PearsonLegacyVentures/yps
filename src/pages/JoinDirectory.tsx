import { FormEvent, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  blankMemberForm,
  createPendingMember,
  INDUSTRIES,
  MemberFormInput,
} from "@/lib/member-directory";

export default function JoinDirectory() {
  const { contact } = siteConfig;
  const [form, setForm] = useState<MemberFormInput>(blankMemberForm);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof MemberFormInput, value: string | boolean) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleImage = (
    field:
      | "profile_photo_url"
      | "logo_url"
      | "featured_image_url"
      | "banner_image_url",
    file?: File,
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField(field, String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!consent) return;
    createPendingMember(form);
    setSubmitted(true);
    setForm(blankMemberForm);
    setConsent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
        <img
          src={siteConfig.images.leadership}
          alt="YPS leadership and networking event"
          className="absolute inset-0 h-full w-full object-cover opacity-24"
        />
        <div className="absolute inset-0 bg-primary/82" />
        <div className="content-container relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-eyebrow text-accent">Join the directory</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
              Join the Young Professionals Society directory.
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-primary-foreground/75">
            Share the details members, partners, and peers need to understand
            your work, interests, and how to connect with you. Every submission
            is reviewed before it appears publicly.
          </p>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="content-container">
          {submitted && (
            <Card className="mb-8 rounded-2xl border-accent/30 bg-accent/10 p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h2 className="font-semibold">
                    Profile submitted for review.
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your profile is saved as pending. It will not appear in the
                    public directory until an admin approves it.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[1fr_0.42fr]"
          >
            <Card className="rounded-[2rem] p-5 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  value={form.full_name}
                  onChange={(v) => setField("full_name", v)}
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => setField("email", v)}
                />
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(v) => setField("phone", v)}
                />
                <Field
                  label="WhatsApp"
                  value={form.whatsapp}
                  onChange={(v) => setField("whatsapp", v)}
                />
                <Field
                  label="Profession / title"
                  required
                  value={form.title}
                  onChange={(v) => setField("title", v)}
                />
                <Field
                  label="Business/company name"
                  required
                  value={form.company_name}
                  onChange={(v) => setField("company_name", v)}
                />
                <div className="space-y-2">
                  <Label>
                    Industry/category{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.industry}
                    onValueChange={(value) => setField("industry", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Field
                  label="Location"
                  required
                  value={form.location}
                  onChange={(v) => setField("location", v)}
                />
                <Field
                  label="Website"
                  value={form.website}
                  onChange={(v) => setField("website", v)}
                />
                <Field
                  label="Instagram"
                  value={form.instagram}
                  onChange={(v) => setField("instagram", v)}
                />
                <Field
                  label="LinkedIn"
                  value={form.linkedin}
                  onChange={(v) => setField("linkedin", v)}
                />
                <Field
                  label="Facebook"
                  value={form.facebook}
                  onChange={(v) => setField("facebook", v)}
                />
                <div className="space-y-2 md:col-span-2">
                  <Label>
                    Short bio <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    required
                    value={form.bio}
                    onChange={(e) => setField("bio", e.target.value)}
                    rows={5}
                    placeholder="A clear, concise overview of who you help and what you do."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>
                    Services offered <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    required
                    value={form.services}
                    onChange={(e) => setField("services", e.target.value)}
                    rows={4}
                    placeholder="List your main services or professional focus areas."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Areas of expertise</Label>
                  <Textarea
                    value={form.areas_of_expertise}
                    onChange={(e) =>
                      setField("areas_of_expertise", e.target.value)
                    }
                    rows={3}
                    placeholder="Examples: leadership development, commercial law, accounting, tourism marketing."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Professional interests</Label>
                  <Textarea
                    value={form.professional_interests}
                    onChange={(e) =>
                      setField("professional_interests", e.target.value)
                    }
                    rows={3}
                    placeholder="Examples: mentorship, entrepreneurship, community projects, industry collaboration."
                  />
                </div>
                <label className="flex items-start gap-3 rounded-2xl border border-border bg-muted/50 p-4 md:col-span-2">
                  <Checkbox
                    checked={form.open_to_collaboration}
                    onCheckedChange={(checked) =>
                      setField("open_to_collaboration", checked === true)
                    }
                  />
                  <span className="text-sm leading-6">
                    <span className="font-semibold text-foreground">
                      Open to collaboration
                    </span>
                    <span className="block text-muted-foreground">
                      Show that you are open to introductions, partnerships,
                      mentoring conversations, referrals, or community
                      initiatives.
                    </span>
                  </span>
                </label>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-[2rem] p-5">
                <h2 className="text-lg font-semibold">Images</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload preview images are saved with your pending submission
                  for admin review.
                </p>
                <ImageUpload
                  label="Profile photo"
                  required
                  preview={form.profile_photo_url}
                  onChange={(file) => handleImage("profile_photo_url", file)}
                />
                <ImageUpload
                  label="Business logo optional"
                  preview={form.logo_url}
                  onChange={(file) => handleImage("logo_url", file)}
                />
                <ImageUpload
                  label="Profile Banner Image"
                  helperText="Upload a wide banner image for your profile header. Recommended size: 1600x500px."
                  preview={form.banner_image_url}
                  variant="banner"
                  onChange={(file) => handleImage("banner_image_url", file)}
                />
                <ImageUpload
                  label="Featured image optional"
                  preview={form.featured_image_url}
                  onChange={(file) => handleImage("featured_image_url", file)}
                />
              </Card>
              <Card className="rounded-[2rem] p-5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(value) => setConsent(Boolean(value))}
                  />
                  <Label htmlFor="consent" className="text-sm leading-6">
                    I confirm this information may be reviewed and published in
                    the Young Professionals Society directory.
                  </Label>
                </div>
                <Button
                  className="mt-6 w-full rounded-full"
                  type="submit"
                  disabled={!consent}
                >
                  Submit for Review
                </Button>
              </Card>

              <Card className="rounded-[2rem] border-primary/10 bg-muted/60 p-5">
                <h2 className="text-lg font-semibold">Need help joining?</h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>
                    <span className="block font-semibold text-foreground">
                      {contact.addressName}
                    </span>
                    {contact.addressLine1}<br />
                    {contact.city}
                  </p>
                  <a href={`mailto:${contact.email}`} className="block hover:text-primary">
                    {contact.email}
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:text-primary"
                  >
                    WhatsApp {contact.phone}
                  </a>
                </div>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function ImageUpload({
  label,
  preview,
  onChange,
  required = false,
  helperText,
  variant = "square",
}: {
  label: string;
  preview: string;
  onChange: (file?: File) => void;
  required?: boolean;
  helperText?: string;
  variant?: "square" | "banner";
}) {
  return (
    <div className="mt-5 space-y-2">
      <div>
        <Label>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {helperText && (
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
      <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-center text-sm text-muted-foreground hover:bg-muted">
        <Upload className="mb-2 h-5 w-5" />
        Choose image
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          required={required && !preview}
          onChange={(event) => onChange(event.target.files?.[0])}
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt={`${label} preview`}
          className={`${
            variant === "banner" ? "h-32 md:h-36" : "h-28"
          } w-full rounded-2xl object-cover`}
        />
      )}
    </div>
  );
}
