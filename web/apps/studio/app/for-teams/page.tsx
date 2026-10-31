import { AudiencePage, audienceMetadata } from "@/components/AudiencePage";

export const metadata = audienceMetadata("teams");

export default function Page() {
  return <AudiencePage k="teams" />;
}
