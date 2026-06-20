import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerifyEmailProps {
  url: string;
}

export const EmailVerification = ({ url }: VerifyEmailProps) => (
  <Html>
    <Head />

    <Body style={main}>
      <Preview>Verify your email address</Preview>

      <Container style={container}>
        <Heading style={heading}>Verify your email address</Heading>

        <Section>
          <Text style={text}>
            Thanks for signing up for <strong>StoreDock</strong>.
          </Text>

          <Text style={text}>
            To complete your registration, please verify your email address by
            clicking the button below.
          </Text>

          <Section style={buttonWrapper}>
            <Button style={button} href={url}>
              Verify Email
            </Button>
          </Section>

          <Text style={smallText}>
            If you didn&apos;t create an account with StoreDock, you can safely
            ignore this email.
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>StoreDock • 2026</Text>
      </Container>
    </Body>
  </Html>
);

export default EmailVerification;

const main = {
  backgroundColor: "#f6f7fb",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "40px",
  margin: "40px auto",
};

const heading = {
  fontSize: "24px",
  marginBottom: "20px",
  fontWeight: "bold",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333",
};

const smallText = {
  fontSize: "13px",
  color: "#777",
  lineHeight: "1.5",
  marginTop: "20px",
};

const buttonWrapper = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "14px 22px",
  borderRadius: "6px",
  fontSize: "16px",
};

const hr = {
  borderTop: "1px solid #eee",
  marginTop: "30px",
};

const footer = {
  fontSize: "12px",
  color: "#999",
};
