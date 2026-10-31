import { AudiencePage, audienceMetadata } from "@/components/AudiencePage";

export const metadata = audienceMetadata("learners");

export default function Page() {
  return <AudiencePage k="learners" />;
}
