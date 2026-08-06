import { Container } from "@/components/ui/container";
import { Section, SectionDescription, SectionHeader, SectionTitle } from "@/components/ui/section";
import { HowItWorksSteps } from "@/components/download/how-it-works";

export function HowItWorks() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-800/50">
      <Container>
        <SectionHeader>
          <SectionTitle>How It Works</SectionTitle>
          <SectionDescription>
            Download any video in three simple steps — no account or software
            required.
          </SectionDescription>
        </SectionHeader>
        <HowItWorksSteps />
      </Container>
    </Section>
  );
}