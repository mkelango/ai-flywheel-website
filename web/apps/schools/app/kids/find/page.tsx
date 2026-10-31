import type { Metadata } from "next";
import { Container } from "@flywheel/ui/components/primitives";
import { AskSchool } from "@/components/blocks";
import { CampFinder } from "@/components/CampFinder";
import { TownMap } from "@/components/families/art";
import { KidsHero, KidsSafety, OtherKids } from "@/components/families/kids";
import { RelatedLinks } from "@/components/seo";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("/kids/find");

export default function KidsFindPage() {
  return (
    <div className="font-sans">
      <KidsHero
        crumbs={[{ label: "Home", href: "/" }, { label: "AI Flywheel Kids", href: "/kids" }, { label: "Find a camp" }]}
        eyebrow="AI Flywheel Kids · Classes 3–8"
        title="Find a kids AI camp near you."
        intro="Kids AI camps and clubs for Classes 3–8 in Chennai, Coimbatore, Madurai and Tiruchirappalli. Summer camps fill from February."
        kidLine="For you: pick a camp, then pick what you want to build."
        art={<TownMap className="mx-auto w-full max-w-[420px]" />}
      />
      <section className="pb-16 md:pb-20">
        <Container>
          <CampFinder />
        </Container>
      </section>
      <OtherKids />
      <RelatedLinks
        links={[
          { href: "/kids/summer-camp", label: "AI summer camp for kids" },
          { href: "/kids/bootcamp", label: "Robotics camp for kids" },
          { href: "/kids/host", label: "Host a kids AI camp" },
        ]}
      />
      <KidsSafety />
      <AskSchool />
    </div>
  );
}
