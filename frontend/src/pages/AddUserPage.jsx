/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Container,
  Input,
  Stack,
  Divider,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { isOnline } from "../utils/isOnline";

const AddUserForm = () => {
  const navigate = useNavigate();
  const { customAxios } = usePrivateAxios();
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    address: "",
    phone: "",
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
      const data = await customAxios.post("/user/add", formState);
      console.log(data);
      navigate("/dashboard");
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
            name="email"
            value={formState.email}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Username" withAsterisk>
          <Input
            radius="md"
            placeholder="username"
            required
            name="username"
            value={formState.username}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Phone" withAsterisk>
          <Input
            radius="md"
            placeholder="Phone"
            required
            name="phone"
            value={formState.phone}
            onChange={onInputChange}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Address" withAsterisk>
          <Input
            radius="md"
            placeholder="Address"
            required
            name="address"
            value={formState.address}
            onChange={onInputChange}
          />
        </Input.Wrapper>
      </Stack>
      <Button
        disabled={!allFieldsFilled}
        display={"block"}
        my={"lg"}
        radius={"md"}
        fullWidth
        type="submit"
        loading={Intermediate.loading}
        onClick={onSubmit}
      >
        Add
      </Button>
    </Container>
  );
};

const AddUserPage = () => {
  return (
    <Container>
      <Text ta={"center"} styles={{ root: { fontSize: "38px" } }}>
        Add User
      </Text>
      <Divider my="sm" />
      <AddUserForm />
    </Container>
  );
};

export default AddUserPage;
