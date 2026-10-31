import { AudiencePage, audienceMetadata } from "@/components/AudiencePage";

export const metadata = audienceMetadata("schools");

export default function Page() {
  return <AudiencePage k="schools" />;
}
