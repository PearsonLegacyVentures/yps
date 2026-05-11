import { pbkdf2Sync } from "node:crypto";

const email = process.env.ADMIN_EMAIL ?? "admin@ypsbahamas.com";
const password = process.env.ADMIN_PASSWORD;
const salt = process.env.ADMIN_PASSWORD_SALT ?? "yps-directory-admin-dev-v1";
const iterations = Number(process.env.ADMIN_PASSWORD_ITERATIONS ?? 120000);

if (!password) {
  console.error("Set ADMIN_PASSWORD before running this script. Example: ADMIN_PASSWORD='your-dev-password' npm run seed:admin");
  process.exit(1);
}

const passwordHash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");

console.log(JSON.stringify({ email, role: "admin", salt, iterations, passwordHash }, null, 2));
