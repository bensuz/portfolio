import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({ message, senderEmail }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio</Preview>
      <Body style={{ backgroundColor: "#f3f1ec", color: "#111113", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container style={{ padding: "32px 0" }}>
          <Section style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: "24px 32px" }}>
            <Heading as="h2" style={{ margin: "0 0 16px", fontSize: 20 }}>
              New message from your portfolio
            </Heading>
            <Text style={{ fontSize: 15, lineHeight: "24px", whiteSpace: "pre-wrap" }}>{message}</Text>
            <Hr style={{ borderColor: "#e5e2da" }} />
            <Text style={{ fontSize: 14, color: "#55534e" }}>
              Reply directly to this email to reach {senderEmail}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
