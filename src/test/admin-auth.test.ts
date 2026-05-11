import { beforeEach, describe, expect, it } from "vitest";
import { getAdminSession, signInAdmin, signOutAdmin } from "@/lib/admin-auth";

describe("admin auth", () => {
  beforeEach(() => {
    signOutAdmin();
  });

  it("creates an admin session for the seeded admin credentials", async () => {
    const session = await signInAdmin("admin@ypsbahamas.com", "password");

    expect(session?.role).toBe("admin");
    expect(getAdminSession()?.email).toBe("admin@ypsbahamas.com");
  });

  it("rejects invalid admin credentials", async () => {
    const session = await signInAdmin("admin@ypsbahamas.com", "wrong-password");

    expect(session).toBeNull();
    expect(getAdminSession()).toBeNull();
  });
});
