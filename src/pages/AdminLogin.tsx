import { FormEvent, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminSession, signInAdmin } from "@/lib/admin-auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getAdminSession()));

  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    setIsAuthenticated(Boolean(getAdminSession()));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const session = await signInAdmin(email, password);
    setIsSubmitting(false);

    if (!session) {
      setError("Invalid email or password.");
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <PageLayout>
      <section className="min-h-[calc(100vh-7rem)] bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--primary))_48%,hsl(var(--muted))_48%,hsl(var(--muted))_100%)] px-4 py-12 text-primary-foreground md:py-20">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl">
            <p className="text-eyebrow text-accent">YPS administration</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">Admin Login</h1>
            <p className="mt-4 text-base leading-7 text-primary-foreground/75">
              Sign in to review submissions, manage profile visibility, and keep the directory accurate for members.
            </p>
          </div>

          <Card className="rounded-[2rem] border-white/60 bg-white p-6 text-foreground shadow-2xl md:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Secure admin access</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Use your admin account to continue to the dashboard.</p>
            </div>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  autoComplete="email"
                  inputMode="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@yps.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive" role="alert">
                  {error}
                </p>
              )}

              <Button className="w-full rounded-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Login"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </PageLayout>
  );
}
