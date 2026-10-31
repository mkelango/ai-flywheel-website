import { AudiencePage, audienceMetadata } from "@/components/AudiencePage";

export const metadata = audienceMetadata("campuses");

export default function Page() {
  return <AudiencePage k="campuses" />;
}
