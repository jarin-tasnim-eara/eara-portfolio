import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuroraBackground from "@/components/layout/AuroraBackground";
import { createClient } from "@/lib/supabase-server";
import { normalizeUrl } from "@/lib/url";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--nf-body",
  display: "swap",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--nf-heading",
  display: "swap",
});

const codeFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--nf-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jarin Tasnim Eara — Software Developer",
  description:
    "CSE student and aspiring software developer portfolio showcasing projects, research, and experience.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const result = await supabase
    .from("profile")
        .select(
      "full_name, title, github_url, linkedin_url, resume_url, google_scholar_url, researchgate_url"
    )
    .limit(1)
    .maybeSingle();

  const profile = result.data;

  const githubUrl = profile ? normalizeUrl(profile.github_url) : null;
  const linkedinUrl = profile ? normalizeUrl(profile.linkedin_url) : null;
  const resumeUrl = profile ? normalizeUrl(profile.resume_url) : null;
  const googleScholarUrl = profile
    ? normalizeUrl(profile.google_scholar_url)
    : null;
  const researchgateUrl = profile
    ? normalizeUrl(profile.researchgate_url)
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${codeFont.variable} font-sans bg-page text-ink antialiased min-h-screen`}
      >
        <ThemeProvider>
          <AuroraBackground />
          <Navbar
          fullName={profile ? profile.full_name : null}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            resumeUrl={resumeUrl}
          />
          {children}
                    <Footer
            fullName={profile ? profile.full_name : null}
            title={profile ? profile.title : null}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}