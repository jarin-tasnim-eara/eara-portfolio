import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase-server";

const geist = Geist({ subsets: ["latin"] });

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
  const { data: profile } = await supabase
    .from("profile")
    .select("github_url, linkedin_url, resume_url")
    .limit(1)
    .maybeSingle();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <ThemeProvider>
          <Navbar
            githubUrl={profile?.github_url}
            linkedinUrl={profile?.linkedin_url}
            resumeUrl={profile?.resume_url}
          />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}