import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://careintakeai.com"),
  title: "CAREINTAKEAI | Growth Systems for Senior-Care Operators",
  description: "Connected inquiry, referral, occupancy, enrollment, staffing, and visibility systems for senior-care providers.",
  openGraph: { title: "CAREINTAKEAI | Turn Every Inquiry Into a Clear Path to Care", description: "Connected growth and operations systems for home care, memory care, residential care, group homes, and adult day programs.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "CAREINTAKEAI — Turn every inquiry into a clear path to care." }] },
  twitter: { card: "summary_large_image", title: "CAREINTAKEAI", description: "Connected growth and operations systems for senior-care providers.", images: ["/og.png"] },
  icons: { icon: "/original-logo.jpg", apple: "/original-logo.jpg" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="jotform-lea-agent"
          src="https://cdn.jotfor.ms/agent/embedjs/01a0ca4bdec87000873b4cd6efe7ae303a6d/embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
