/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Container,
  Input,
  Stack,
  Divider,
  Text,
  Group,
} from "@mantine/core";
import {
  EnvelopeClosedIcon,
  InfoCircledIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import customAxios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { isOnline } from "../utils/isOnline";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/dashboard";
  const { setUserToken } = useUserContext();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [Intermediate, setIntermediate] = useState({
    loading: false,
    error: null,
  });

  const onInputChange = (e) =>
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));

  const allFieldsFilled = Object.values(formState).every(Boolean);

  const onSubmit = async () => {
    if (!isOnline()) {
      setIntermediate((p) => ({
        ...p,
        error: { message: "Please turn on Internet Your Connection" },
      }));
      return;
    }

    setIntermediate((p) => ({ ...p, loading: true }));
    try {
      const { data } = await customAxios.post("/auth/login", formState);
      setUserToken(data.token);
      navigate(from, { replace: true });
    } catch (e) {
      console.log(e);
      setIntermediate((p) => ({ ...p, error: e }));
    } finally {
      setIntermediate((p) => ({ ...p, loading: false }));
    }
  };

  return (
    <Container styles={{ root: { maxWidth: "400px" } }}>
      {Intermediate.error && (
        <Alert
          variant="light"
          color="red"
          radius="md"
          title="Error Occured"
          icon={<InfoCircledIcon />}
        >
          {Intermediate.error?.response?.data.message ??
            Intermediate.error?.message}
        </Alert>
      )}
      <Stack component={"form"}>
        <Input.Wrapper label="Email" withAsterisk>
          <Input
            radius="md"
            placeholder="xyz@mail.com"
            required
            leftSection={<EnvelopeClosedIcon />}
            name="email"
            value={formState.email}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Password" withAsterisk>
          <Input
            radius="md"
            placeholder="password"
            required
            leftSection={<LockClosedIcon />}
            name="password"
            value={formState.password}
            onChange={onInputChange}
          />
        </Input.Wrapper>
      </Stack>
      <Group gap={1}>
        <Text my={"xs"}>do not have an account? </Text>
        <Button
          p={0}
          variant="transparent"
          component={Link}
          to="/"
          size="compact"
        >
          Sign-Up
        </Button>
      </Group>
      <Button
        disabled={!allFieldsFilled}
        display={"block"}
        radius={"md"}
        fullWidth
        type="submit"
        loading={Intermediate.loading}
        onClick={onSubmit}
      >
        Login
      </Button>
    </Container>
  );
};

const LoginPage = () => {
  return (
    <Container>
      <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
        Login
      </Text>
      <Divider my="sm" />
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
