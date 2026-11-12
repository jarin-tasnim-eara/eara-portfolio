import Slider from "@/components/ui/Slider";
import SectionHeading from "@/components/ui/SectionHeading";
import CertificationCard from "@/components/sections/CertificationCard";
import type { CertificationItem } from "@/lib/certifications";

export default function Certifications(props: {
  certifications: CertificationItem[];
}) {
  const certifications = props.certifications;

  if (certifications.length === 0) return null;

  const items = certifications.map((cert) => (
    <CertificationCard key={cert.id} cert={cert} />
  ));

  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-14">
      <SectionHeading title="Certifications" barClass="bg-sec-awards" />

      <Slider
        items={items}
        dotClass="bg-sec-awards"
        label="Certifications"
      />
    </section>
  );
}