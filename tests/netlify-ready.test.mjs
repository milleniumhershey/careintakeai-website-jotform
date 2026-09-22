import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function availablePort() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}

let forwarded;
const webhook = createServer((request, response) => {
  let body = "";
  request.setEncoding("utf8");
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    forwarded = JSON.parse(body);
    response.writeHead(200, { "content-type": "application/json" });
    response.end('{"ok":true}');
  });
});
await new Promise((resolve) => webhook.listen(0, "127.0.0.1", resolve));
const webhookPort = webhook.address().port;
const appPort = await availablePort();
const app = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(appPort)], {
  env: { ...process.env, AIRTABLE_LEAD_WEBHOOK: `http://127.0.0.1:${webhookPort}/lead` },
  stdio: ["ignore", "pipe", "pipe"],
});
let appLogs = "";
app.stdout.on("data", (chunk) => (appLogs += chunk));
app.stderr.on("data", (chunk) => (appLogs += chunk));

const base = `http://127.0.0.1:${appPort}`;
for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    const response = await fetch(base);
    if (response.ok) break;
  } catch {}
  if (attempt === 79) throw new Error(`Next.js server did not start.\n${appLogs}`);
  await new Promise((resolve) => setTimeout(resolve, 125));
}

test.after(async () => {
  app.kill("SIGTERM");
  await new Promise((resolve) => webhook.close(resolve));
});

async function render(pathname) {
  const response = await fetch(`${base}${pathname}`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("all public pages render", async () => {
  for (const pathname of ["/", "/services", "/audit", "/book", "/about", "/resources", "/privacy", "/terms", "/accessibility"]) {
    const html = await render(pathname);
    assert.match(html, /CAREINTAKEAI/i);
  }
});

test("home page preserves brand and loads the Jotform Lea concierge", async () => {
  const html = await render("/");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const shell = await readFile(new URL("../app/site-shell.tsx", import.meta.url), "utf8");
  assert.match(html, /Built for senior-care operators/i);
  assert.match(layout, /cdn\.jotfor\.ms\/agent\/embedjs\/01a0ca4bdec87000873b4cd6efe7ae303a6d\/embed\.js/i);
  assert.doesNotMatch(shell, /liveavatar|heygen/i);
});

test("services and booking content remain available", async () => {
  const services = await render("/services");
  for (const label of ["Private-Pay Home Care", "Memory Care / Dementia Care", "Residential Care Homes", "Group Homes", "Adult Day Care"]) {
    assert.match(services, new RegExp(label.replace("/", "\\/"), "i"));
  }
  const booking = await render("/book");
  assert.match(booking, /Open Calendly/i);
});

test("lead API validates and securely forwards the CRM payload", async () => {
  const invalid = await fetch(`${base}/api/lead`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
  assert.equal(invalid.status, 400);

  const response = await fetch(`${base}/api/lead`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      firstName: "Test",
      agencyName: "QA Agency",
      email: "qa@example.com",
      phone: "",
      careSetting: "Private-Pay Home Care",
      primaryChallenge: "Missed inquiries",
      urgency: "Within 30 days",
      preferredContact: "Email",
      notes: "Nonclinical workflow test",
      website: "",
      consent: true,
    }),
  });
  assert.equal(response.status, 200);
  assert.equal(forwarded.summary.email, "qa@example.com");
  assert.equal(forwarded.fields.fldvq2swGsav8dAxK, "Nonclinical workflow test");
});
