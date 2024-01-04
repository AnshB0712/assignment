/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Checkbox,
  Container,
  Group,
  Input,
  Radio,
  Stack,
  Text,
} from "@mantine/core";
import {
  EnvelopeClosedIcon,
  InfoCircledIcon,
  LockClosedIcon,
  MobileIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import DropDownInput from "./DropDown";
import { useState } from "react";
import customAxios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { isOnline } from "../../utils/isOnline";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    aboutUs: "",
    city: "",
    state: "",
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
      await customAxios.post("/auth/register", formState);
      navigate("/login");
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
        <Input.Wrapper label="Username" withAsterisk>
          <Input
            radius="md"
            placeholder="username"
            required
            leftSection={<PersonIcon />}
            value={formState.username}
            name="username"
            onChange={onInputChange}
          />
        </Input.Wrapper>
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
        <Input.Wrapper label="Phone" withAsterisk>
          <Input
            radius="md"
            placeholder="9893526142"
            required
            leftSection={<MobileIcon />}
            name="phone"
            value={formState.phone}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Radio.Group
          onChange={(e) => setFormState((p) => ({ ...p, gender: e }))}
          name="gender"
          label="Select your Gender"
          withAsterisk
        >
          <Group mt="xs">
            <Radio value="male" label="Male" />
            <Radio value="female" label="Female" />
            <Radio value="other" label="Other" />
          </Group>
        </Radio.Group>
        <Checkbox.Group
          label="How do you know about us?"
          withAsterisk
          onChange={(e) => setFormState((p) => ({ ...p, aboutUs: e }))}
        >
          <Group mt="xs">
            <Checkbox value="linkedin" label="LinkedIn" />
            <Checkbox value="jobPortal" label="Job-Portal" />
            <Checkbox value="friends" label="Friends" />
            <Checkbox value="other" label="Other" />
          </Group>
        </Checkbox.Group>
        <DropDownInput
          value={formState.city}
          autoSuggestion={false}
          label="Choose you City."
          options={["Mumbai", "Pune", "Ahmedabad"]}
          onChange={(e) => setFormState((p) => ({ ...p, city: e }))}
        />
        <DropDownInput
          value={formState.state}
          autoSuggestion={true}
          label="Choose you State."
          options={["Gujarat", "Maharashtra", "Karnataka"]}
          onChange={(e) => setFormState((p) => ({ ...p, state: e }))}
        />
      </Stack>
      <Group gap={1}>
        <Text my={"xs"}>Already have an account? </Text>
        <Button
          p={0}
          variant="transparent"
          component={Link}
          to="/login"
          size="compact"
        >
          Login
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
        Register
      </Button>
    </Container>
  );
};

export default SignUpForm;
