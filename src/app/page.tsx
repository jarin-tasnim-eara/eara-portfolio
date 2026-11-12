import { createClient } from "@/lib/supabase-server";
import { normalizeUrl } from "@/lib/url";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import ExperienceEducation from "@/components/sections/ExperienceEducation";
import Research from "@/components/sections/Research";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

function logError(name: string, error: { message: string } | null) {
  if (error) {
    console.error("[" + name + "] " + error.message);
  }
}

export default async function Home() {
  const supabase = await createClient();

  const profileResult = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  const skillsResult = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const projectsResult = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const experienceResult = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("start_date", { ascending: false });

  const educationResult = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("start_date", { ascending: false });

  const researchResult = await supabase
    .from("research")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("publication_date", { ascending: false });

  const certificationsResult = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("issue_date", { ascending: false });

  logError("profile", profileResult.error);
  logError("skills", skillsResult.error);
  logError("projects", projectsResult.error);
  logError("experience", experienceResult.error);
  logError("education", educationResult.error);
  logError("research", researchResult.error);
  logError("certifications", certificationsResult.error);

  const profile = profileResult.data;
  const skills = skillsResult.data;
  const projects = projectsResult.data;
  const experiences = experienceResult.data;
  const education = educationResult.data;
  const research = researchResult.data;
  const certifications = certificationsResult.data;

  const githubUrl = profile ? normalizeUrl(profile.github_url) : null;
  const linkedinUrl = profile ? normalizeUrl(profile.linkedin_url) : null;
  const resumeUrl = profile ? normalizeUrl(profile.resume_url) : null;
  const googleScholarUrl = profile
    ? normalizeUrl(profile.google_scholar_url)
    : null;
  const researchgateUrl = profile
    ? normalizeUrl(profile.researchgate_url)
    : null;
  const email = profile ? profile.email : null;

  return (
    <main>
     <Hero
  fullName={profile ? profile.full_name : "Your Name"}
  title={profile ? profile.title : "Software Developer"}
  shortIntro={profile ? profile.short_intro : null}
  profileImageUrl={profile ? profile.profile_image_url : null}
  githubUrl={githubUrl}
  linkedinUrl={linkedinUrl}
  googleScholarUrl={googleScholarUrl}
  researchgateUrl={researchgateUrl}
  resumeUrl={resumeUrl}
  availabilityText={profile ? profile.availability_text : null}
  showAvailability={profile ? profile.show_availability === true : false}
/>
     
<Stats
  projects={projects ? projects.length : 0}
  skills={skills ? skills.length : 0}
  research={research ? research.length : 0}
  certifications={certifications ? certifications.length : 0}
/>

      <About
  aboutText={profile ? profile.about_text : null}
  currentFocus={profile ? profile.current_focus : null}
  careerDirection={profile ? profile.career_direction : null}
  currentlyLearning={
    profile && profile.currently_learning ? profile.currently_learning : []
  }
/>
      <Skills skills={skills ? skills : []} />
      <Projects projects={projects ? projects : []} />
     <ExperienceEducation
  experiences={experiences ? experiences : []}
  education={education ? education : []}
/>
      <Research research={research ? research : []} />
      <Certifications certifications={certifications ? certifications : []} />
      <Contact
        email={email}
        githubUrl={githubUrl}
        linkedinUrl={linkedinUrl}
        resumeUrl={resumeUrl}
        googleScholarUrl={googleScholarUrl}
        researchgateUrl={researchgateUrl}
      />
    </main>
  );
}