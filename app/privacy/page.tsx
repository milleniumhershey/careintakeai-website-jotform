import { Footer, Header, PageHero } from "../site-shell";

export default function Privacy() {
  return (
    <main>
      <Header />
      <PageHero kicker="LEGAL" title="Privacy Policy" copy="A plain-language overview of how this website handles information." />
      <section className="legal">
        <p><strong>Effective date:</strong> September 22, 2026</p>

        <h2>Information you provide</h2>
        <p>If you contact CAREINTAKEAI, use the website agent, submit a form, or schedule a meeting, you may provide information such as your name, email address, phone number, company, business type, preferred contact method, and message.</p>

        <h2>AI concierge, chat, and voice</h2>
        <p>Lea, the website AI concierge, is delivered through Jotform AI. Your chat, form responses, and optional voice interactions are processed by Jotform and the providers supporting that service. Voice features use your microphone only after you choose the feature and grant browser permission.</p>

        <h2>How information may be used</h2>
        <p>Information may be used to respond to inquiries, arrange consultations, provide requested services, manage prospective-client relationships, improve the website, maintain security, and meet legal obligations.</p>

        <h2>Sensitive information</h2>
        <p>Do not submit protected health information or confidential patient or client information through this public website, Lea, Facebook, or the booking form. Lea does not provide clinical advice or emergency assistance. For emergencies, call 911.</p>

        <h2>Third-party services</h2>
        <p>The website agent is delivered through Jotform AI. Scheduling is handled through Calendly. The website also links to Facebook, and CAREINTAKEAI may store inquiry details in internal lead-management tools. Each third-party provider’s handling of information is governed by its own privacy practices.</p>

        <h2>Your choices</h2>
        <p>You may decline microphone access and use chat, a form, email, or telephone instead. You may request correction or deletion of information submitted directly to CAREINTAKEAI, subject to legitimate legal or operational retention needs, by emailing <a href="mailto:gguillet@careintakeai.com">gguillet@careintakeai.com</a> or calling <a href="tel:+16785610670">678-561-0670</a>.</p>

        <h2>Updates</h2>
        <p>This policy may be updated as the website and services change. The effective date above identifies the current version.</p>
      </section>
      <Footer />
    </main>
  );
}
