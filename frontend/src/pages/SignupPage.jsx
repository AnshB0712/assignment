import { Container, Divider, Text } from "@mantine/core";
import SignUpForm from "./components/SignUpForm";

const SignupPage = () => {
  return (
    <Container>
      <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
        Sign Up
      </Text>
      <Divider my="sm" />
      <SignUpForm />
    </Container>
  );
};

export default SignupPage;
