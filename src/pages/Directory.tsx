import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { approvedMembers } from "@/lib/member-directory";

export default function Directory() {
  const members = approvedMembers();
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("alphabetical");

  const industries = Array.from(new Set(members.map((member) => member.industry))).sort();
  const locations = Array.from(new Set(members.map((member) => member.location))).sort();

  const filteredMembers = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return members
      .filter((member) => {
        const haystack = [member.full_name, member.company_name, member.title, member.industry, member.location, member.bio, member.services]
          .join(" ")
          .toLowerCase();
        return (!needle || haystack.includes(needle)) && (industry === "all" || member.industry === industry) && (location === "all" || member.location === location);
      })
      .sort((a, b) => sort === "newest" ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime() : a.full_name.localeCompare(b.full_name));
  }, [industry, location, members, query, sort]);

  return (
    <PageLayout>
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="content-container">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-accent">Member directory</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">Browse the YPS network.</h1>
            <p className="mt-5 text-lg leading-8 text-primary-foreground/75">Search approved YPS members by name, business, service, profession, industry, or location.</p>
          </div>
        </div>
      </section>

      <section className="section-padding-sm">
        <div className="content-container">
          <div className="rounded-[1.75rem] border border-border bg-card p-4 shadow-sm md:p-5">
            <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
              <label className="relative block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, business, service, or keyword" className="h-12 rounded-full pl-10" />
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="h-12 rounded-full"><SelectValue placeholder="Industry" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All industries</SelectItem>
                  {industries.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-12 rounded-full"><SelectValue placeholder="Location" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {locations.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-12 rounded-full"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabetical">A–Z</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">Showing {filteredMembers.length} approved {filteredMembers.length === 1 ? "member" : "members"}</p>
            <Button className="rounded-full" asChild><Link to="/join-directory">Join the Directory</Link></Button>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member) => <MemberCard key={member.id} member={member} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-border bg-muted/50 p-10 text-center">
              <h2 className="text-2xl font-semibold">No approved members match your search.</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Try a different keyword, remove a filter, or check back as more YPS profiles are approved.</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
