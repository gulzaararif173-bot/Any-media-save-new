import { Container } from "@/components/ui/container";
import { Section, SectionDescription, SectionHeader, SectionTitle } from "@/components/ui/section";
import { PlatformSupported } from "@/components/download/platform-supported";

export function PlatformGrid() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Supported Platforms</SectionTitle>
          <SectionDescription>
            Download content from all major social media and video platforms in
            seconds.
          </SectionDescription>
        </SectionHeader>
        <PlatformSupported />
      </Container>
    </Section>
  );
}