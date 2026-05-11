import { useMemo, useState } from "react";
import { Download, Edit, EyeOff, Star, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { deleteMember, getMembers, INDUSTRIES, MemberProfile, MEMBER_STATUSES, MemberStatus, toCsv, updateMember } from "@/lib/member-directory";

export default function AdminDirectory() {
  const [adminCode, setAdminCode] = useState("");
  const [isAdmin, setIsAdmin] = useState(() => window.sessionStorage.getItem("yps-directory-admin") === "true");
  const [members, setMembers] = useState<MemberProfile[]>(getMembers());
  const [status, setStatus] = useState<MemberStatus | "all">("pending");
  const [editing, setEditing] = useState<MemberProfile | null>(null);

  const visibleMembers = useMemo(() => members.filter((member) => status === "all" || member.status === status), [members, status]);
  const counts = MEMBER_STATUSES.reduce((acc, item) => ({ ...acc, [item]: members.filter((member) => member.status === item).length }), {} as Record<MemberStatus, number>);

  const applyUpdate = (id: string, updates: Partial<MemberProfile>) => setMembers(updateMember(id, updates));
  const remove = (id: string) => window.confirm("Delete this profile permanently?") && setMembers(deleteMember(id));
  const exportCsv = () => {
    const blob = new Blob([toCsv(members)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "yps-member-directory.csv";
    link.click();
    URL.revokeObjectURL(url);
  };


  if (!isAdmin) {
    return (
      <PageLayout>
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="narrow-container">
            <Card className="rounded-[2rem] p-6 text-foreground shadow-2xl md:p-8">
              <p className="text-eyebrow">Admin access</p>
              <h1 className="mt-3 text-3xl font-semibold">Directory management is private.</h1>
              <p className="mt-3 text-muted-foreground">Enter the admin passcode to review submissions and manage public listings.</p>
              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (adminCode === "yps-admin") {
                    window.sessionStorage.setItem("yps-directory-admin", "true");
                    setIsAdmin(true);
                  }
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="admin-code">Admin passcode</Label>
                  <Input id="admin-code" type="password" value={adminCode} onChange={(event) => setAdminCode(event.target.value)} placeholder="Enter passcode" />
                </div>
                <Button className="w-full rounded-full" type="submit">Open Admin Dashboard</Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">Demo passcode: yps-admin. In production, connect this route to real authentication and database permissions.</p>
            </Card>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <div className="content-container flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-eyebrow text-accent">Admin dashboard</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">Member submissions</h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/75">Review pending profiles, approve public listings, and keep the directory clean.</p>
          </div>
          <Button variant="accent" className="rounded-full" onClick={exportCsv}><Download className="h-4 w-4" /> Export CSV</Button>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="content-container">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <StatusButton label="All" active={status === "all"} count={members.length} onClick={() => setStatus("all")} />
            {MEMBER_STATUSES.map((item) => <StatusButton key={item} label={item} active={status === item} count={counts[item]} onClick={() => setStatus(item)} />)}
          </div>

          <div className="mt-8 space-y-4">
            {visibleMembers.map((member) => (
              <Card key={member.id} className="rounded-[1.5rem] p-5 shadow-sm">
                <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold capitalize text-muted-foreground">{member.status}</span>
                      {member.is_featured && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">Featured</span>}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold">{member.full_name}</h2>
                    <p className="text-sm text-muted-foreground">{member.title} · {member.company_name} · {member.industry}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{member.bio}</p>
                    <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                      <span>{member.email}</span><span>{member.phone || "No phone"}</span><span>{member.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                    <Button size="sm" className="rounded-full" onClick={() => applyUpdate(member.id, { status: "approved" })}>Approve</Button>
                    <Button size="sm" variant="secondary" className="rounded-full" onClick={() => applyUpdate(member.id, { status: "rejected" })}>Reject</Button>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => applyUpdate(member.id, { status: "hidden" })}><EyeOff className="h-4 w-4" /> Hide</Button>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => applyUpdate(member.id, { is_featured: !member.is_featured })}><Star className="h-4 w-4" /> {member.is_featured ? "Unfeature" : "Feature"}</Button>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setEditing(member)}><Edit className="h-4 w-4" /> Edit</Button>
                    <Button size="sm" variant="destructive" className="rounded-full" onClick={() => remove(member.id)}><Trash2 className="h-4 w-4" /> Delete</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {visibleMembers.length === 0 && <div className="mt-8 rounded-[1.75rem] border border-dashed border-border bg-muted/50 p-10 text-center"><h2 className="text-2xl font-semibold">No profiles in this status.</h2><p className="mt-3 text-muted-foreground">New submissions will appear here as pending.</p></div>}
        </div>
      </section>

      <EditDialog member={editing} onClose={() => setEditing(null)} onSave={(updated) => { setMembers(updateMember(updated.id, updated)); setEditing(null); }} />
    </PageLayout>
  );
}

function StatusButton({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`rounded-2xl border p-4 text-left transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/30"}`}><span className="block text-2xl font-bold">{count}</span><span className="mt-1 block text-sm font-medium capitalize opacity-80">{label}</span></button>;
}

function EditDialog({ member, onClose, onSave }: { member: MemberProfile | null; onClose: () => void; onSave: (member: MemberProfile) => void }) {
  const [draft, setDraft] = useState<MemberProfile | null>(member);
  if (member && draft?.id !== member.id) setDraft(member);
  if (!draft) return null;
  const setField = (field: keyof MemberProfile, value: string | boolean) => setDraft((current) => current ? { ...current, [field]: value } : current);

  return (
    <Dialog open={Boolean(member)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl">
        <DialogHeader><DialogTitle>Edit member profile</DialogTitle></DialogHeader>
        <div className="grid gap-4 md:grid-cols-2">
          <EditField label="Full name" value={draft.full_name} onChange={(v) => setField("full_name", v)} />
          <EditField label="Email" value={draft.email} onChange={(v) => setField("email", v)} />
          <EditField label="Phone" value={draft.phone} onChange={(v) => setField("phone", v)} />
          <EditField label="WhatsApp" value={draft.whatsapp} onChange={(v) => setField("whatsapp", v)} />
          <EditField label="Title" value={draft.title} onChange={(v) => setField("title", v)} />
          <EditField label="Company" value={draft.company_name} onChange={(v) => setField("company_name", v)} />
          <div className="space-y-2"><Label>Industry</Label><Select value={draft.industry} onValueChange={(value) => setField("industry", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{INDUSTRIES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
          <EditField label="Location" value={draft.location} onChange={(v) => setField("location", v)} />
          <EditField label="Website" value={draft.website} onChange={(v) => setField("website", v)} />
          <EditField label="Instagram" value={draft.instagram} onChange={(v) => setField("instagram", v)} />
          <EditField label="LinkedIn" value={draft.linkedin} onChange={(v) => setField("linkedin", v)} />
          <EditField label="Facebook" value={draft.facebook} onChange={(v) => setField("facebook", v)} />
          <div className="space-y-2 md:col-span-2"><Label>Bio</Label><Textarea rows={4} value={draft.bio} onChange={(e) => setField("bio", e.target.value)} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Services</Label><Textarea rows={4} value={draft.services} onChange={(e) => setField("services", e.target.value)} /></div>
        </div>
        <div className="mt-4 flex justify-end gap-2"><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={() => onSave(draft)}>Save changes</Button></div>
      </DialogContent>
    </Dialog>
  );
}

function EditField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label>{label}</Label><Input value={value} onChange={(event) => onChange(event.target.value)} /></div>;
}
